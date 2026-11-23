import { areaWeight } from '../data/areas'
import { EXERCISES, EXERCISE_BY_ID } from '../data/exercises'
import { PROBLEMS, PROBLEM_BY_ID, SOURCE_BY_ID, problemTitle } from '../data/problems'
import { MOMENTS, MOMENT_BY_ID } from '../data/schedule'
import { PLAN_BY_DATE, PLAN_START } from '../data/studyplan'
import type { AreaId, DayKind, Exercise, ExerciseLevel, PlanDay, Progress, Settings, SourceId } from '../data/types'
import { expandAll } from './parse'
import { addDays, diffDays, isWeekend, seededRandom } from './dates'
import { parseSrsKey } from './leitner'
import { computeMastery, slotMastery, weakestAreas, type MasteryMap } from './mastery'
import { introducedAreas, keyMinutes, pickWeighted, reviewCandidates } from './repetition'
import { CARD_BY_ID } from '../data/cards'
import { EXAM_SLOTS } from '../data/areas'

export type ItemKind = 'lecture' | 'demo' | 'exercise' | 'problem' | 'review' | 'mock' | 'mini' | 'grade' | 'info' | 'link'

export interface PlanItem {
  id: string
  kind: ItemKind
  label: string
  minutes: number
  done: boolean
  exerciseId?: string
  level?: ExerciseLevel
  problemId?: string
  srsKey?: string
  sourceId?: SourceId | 'mix'
  link?: string
}

export type BlockId = 'ikapp' | 'nytt' | 'ovningar' | 'fraga' | 'tenta' | 'main' | 'atgard' | 'rep' | 'info'

export interface PlanBlock {
  id: BlockId
  title: string
  items: PlanItem[]
  note?: string
  tone?: 'warn' | 'normal' | 'calm'
}

export interface DayPlan {
  date: string
  kind: DayKind | 'before' | 'after'
  title: string
  note?: string
  blocks: PlanBlock[]
  totalMin: number
  budgetMin: number
  lessTime: boolean
  /** Antal ikapp-övningar som inte fick plats idag. */
  postponedIkapp: number
  /** Totalt antal ej gjorda övningar från tidigare dagar. */
  behind: number
  repetitionPostponed: boolean
}

export const MIN = { lecture: 15, demo: 5, G: 6, högre: 12, review: 3 }
export const problemMinutes = (points: number) => Math.round(2 + points * 3.5)

// ---------------------------------------------------------------------------
// Vilken sorts dag är det? (tar hänsyn till inställda datum och lediga dagar)
// ---------------------------------------------------------------------------
export function resolveDay(date: string, s: Settings): Omit<PlanDay, 'kind'> & { kind: DayKind | 'before' | 'after' } {
  if (date > s.examDate) return { date, kind: 'after', title: 'Tentan är gjord – bra jobbat!' }
  if (date === s.examDate)
    return { date, kind: 'exam', title: 'TENTA idag', note: s.examConfirmed ? 'Lycka till!' : 'ANTAGET datum – bekräfta i Inställningar.' }
  if (date === s.dugga2Date)
    return { date, kind: 'dugga', title: 'Dugga 2 idag', note: s.dugga2Confirmed ? undefined : 'ANTAGET datum – bekräfta i Inställningar.' }
  if (date < PLAN_START) return { date, kind: 'before', title: 'Före studieplanens start (23/11)' }
  if (s.freeDays.includes(date)) return { date, kind: 'free', title: 'Ledig dag' }
  const base = PLAN_BY_DATE[date]
  if (!base) return { date, kind: 'weak-areas', title: 'Tentaträning: svaga områden' }
  if (base.kind === 'dugga') return { ...base, kind: 'review', title: 'Blandad repetition (Dugga 2 ligger ett annat datum)', note: undefined }
  if (base.kind === 'exam') return { ...base, kind: 'weak-areas', title: 'Tentaträning: svaga områden', note: undefined }
  if (addDays(date, 1) === s.examDate && base.kind !== 'lecture') return { date, kind: 'light', title: 'Dagen före tentan: max 1 h lätt repetition, sedan vila' }
  if (base.kind === 'dugga-prep' && date > s.dugga2Date) return { ...base, kind: 'review', title: 'Blandad repetition' }
  const toDugga = diffDays(date, s.dugga2Date)
  if (toDugga > 0 && toDugga <= 2 && (base.kind === 'review' || base.kind === 'exam-practice' || base.kind === 'rest'))
    return { ...base, kind: 'dugga-prep', title: 'Dugga 2-förberedelse', problems: undefined }
  return base
}

