import { describe, expect, it } from 'vitest'
import { emptyProgress } from '../data/defaults'
import { EXERCISES, EXERCISE_BY_ID } from '../data/exercises'
import { PROBLEMS, PROBLEM_BY_ID } from '../data/problems'
import { STUDY_PLAN } from '../data/studyplan'
import { MOMENTS } from '../data/schedule'
import { addDays, diffDays, weekday } from './dates'
import { INTERVALS, review } from './leitner'
import { expandAll, expandToken } from './parse'
import { buildDayPlan, resolveDay } from './planner'
import type { Progress } from '../data/types'

const itemsOf = (plan: ReturnType<typeof buildDayPlan>, block: string) => plan.blocks.find((b) => b.id === block)?.items ?? []

describe('parser för övningsnotation', () => {
  it('delar upp intervall av hela uppgifter', () => {
    expect(expandToken('12.7-12.9')).toEqual(['12.7', '12.8', '12.9'])
    expect(expandToken('15.13–15.15')).toEqual(['15.13', '15.14', '15.15'])
  })
  it('delar upp bokstavsintervall och -listor', () => {
    expect(expandToken('12.1a-f')).toEqual(['12.1a', '12.1b', '12.1c', '12.1d', '12.1e', '12.1f'])
    expect(expandToken('12.17a,b,c,d,f,h')).toEqual(['12.17a', '12.17b', '12.17c', '12.17d', '12.17f', '12.17h'])
    expect(expandToken('11.33a)-d)')).toEqual(['11.33a', '11.33b', '11.33c', '11.33d'])
  })
  it('hanterar pdf-uppgifter', () => {
    expect(expandToken('integrering:3-5')).toEqual(['integrering:3', 'integrering:4', 'integrering:5'])
    expect(expandToken('ackumulering:13.1-13.3')).toEqual(['ackumulering:13.1', 'ackumulering:13.2', 'ackumulering:13.3'])
    expect(expandToken('integreringsmetoder:2b,c')).toEqual(['integreringsmetoder:2b', 'integreringsmetoder:2c'])
  })
  it('F1 G-nivå blir 8 + 5 uppgifter', () => {
    expect(expandAll(['12.1a-f', '12.1h,i', '12.2-12.6'])).toHaveLength(13)
  })
  it('alla moment kan tolkas och övningar är unika', () => {
    expect(EXERCISES.length).toBeGreaterThan(250)
    expect(new Set(EXERCISES.map((e) => e.id)).size).toBe(EXERCISES.length)
    // 15.11 står både under F10 och F12 → en uppgift, knuten till F10
    expect(EXERCISE_BY_ID['15.11'].momentId).toBe('F10')
  })
})

describe('Leitner', () => {
  it('rätt → längre intervall, 1, 3, 7, 14 dagar', () => {
    let st = review(undefined, true, '2026-11-23')
    expect(st.box).toBe(1)
    expect(st.due).toBe('2026-11-24')
    const dues: number[] = [diffDays('2026-11-23', st.due)]
    let day = '2026-11-23'
    for (let i = 0; i < 4; i++) {
      day = st.due
      st = review(st, true, day)
      dues.push(diffDays(day, st.due))
    }
    expect(dues).toEqual([1, 3, 7, 14, 14])
    expect(INTERVALS).toEqual([1, 3, 7, 14])
  })
  it('fel → tillbaka till låda 1', () => {
    const st = review({ box: 4, due: '2026-12-01' }, false, '2026-12-01')
    expect(st.box).toBe(1)
    expect(st.due).toBe('2026-12-02')
  })
})

describe('studieplanen', () => {
  it('täcker varje dag 23/11 – 12/1', () => {
    for (let d = '2026-11-23'; d <= '2027-01-12'; d = addDays(d, 1)) expect(STUDY_PLAN.find((x) => x.date === d), d).toBeTruthy()
  })
  it('alla refererade uppgifter och moment finns', () => {
    for (const d of STUDY_PLAN) {
      for (const pid of d.problems ?? []) expect(PROBLEM_BY_ID[pid], pid).toBeTruthy()
      for (const mid of d.moments ?? []) expect(MOMENTS.find((m) => m.id === mid), mid).toBeTruthy()
    }
  })
  it('veckodagarna stämmer (23/11 2026 är en måndag, 12/1 2027 en tisdag)', () => {
    expect(weekday('2026-11-23')).toBe(1)
    expect(weekday('2027-01-12')).toBe(2)
    expect(weekday('2026-12-08')).toBe(2)
  })
})

