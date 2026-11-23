import { AREA_BY_ID, EXAM_SLOTS } from '../data/areas'
import { MOMENT_BY_ID } from '../data/schedule'
import { PROBLEMS, PROBLEM_BY_ID, SOURCE_BY_ID } from '../data/problems'
import type { AreaId, Progress, SimResult, SourceId } from '../data/types'
import { gradeProblem } from './actions'
import { seededRandom } from './dates'
import { gradeFor, slotMastery, type MasteryMap } from './mastery'
import { pickWeighted } from './repetition'

const uid = () => Math.random().toString(36).slice(2, 10)

export function newRealSim(src: SourceId): SimResult {
  const s = SOURCE_BY_ID[src]
  const ids = s.problemIds
  return {
    id: uid(), kind: 'tenta', examId: src, title: s.label, startedAt: Date.now(), durationMin: s.durationMin,
    problemIds: ids, scores: Object.fromEntries(ids.map((i) => [i, null])), maxPerProblem: Object.fromEntries(ids.map((i) => [i, PROBLEM_BY_ID[i].points])), done: false,
  }
}

/** Mixtenta: för varje plats 1–9 väljs uppgiften/uppgifterna från en källa, viktat mot svaga och ej gjorda. */
export function newMixSim(p: Progress, m: MasteryMap, seed = String(Date.now())): SimResult {
  const rnd = seededRandom(seed)
  const ids: string[] = []
  for (const slot of EXAM_SLOTS) {
    const groups = new Map<SourceId, string[]>()
    for (const pr of PROBLEMS) if (pr.slot === slot.slot) groups.set(pr.source, [...(groups.get(pr.source) ?? []), pr.id])
    // Duggor används inte som tentaplatser (för små), utom om inget annat finns.
    const cands = [...groups.entries()]
      .filter(([src]) => SOURCE_BY_ID[src].kind !== 'dugga')
      .map(([src, list]) => {
        const attempts = list.reduce((a, id) => a + (p.problems[id]?.length ?? 0), 0)
        return { src, list, weight: (1 / (1 + attempts)) * (src === 'variant' ? 0.9 : 1) }
      })
    const chosen = pickWeighted(cands, 1, `${seed}-${slot.slot}-${rnd()}`)[0]
    if (!chosen) continue
    let list = chosen.list
    if (chosen.src === 'variant') {
      // Varianter: välj 1–2 uppgifter (sämst behärskat område först) så att poängen blir rimlig.
      const sorted = [...list].sort((a, b) => m[PROBLEM_BY_ID[a].areas[0]] - m[PROBLEM_BY_ID[b].areas[0]] + (rnd() - 0.5) * 0.3)
      const out: string[] = []
      let pts = 0
      for (const id of sorted) {
        if (pts >= slot.weight - 1) break
        out.push(id)
        pts += PROBLEM_BY_ID[id].points
      }
      list = out
    }
    ids.push(...list)
  }
  return {
    id: uid(), kind: 'mix', title: 'Mixtenta', startedAt: Date.now(), durationMin: 240, problemIds: ids,
    scores: Object.fromEntries(ids.map((i) => [i, null])), maxPerProblem: Object.fromEntries(ids.map((i) => [i, PROBLEM_BY_ID[i].points])), done: false,
  }
}

export type MiniMode = 'integration' | 'dugga2'

export function miniAreas(p: Progress, mode: MiniMode): AreaId[] {
  if (mode === 'integration') return ['int-partiell', 'int-variabelbyte', 'int-partialbrak']
  const s = new Set<AreaId>()
  for (const id of p.settings.dugga2Moments) MOMENT_BY_ID[id]?.areas.forEach((a) => s.add(a))
  return [...s]
}

/** Mini-dugga: 3 uppgifter à 2 p, 1 h, bonus vid ≥ 4 p. Olika områden om möjligt. */
export function newMiniSim(p: Progress, m: MasteryMap, mode: MiniMode, seed = String(Date.now())): SimResult {
  const areas = miniAreas(p, mode)
  const pool = PROBLEMS.filter((pr) => pr.points <= 3 && pr.areas.some((a) => areas.includes(a)))
  const chosen: string[] = []
  const usedAreas = new Set<AreaId>()
  const order = mode === 'integration' ? areas : pickWeighted(areas.map((a) => ({ a, weight: 1.05 - m[a] })), areas.length, seed).map((x) => x.a)
  for (const area of order) {
    if (chosen.length >= 3) break
    if (usedAreas.has(area)) continue
    const cands = pool.filter((pr) => pr.areas[0] === area && !chosen.includes(pr.id)).map((pr) => ({ id: pr.id, weight: 1 / (1 + (p.problems[pr.id]?.length ?? 0)) }))
    const pick = pickWeighted(cands, 1, `${seed}-${area}`)[0]
    if (pick) {
      chosen.push(pick.id)
      usedAreas.add(area)
    }
  }
  for (const pr of pickWeighted(pool.filter((x) => !chosen.includes(x.id)).map((x) => ({ id: x.id, weight: 1 })), 3 - chosen.length, seed + 'x')) chosen.push(pr.id)
  return {
    id: uid(), kind: 'mini', title: mode === 'integration' ? 'Mini-dugga: integrationsmetoder' : 'Mini-dugga: Dugga 2-moment', startedAt: Date.now(), durationMin: 60,
    problemIds: chosen, scores: Object.fromEntries(chosen.map((i) => [i, null])), maxPerProblem: Object.fromEntries(chosen.map((i) => [i, 2])), done: false,
  }
}

export interface SimSummary {
  total: number
  max: number
  grade: string
  perArea: { area: AreaId; got: number; max: number }[]
  perSlot: { slot: number; got: number; max: number }[]
}

export function summarize(sim: SimResult): SimSummary {
  let total = 0
  let max = 0
  const area = new Map<AreaId, { got: number; max: number }>()
  const slot = new Map<number, { got: number; max: number }>()
  for (const pid of sim.problemIds) {
    const pr = PROBLEM_BY_ID[pid]
    const mx = sim.maxPerProblem[pid]
    const got = sim.scores[pid] ?? 0
    total += got
    max += mx
    for (const a of pr.areas) {
      const cur = area.get(a) ?? { got: 0, max: 0 }
      area.set(a, { got: cur.got + got / pr.areas.length, max: cur.max + mx / pr.areas.length })
    }
    const sc = slot.get(pr.slot) ?? { got: 0, max: 0 }
    slot.set(pr.slot, { got: sc.got + got, max: sc.max + mx })
  }
  const grade = sim.kind === 'mini' ? (total >= 4 ? 'Bonus ✓' : 'Ingen bonus') : gradeFor(total, max)
  return {
    total, max, grade,
    perArea: [...area.entries()].map(([a, v]) => ({ area: a, ...v })).sort((x, y) => AREA_BY_ID[x.area].slot - AREA_BY_ID[y.area].slot),
    perSlot: [...slot.entries()].map(([s, v]) => ({ slot: s, ...v })).sort((x, y) => x.slot - y.slot),
  }
}

/** Avsluta rättningen: lägg in försöken i banken och repetitionskön. */
export function finalizeSim(p0: Progress, simId: string, today: string): Progress {
  let p = structuredClone(p0)
  const sim = p.sims.find((s) => s.id === simId)
  if (!sim || sim.done) return p
  for (const pid of sim.problemIds) {
    const got = sim.scores[pid] ?? 0
    p = gradeProblem(p, pid, got / sim.maxPerProblem[pid], today, 'sim')
  }
  p.sims = p.sims.map((s) => (s.id === simId ? { ...s, done: true } : s))
  return p
}

export { slotMastery }