// ---------------------------------------------------------------------------
// Hjälpare
// ---------------------------------------------------------------------------
const exDone = (p: Progress, id: string) => !!p.exercises[id]
const exDoneOn = (p: Progress, id: string, date: string) => p.exercises[id]?.date === date
const probDone = (p: Progress, id: string, date: string) => (p.problems[id] ?? []).some((a) => a.date >= date)
const markDone = (p: Progress, date: string, id: string) => (p.planDone[date] ?? []).includes(id)

function exerciseItem(p: Progress, e: Exercise, levelOverride?: ExerciseLevel): PlanItem {
  const level = levelOverride ?? e.level
  const minutes = level === 'högre' || level === 'demo-högre' ? MIN.högre : level === 'G' ? MIN.G : MIN.demo
  const lvl = level === 'G' || level === 'demo-G' ? 'G' : 'högre'
  return { id: `ex:${e.id}`, kind: level.startsWith('demo') ? 'demo' : 'exercise', label: `${e.label} (${lvl})`, minutes, done: exDone(p, e.id), exerciseId: e.id, level }
}

function problemItem(p: Progress, pid: string, date: string): PlanItem {
  const pr = PROBLEM_BY_ID[pid]
  return { id: `prob:${pid}`, kind: 'problem', label: `${problemTitle(pr)} (${pr.points} p)`, minutes: problemMinutes(pr.points), done: probDone(p, pid, date), problemId: pid }
}

function reviewItem(p: Progress, key: string, date: string): PlanItem {
  const { type, id } = parseSrsKey(key)
  let label = id
  if (type === 'card') label = `Kort: ${CARD_BY_ID[id]?.kind === 'janej' ? 'ja/nej' : CARD_BY_ID[id]?.kind === 'metod' ? 'metod' : 'utantill'}`
  if (type === 'prob') label = `Uppgift: ${problemTitle(PROBLEM_BY_ID[id])}`
  if (type === 'ex') label = `Övning ${EXERCISE_BY_ID[id]?.label ?? id} igen`
  return { id: `rep:${key}`, kind: 'review', label, minutes: keyMinutes(key), done: (p.srs[key]?.last ?? '') >= date, srsKey: key }
}

/** Repetitionsposter för dagen: de som redan gjorts idag + nytt urval upp till n. */
function reviewItems(p: Progress, date: string, m: MasteryMap, n: number, kinds?: ('utantill' | 'janej' | 'metod')[]): PlanItem[] {
  if (n <= 0) return []
  const doneToday = Object.entries(p.srs)
    .filter(([key, st]) => st.last === date && (!kinds || (parseSrsKey(key).type === 'card' && kinds.includes(CARD_BY_ID[parseSrsKey(key).id]?.kind))))
    .map(([k]) => k)
    .slice(0, n)
  const cands = reviewCandidates(p, date, m, kinds).filter((c) => !doneToday.includes(c.key))
  const picked = pickWeighted(cands, n - doneToday.length, `rep-${date}-${kinds?.join() ?? ''}`).map((c) => c.key)
  return [...doneToday, ...picked].map((k) => reviewItem(p, k, date))
}

/** Har man redan gjort uppgiften nyligen (före idag)? */
function recentlyAttempted(p: Progress, pid: string, date: string, days: number): boolean {
  return (p.problems[pid] ?? []).some((a) => a.date < date && diffDays(a.date, date) <= days)
}