describe('uppgiftsbanken', () => {
  it('alla tentor summerar till 50 p och duggorna till 6 p', () => {
    const sum = (src: string) => PROBLEMS.filter((p) => p.source === src).reduce((a, p) => a + p.points, 0)
    expect(sum('ht24')).toBe(50)
    expect(sum('ht25')).toBe(50)
    expect(sum('omtenta-ht25')).toBe(50)
    for (const d of ['dugga1A-26', 'dugga1B-26', 'dugga2A-ht24', 'dugga2B-ht24', 'dugga2A-ht25']) expect(sum(d), d).toBe(6)
  })
  it('varje uppgift har ledtråd, metod, steg, svar och verifiering', () => {
    for (const p of PROBLEMS) {
      expect(p.hint && p.method && p.answer && p.steps.length && p.checks.length, p.id).toBeTruthy()
    }
  })
  it('minst 2 varianter per tentaplats', () => {
    for (let slot = 1; slot <= 9; slot++) expect(PROBLEMS.filter((p) => p.source === 'variant' && p.slot === slot).length, `plats ${slot}`).toBeGreaterThanOrEqual(2)
  })
})

describe('dagens pass', () => {
  it('måndag 23/11: Ö6 + F10, G-övningar för F10 och ht25 #6', () => {
    const p = emptyProgress()
    const plan = buildDayPlan('2026-11-23', p)
    expect(plan.kind).toBe('lecture')
    const nytt = itemsOf(plan, 'nytt').map((i) => i.id)
    expect(nytt).toContain('lec:Ö6')
    expect(nytt).toContain('lec:F10')
    const ov = itemsOf(plan, 'ovningar').map((i) => i.exerciseId)
    expect(ov).toEqual(expect.arrayContaining(['15.1', '15.2', '15.3', '15.4', '15.5', '15.7a', '15.7b', '15.8a', '15.8c', '15.8d', '15.11']))
    expect(ov).not.toContain('15.6') // högre nivå, målbetyg 3
    expect(itemsOf(plan, 'tenta').map((i) => i.problemId)).toContain('ht25-6')
    // F8/F9 planeras till ikapp-dagen 24/11 → inte "efter" ännu
    expect(plan.behind).toBe(0)
    expect(plan.totalMin).toBeLessThanOrEqual(plan.budgetMin + 10) // föreläsningarna går före, dagens tentauppgift får dra över lite
  })

  it('högre nivå ingår inte under grundveckorna, även med målbetyg 4', () => {
    const p = emptyProgress()
    p.settings.targetGrade = 4
    const plan = buildDayPlan('2026-11-23', p)
    const all = plan.blocks.flatMap((b) => b.items)
    expect(all.some((i) => i.level === 'högre' || i.level === 'demo-högre')).toBe(false)
  })

  it('högre nivå dyker upp efter 21/12 på svaga-områden-dagar (målbetyg 4), men aldrig som ikapp', () => {
    const p = emptyProgress()
    p.settings.targetGrade = 4
    const plan = buildDayPlan('2026-12-22', p)
    expect(plan.blocks.flatMap((b) => b.items).some((i) => i.level === 'högre')).toBe(true)
    expect(itemsOf(plan, 'ikapp').some((i) => i.level === 'högre')).toBe(false)
    const g3 = emptyProgress()
    expect(buildDayPlan('2026-12-22', g3).blocks.flatMap((b) => b.items).some((i) => i.level === 'högre')).toBe(false)
  })

  it('passet börjar med föreläsningen, och missade föreläsningar kommer först', () => {
    const p = emptyProgress()
    const plan = buildDayPlan('2026-11-26', p)
    expect(plan.blocks[0].id).toBe('nytt')
    const lec = itemsOf(plan, 'nytt').filter((i) => i.kind === 'lecture').map((i) => i.momentId)
    expect(lec).toEqual(['F8', 'F12']) // en äldre (F8) på en föreläsningsdag + dagens F12
    p.lecturesDone = { F8: '2026-11-25', F9: '2026-11-25' }
    const lec2 = itemsOf(buildDayPlan('2026-11-26', p), 'nytt').filter((i) => i.kind === 'lecture').map((i) => i.momentId)
    expect(lec2).toEqual(['F10', 'F12'])
    // Ikapp-dag utan ny föreläsning: upp till tre äldre
    const q = emptyProgress()
    const lec3 = itemsOf(buildDayPlan('2026-11-24', q), 'nytt').filter((i) => i.kind === 'lecture').map((i) => i.momentId)
    expect(lec3).toEqual(['F8', 'F9', 'F10'])
  })

  it('tisdag 24/11 är ikapp-dag med F8/F9-övningar och omtenta #5', () => {
    const p = emptyProgress()
    for (const e of EXERCISES) if (e.due === '2026-11-23') p.exercises[e.id] = { status: 'ok', date: '2026-11-23' }
    const plan = buildDayPlan('2026-11-24', p)
    expect(plan.behind).toBe(0)
    const ov = itemsOf(plan, 'ovningar').map((i) => i.exerciseId)
    expect(ov).toEqual(expect.arrayContaining(['14.1', '14.12', '14.20']))
    expect(plan.blocks.flatMap((b) => b.items).some((i) => i.problemId === 'om-5a')).toBe(true)
  })

  it('omplanerar när man ligger efter: ikapp först, nytt stoff behålls, inom budget', () => {
    const p = emptyProgress() // inget avbockat
    const plan = buildDayPlan('2026-11-26', p)
    expect(plan.behind).toBeGreaterThan(0)
    expect(plan.blocks[0].id).toBe('nytt') // föreläsningen först
    expect(plan.blocks.findIndex((b) => b.id === 'ikapp')).not.toBe(0)
    expect(plan.blocks.some((b) => b.id === 'nytt')).toBe(true) // aldrig bort med nytt stoff
    expect(itemsOf(plan, 'ovningar').length).toBeGreaterThan(10) // F12:s övningar kvar
    expect(plan.postponedIkapp).toBeGreaterThan(0)
    expect(plan.totalMin).toBeLessThanOrEqual(plan.budgetMin + 60) // dagens nya övningar kan inte strykas
    expect(plan.repetitionPostponed).toBe(true)
  })

  it('ikapp försvinner när övningarna är gjorda', () => {
    const p: Progress = emptyProgress()
    for (const e of EXERCISES) if (e.due < '2026-11-26') p.exercises[e.id] = { status: 'ok', date: '2026-11-25' }
    p.lecturesDone = { F8: '2026-11-20', F9: '2026-11-20', F10: '2026-11-23', F11: '2026-11-25' }
    const plan = buildDayPlan('2026-11-26', p)
    expect(plan.behind).toBe(0)
    expect(plan.blocks.some((b) => b.id === 'ikapp')).toBe(false)
    expect(itemsOf(plan, 'rep').length).toBeGreaterThanOrEqual(2)
  })

  it('"mindre tid idag" ger ≤ 45 min och prioriterar ikapp G', () => {
    const p = emptyProgress()
    p.lessTime['2026-11-26'] = true
    const plan = buildDayPlan('2026-11-26', p)
    expect(plan.totalMin).toBeLessThanOrEqual(45 + 2 * 20) // + kort genomgång av föreläsningar
    expect(plan.blocks[0].id).toBe('nytt')
    expect(plan.blocks.flatMap((b) => b.items).every((i) => i.level !== 'högre')).toBe(true)
  })

  it('söndag = vila med max 30 min kort, lediga dagar är tomma', () => {
    const sun = buildDayPlan('2026-11-29', emptyProgress())
    expect(sun.kind).toBe('rest')
    expect(sun.totalMin).toBeLessThanOrEqual(30)
    const xmas = buildDayPlan('2026-12-24', emptyProgress())
    expect(xmas.kind).toBe('free')
    expect(xmas.totalMin).toBe(0)
  })

  it('flyttat duggadatum flyttar duggadagen', () => {
    const p = emptyProgress()
    p.settings.dugga2Date = '2026-12-10'
    expect(resolveDay('2026-12-10', p.settings).kind).toBe('dugga')
    expect(resolveDay('2026-12-08', p.settings).kind).toBe('review')
  })

  it('diagnostenta 18/12 och tentadagen', () => {
    const p = emptyProgress()
    expect(buildDayPlan('2026-12-18', p).blocks.flatMap((b) => b.items).some((i) => i.sourceId === 'ht24')).toBe(true)
    expect(resolveDay('2027-01-12', p.settings).kind).toBe('exam')
    expect(resolveDay('2027-01-13', p.settings).kind).toBe('after')
  })

  it('varje dag i planen går att bygga utan fel', () => {
    const p = emptyProgress()
    for (let d = '2026-11-23'; d <= '2027-01-12'; d = addDays(d, 1)) {
      const plan = buildDayPlan(d, p)
      expect(plan.blocks, d).toBeTruthy()
    }
  })
})