function fullySolved(p: Progress, pid: string, date: string): boolean {
  return (p.problems[pid] ?? []).some((a) => a.score >= 1 && a.date < date)
}

/** Interleaving: en tentauppgift från ett tidigare behandlat område, viktad mot svaga områden. */
function interleaveProblem(p: Progress, date: string, m: MasteryMap, exclude: AreaId[]): string | undefined {
  const before = introducedAreas(addDays(date, -1))
  const cands = PROBLEMS.filter(
    (pr) => pr.areas.every((a) => before.has(a)) && !pr.areas.some((a) => exclude.includes(a)) && !recentlyAttempted(p, pr.id, date, 7) && !fullySolved(p, pr.id, date) && pr.points >= 2,
  ).map((pr) => ({ id: pr.id, weight: areaWeight(pr.areas[0]) * (1.05 - m[pr.areas[0]]) * (pr.source === 'variant' ? 0.6 : 1.5) }))
  return pickWeighted(cands, 1, `il-${date}`)[0]?.id
}

/** Uppgifter i givna områden, sämst behärskade och minst gjorda först. */
function problemsForAreas(p: Progress, date: string, areas: AreaId[], m: MasteryMap, maxPoints = 99): string[] {
  return PROBLEMS.filter((pr) => pr.areas.some((a) => areas.includes(a)) && pr.points <= maxPoints && !fullySolved(p, pr.id, date))
    .map((pr) => {
      const att = (p.problems[pr.id] ?? []).filter((a) => a.date < date)
      const rnd = seededRandom(`${date}-${pr.id}`)()
      const score = (1.05 - m[pr.areas[0]]) * (att.length ? 0.7 : 1) * (pr.source === 'variant' ? 0.85 : 1) + rnd * 0.15
      return { id: pr.id, score }
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.id)
}

function dugga2Areas(s: Settings): AreaId[] {
  const set = new Set<AreaId>()
  for (const id of s.dugga2Moments) MOMENT_BY_ID[id]?.areas.forEach((a) => set.add(a))
  return [...set]
}

/** Svagaste områden enligt senaste rättade simulering av en tenta (åtgärdslista). */
export function actionList(p: Progress, sourceId: SourceId | undefined, m: MasteryMap): { area: AreaId; lost: number }[] {
  const sim = [...p.sims].reverse().find((s) => s.done && (!sourceId || s.examId === sourceId))
  if (!sim) return weakestAreas(m, 3).map((a) => ({ area: a, lost: 0 }))
  const lost = new Map<AreaId, number>()
  for (const pid of sim.problemIds) {
    const pr = PROBLEM_BY_ID[pid]
    const got = sim.scores[pid] ?? 0
    const miss = (sim.maxPerProblem[pid] ?? pr.points) - got
    if (miss > 0) for (const a of pr.areas) lost.set(a, (lost.get(a) ?? 0) + miss / pr.areas.length)
  }
  return [...lost.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([area, l]) => ({ area, lost: Math.round(l * 10) / 10 }))
}

// ---------------------------------------------------------------------------
// Dagens pass
// ---------------------------------------------------------------------------
export function buildDayPlan(date: string, p: Progress): DayPlan {
  const s = p.settings
  const m = computeMastery(p, date)
  const inclHigher = s.targetGrade >= 4
  const day = resolveDay(date, s)
  const lessTime = !!p.lessTime[date]
  const weekend = isWeekend(date)
  let budget = weekend ? s.maxMinutesWeekend : s.maxMinutesWeekday
  if (day.kind === 'rest') budget = 30
  if (day.kind === 'light') budget = 60
  if (lessTime) budget = Math.min(budget, 45)

  const wantLevel = (lv: ExerciseLevel) => lv === 'G' || (inclHigher && lv === 'högre')

  // Ikapp: ej gjorda (eller gjorda idag) övningar som skulle varit klara före idag.
  const behindAll = EXERCISES.filter((e) => wantLevel(e.level) && e.due < date && e.due >= s.trackFrom && (!exDone(p, e.id) || exDoneOn(p, e.id, date)))
    .sort((a, b) => (a.level === b.level ? a.due.localeCompare(b.due) : a.level === 'G' ? -1 : 1))
  const behind = behindAll.filter((e) => !exDone(p, e.id)).length

  const blocks: PlanBlock[] = []
  const plan: DayPlan = { date, kind: day.kind, title: day.title, note: day.note, blocks, totalMin: 0, budgetMin: budget, lessTime, postponedIkapp: 0, behind, repetitionPostponed: false }

  if (day.kind === 'before' || day.kind === 'after') return plan

  const fixed: PlanBlock[] = []
  const momentsToday = (day.moments ?? []).map((id) => MOMENT_BY_ID[id]).filter(Boolean)

  // --- Nytt stoff ---
  if (momentsToday.length) {
    const items: PlanItem[] = []
    for (const mo of momentsToday) {
      if (mo.kind === 'F') {
        items.push({ id: `lec:${mo.id}`, kind: 'lecture', label: `${mo.id}: ${mo.title}${mo.sections !== '–' ? ` (avsnitt ${mo.sections})` : ''}`, minutes: lessTime ? 0 : MIN.lecture, done: markDone(p, date, `lec:${mo.id}`) })
      } else if (mo.kind === 'Ö') {
        items.push({ id: `lec:${mo.id}`, kind: 'lecture', label: `${mo.id}: ${mo.title} – försök själv på demo-uppgifterna först`, minutes: 0, done: markDone(p, date, `lec:${mo.id}`) })
        if (!lessTime) {
          const demos = [...expandAll(mo.demoG), ...(inclHigher ? expandAll(mo.demoHigher) : [])]
          for (const id of [...new Set(demos)]) {
            const e = EXERCISE_BY_ID[id]
            if (!e || (exDone(p, id) && !exDoneOn(p, id, date))) continue
            items.push({ ...exerciseItem(p, e, expandAll(mo.demoG).includes(id) ? 'demo-G' : 'demo-högre'), id: `demo:${id}`, minutes: MIN.demo })
          }
        }
      }
    }
    fixed.push({ id: 'nytt', title: 'Nytt stoff', items })
  }

  // --- Fråga på Ö-passet ---
  if (momentsToday.some((mo) => mo.kind === 'Ö')) {
    const ask = Object.entries(p.exercises).filter(([, e]) => e.ask && e.status !== 'ok')
    if (ask.length)
      fixed.push({ id: 'fraga', title: 'Fråga på Ö-passet', tone: 'calm', items: ask.map(([id, e]) => ({ id: `ask:${id}`, kind: 'info' as const, label: `${EXERCISE_BY_ID[id]?.label ?? id} ${e.status === 'fail' ? '❌' : '🟡'}`, minutes: 0, done: false, exerciseId: id })) })
  }

  // --- Dagens övningar ---
  const todayEx = EXERCISES.filter((e) => e.due === date && wantLevel(e.level))
  const extra = expandAll(day.exercises).map((id) => EXERCISE_BY_ID[id]).filter(Boolean)
  const todayAll = [...new Map([...todayEx, ...extra].map((e) => [e.id, e])).values()].filter((e) => !exDone(p, e.id) || exDoneOn(p, e.id, date))
  const todayItems = todayAll.filter((e) => !lessTime || e.level === 'G').map((e) => exerciseItem(p, e))

  // --- Huvudinnehåll per dagtyp ---
  const main: PlanItem[] = []
  let mainTitle = 'Tentauppgifter'
  let lectureProblems: string[] = []
  let fill: string[] = [] // valfria uppgifter som fylls på tills budgeten tar slut
  const extraBlocks: PlanBlock[] = []

  switch (day.kind) {
    case 'lecture':
    case 'catchup': {
      lectureProblems = day.problems ?? []
      if (!lectureProblems.length) {
        const pid = interleaveProblem(p, date, m, momentsToday.flatMap((mo) => mo.areas))
        if (pid) lectureProblems = [pid]
      }
      // Dugga 2 närmar sig på en föreläsningsdag: en extra duggauppgift.
      const toDugga = diffDays(date, s.dugga2Date)
      if (toDugga > 0 && toDugga <= 2) fill = problemsForAreas(p, date, dugga2Areas(s), m, 3).slice(0, 2)
      break
    }
    case 'exam-practice':
      mainTitle = 'Tentauppgifter'
      ;(day.problems ?? []).forEach((pid) => main.push(problemItem(p, pid, date)))
      break
    case 'review':
    case 'topic':
      mainTitle = day.kind === 'topic' ? 'Temadag' : 'Repetition'
      ;(day.problems ?? []).forEach((pid) => main.push(problemItem(p, pid, date)))
      if (day.focusAreas) fill = problemsForAreas(p, date, day.focusAreas, m)
      break
    case 'weak-areas': {
      const intro = [...introducedAreas(date)]
      const weak = weakestAreas(m, 3, intro)
      mainTitle = 'Svaga områden'
      fill = problemsForAreas(p, date, weak, m)
      const exs = EXERCISES.filter((e) => weak.includes(e.area) && (e.level === 'G' || e.level === 'högre') && (inclHigher || e.level === 'G') && (!exDone(p, e.id) || exDoneOn(p, e.id, date))).slice(0, 4)
      if (exs.length) extraBlocks.push({ id: 'ovningar', title: 'Bokuppgifter i svaga områden', items: exs.map((e) => exerciseItem(p, e)) })
      plan.note = `Valda områden: ${weak.join(', ')}`
      if (day.note === 'janej') extraBlocks.push({ id: 'rep', title: 'Ja/nej-kort (snabba fällor)', items: reviewItems(p, date, m, 6, ['janej']) })
      break
    }
    case 'dugga-prep': {
      mainTitle = 'Dugga 2-förberedelse (dugga-format: 2 p per uppgift, inget formelblad)'
      const areas = dugga2Areas(s)
      fill = problemsForAreas(p, date, areas, m, 3)
      main.push({ id: 'mini:dugga2', kind: 'mini', label: 'Mini-dugga på Dugga 2-momenten (1 h)', minutes: 60, done: p.sims.some((x) => x.kind === 'mini' && new Date(x.startedAt).toISOString().slice(0, 10) >= date && x.done), link: '#/simulering?mini=dugga2' })
      break
    }
    case 'mini-dugga':
      mainTitle = 'Mini-dugga'
      main.push({ id: 'mini:auto', kind: 'mini', label: 'Mini-dugga: 3 uppgifter, 1 h, under tidspress', minutes: 60, done: markDone(p, date, 'mini:auto'), link: `#/simulering?mini=${date <= s.dugga2Date ? 'dugga2' : 'integration'}` })
      main.push({ id: 'grade:mini', kind: 'grade', label: 'Rätta mini-duggan mot lösningarna', minutes: 20, done: markDone(p, date, 'grade:mini'), link: '#/simulering' })
      break
    case 'dugga':
      mainTitle = 'Dugga 2'
      main.push({ id: 'info:dugga', kind: 'info', label: 'Dugga 2 idag (1 h, inget formelblad). Lycka till!', minutes: 0, done: markDone(p, date, 'info:dugga') })
      main.push({ id: 'link:dugga-res', kind: 'link', label: 'Fyll i ditt Dugga 2-resultat under Statistik', minutes: 1, done: p.duggaResults.dugga2 !== undefined, link: '#/statistik' })
      extraBlocks.push({ id: 'rep', title: 'Lätt uppvärmning', items: reviewItems(p, date, m, 3) })
      break
    case 'mock-exam': {
      const src = day.mockExam
      if (day.note === 'mix' || !src) {
        mainTitle = 'Mixtenta'
        main.push({ id: 'mock:mix', kind: 'mock', label: 'Mixtenta (genererad, viktad mot svaga områden) – 4 h', minutes: 240, done: markDone(p, date, 'mock:mix'), sourceId: 'mix', link: '#/simulering?start=mix' })
      } else {
        mainTitle = 'Tentasimulering'
        main.push({ id: `mock:${src}`, kind: 'mock', label: `${SOURCE_BY_ID[src].label} – 4 h, bara formelbladet`, minutes: 240, done: p.sims.some((x) => x.examId === src && x.submittedAt && new Date(x.submittedAt).toISOString().slice(0, 10) >= date), sourceId: src, link: `#/simulering?start=${src}` })
      }
      break
    }
    case 'grade-mock': {
      mainTitle = 'Rättning + åtgärdslista'
      const src = day.mockExam
      main.push({ id: `grade:${src}`, kind: 'grade', label: `Rätta ${src ? SOURCE_BY_ID[src].short : 'tentan'} uppgift för uppgift`, minutes: 60, done: p.sims.some((x) => x.examId === src && x.done), sourceId: src, link: '#/simulering' })
      const act = actionList(p, src, m)
      const areas = act.map((a) => a.area)
      fill = problemsForAreas(p, date, areas, m).slice(0, 4)
      plan.note = `Åtgärdslista: ${act.map((a) => `${a.area}${a.lost ? ` (−${a.lost} p)` : ''}`).join(', ')}`
      break
    }
    case 'exam':
      mainTitle = 'Tentamen'
      main.push({ id: 'info:exam', kind: 'info', label: 'Tentan idag, 4 h med formelblad. Ät frukost, ta med legitimation och penna. Lycka till!', minutes: 0, done: false })
      break
    case 'rest':
      extraBlocks.push({ id: 'rep', title: 'Valfritt: max 30 min flashcards', tone: 'calm', items: reviewItems(p, date, m, 8, ['utantill', 'metod', 'janej']) })
      break
    case 'light':
      if (date === addDays(s.examDate, -2) || PLAN_BY_DATE[date]?.title.startsWith('Formelblad')) {
        main.push({ id: 'link:formel', kind: 'link', label: 'Gå igenom formelbladet – vad finns där, vad saknas?', minutes: 15, done: markDone(p, date, 'link:formel'), link: '#/kort/formelblad' })
        extraBlocks.push({ id: 'rep', title: '"Måste kunna utantill"-kort', items: reviewItems(p, date, m, 12, ['utantill']) })
      } else {
        extraBlocks.push({ id: 'rep', title: 'Lätt repetition (max 1 h)', items: reviewItems(p, date, m, 8) })
      }
      mainTitle = 'Lätt pass'
      break
    case 'free':
      break
  }

  // ----------------- Anpassa till tidsbudgeten -----------------
  const sum = (items: PlanItem[]) => items.reduce((a, i) => a + i.minutes, 0)
  const noIkappKinds: string[] = ['mock-exam', 'exam', 'dugga', 'free', 'rest', 'light']
  const ikappCands = noIkappKinds.includes(day.kind) ? [] : behindAll.filter((e) => !lessTime || e.level === 'G')

  if (main.length) fixed.push({ id: 'main', title: mainTitle, items: main })
  fixed.push(...extraBlocks)

  let remaining = budget - fixed.reduce((a, b) => a + sum(b.items), 0)
  const ikappItems: PlanItem[] = []
  const ovningar: PlanItem[] = []
  const tenta: PlanItem[] = []
  let repItems: PlanItem[] = []

  if (lessTime) {
    // 45 min: ikapp G (inkl. dagens G) > tentauppgift > repetition
    for (const it of [...ikappCands.map((e) => exerciseItem(p, e)), ...todayItems]) {
      if (it.done || remaining >= it.minutes) {
        ;(todayItems.includes(it) ? ovningar : ikappItems).push(it)
        if (!it.done) remaining -= it.minutes
      }
    }
    const pid = lectureProblems[0] ?? fill[0]
    if (pid) {
      const it = problemItem(p, pid, date)
      if (it.done || remaining >= it.minutes) {
        tenta.push(it)
        if (!it.done) remaining -= it.minutes
      }
    }
  } else {
    ovningar.push(...todayItems)
    remaining -= sum(todayItems.filter((i) => !i.done))
    for (const e of ikappCands) {
      const it = exerciseItem(p, e)
      if (it.done) ikappItems.push(it)
      else if (remaining >= it.minutes) {
        ikappItems.push(it)
        remaining -= it.minutes
      }
    }
    for (const pid of lectureProblems) {
      const it = problemItem(p, pid, date)
      if (it.done || remaining >= it.minutes || behind === 0) {
        tenta.push(it)
        if (!it.done) remaining -= it.minutes
      }
    }
  }

  // Repetition 2–4 poster om det finns plats (förskjuts annars).
  const repAlready = extraBlocks.some((b) => b.id === 'rep') || ['exam', 'mock-exam', 'free'].includes(day.kind)
  if (!repAlready) {
    let n = Math.max(0, Math.min(4, Math.floor(remaining / MIN.review)))
    if (behind === 0 && !lessTime) n = Math.max(2, n)
    if (n >= 2 || (lessTime && n >= 1)) {
      repItems = reviewItems(p, date, m, n)
      remaining -= sum(repItems.filter((i) => !i.done))
    } else plan.repetitionPostponed = true
  }

  // Fyll på med valfria uppgifter (repetitionsdagar, temadagar, svaga områden).
  const usedProblems = new Set([...main, ...tenta].map((i) => i.problemId).filter(Boolean))
  for (const pid of fill) {
    if (usedProblems.has(pid)) continue
    const it = problemItem(p, pid, date)
    if (it.done || remaining >= it.minutes) {
      ;(day.kind === 'lecture' || day.kind === 'catchup' ? tenta : main).push(it)
      usedProblems.add(pid)
      if (!it.done) remaining -= it.minutes
    }
    if (remaining < 10) break
  }
  if (main.length && !fixed.some((b) => b.id === 'main')) fixed.push({ id: 'main', title: mainTitle, items: main })

  plan.postponedIkapp = ikappCands.filter((e) => !exDone(p, e.id)).length - ikappItems.filter((i) => !i.done).length

  // ----------------- Ordning: Ikapp först -----------------
  if (ikappItems.length)
    blocks.push({
      id: 'ikapp',
      title: 'Ikapp',
      tone: 'warn',
      items: ikappItems,
      note: plan.postponedIkapp > 0 ? `${plan.postponedIkapp} till väntar – de kommer först i morgondagens pass.` : undefined,
    })
  const nytt = fixed.find((b) => b.id === 'nytt')
  if (nytt) blocks.push(nytt)
  if (ovningar.length) blocks.push({ id: 'ovningar', title: day.kind === 'catchup' ? 'Ikapp-dagens övningar' : 'Övningar', items: ovningar })
  blocks.push(...fixed.filter((b) => b.id === 'fraga'))
  blocks.push(...fixed.filter((b) => b.id === 'main'))
  if (tenta.length) blocks.push({ id: 'tenta', title: 'Tentauppgift', items: tenta })
  blocks.push(...fixed.filter((b) => !['nytt', 'fraga', 'main'].includes(b.id)))
  if (repItems.length) blocks.push({ id: 'rep', title: 'Repetition', items: repItems })
  if (lessTime && momentsToday.some((mo) => mo.kind === 'Ö')) {
    const nb = blocks.find((b) => b.id === 'nytt')
    if (nb) nb.note = 'Kortversion: demo-uppgifterna hoppas över idag.'
  }

  plan.totalMin = blocks.reduce((a, b) => a + sum(b.items), 0)
  return plan
}

/** Planerad tentauppgift-lista för en dag (för tester/kursplan). */
export function plannedProblems(date: string): string[] {
  return PLAN_BY_DATE[date]?.problems ?? []
}

/** Vilka moment som har övningar markerade som "fråga på Ö-passet" och nästa Ö-pass efter ett datum. */
export function nextExerciseSession(date: string): string | undefined {
  return MOMENTS.find((mo) => mo.kind === 'Ö' && mo.date >= date)?.date
}

export { slotMastery, EXAM_SLOTS }
