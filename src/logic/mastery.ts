import { AREAS, EXAM_SLOTS } from '../data/areas'
import { CARD_BY_ID } from '../data/cards'
import { EXERCISE_BY_ID } from '../data/exercises'
import { PROBLEM_BY_ID } from '../data/problems'
import type { AreaId, Progress } from '../data/types'
import { diffDays } from './dates'

const W_PROBLEM = 2
const W_SIM = 3
const W_EXERCISE = 0.5
const W_CARD = 0.4
const DECAY = 0.97 // per dag
const PRIOR = 1 // vikt för "ingen kunskap" – gör att få datapunkter inte ger 100 %

export type MasteryMap = Record<AreaId, number>

/** Behärskning 0–1 per område, viktat medelvärde av all evidens med avtagande vikt över tid. */
export function computeMastery(p: Progress, today: string): MasteryMap {
  const sum = {} as Record<AreaId, number>
  const wsum = {} as Record<AreaId, number>
  for (const a of AREAS) {
    sum[a.id] = 0
    wsum[a.id] = 0
  }
  const add = (area: AreaId, score: number, w: number, date: string) => {
    const age = Math.max(0, diffDays(date, today))
    const ww = w * Math.pow(DECAY, age)
    sum[area] += ww * score
    wsum[area] += ww
  }
  for (const [pid, attempts] of Object.entries(p.problems)) {
    const prob = PROBLEM_BY_ID[pid]
    if (!prob) continue
    for (const at of attempts) for (const a of prob.areas) add(a, at.score, at.context === 'sim' ? W_SIM : W_PROBLEM, at.date)
  }
  for (const [eid, ex] of Object.entries(p.exercises)) {
    const e = EXERCISE_BY_ID[eid]
    if (!e) continue
    add(e.area, ex.status === 'ok' ? 1 : ex.status === 'help' ? 0.5 : 0, W_EXERCISE, ex.date)
  }
  for (const r of p.cardReviews) {
    const c = CARD_BY_ID[r.id]
    if (c) add(c.area, r.correct ? 1 : 0, W_CARD, r.date)
  }
  const out = {} as MasteryMap
  for (const a of AREAS) out[a.id] = sum[a.id] / (wsum[a.id] + PRIOR)
  return out
}

export function slotMastery(m: MasteryMap, slot: number): number {
  const s = EXAM_SLOTS.find((x) => x.slot === slot)!
  return s.areas.reduce((acc, a) => acc + m[a], 0) / s.areas.length
}

export interface ExpectedPoints {
  perSlot: { slot: number; name: string; weight: number; mastery: number; points: number; gainPerHour: number }[]
  total: number
  bonus: number
  grade: 'U' | '3' | '4' | '5'
}

export function gradeFor(points: number, max = 50): 'U' | '3' | '4' | '5' {
  const f = points / max
  if (f >= 0.8) return '5'
  if (f >= 0.6) return '4'
  if (f >= 0.4) return '3'
  return 'U'
}

export function duggaBonus(p: Progress): number {
  const b = p.settings.bonusPerDugga
  return (p.duggaResults.dugga1 !== undefined && p.duggaResults.dugga1 >= 4 ? b : 0) + (p.duggaResults.dugga2 !== undefined && p.duggaResults.dugga2 >= 4 ? b : 0)
}

/** Σ (typisk poäng × behärskning), normerat till 50 p, + duggabonus. */
export function expectedPoints(m: MasteryMap, p: Progress): ExpectedPoints {
  const totalWeight = EXAM_SLOTS.reduce((a, s) => a + s.weight, 0)
  const scale = 50 / totalWeight
  const perSlot = EXAM_SLOTS.map((s) => {
    const mastery = slotMastery(m, s.slot)
    const weight = s.weight * scale
    return { slot: s.slot, name: s.name, weight, mastery, points: weight * mastery, gainPerHour: (weight * (1 - mastery)) / s.hoursToLearn }
  })
  const bonus = duggaBonus(p)
  const total = perSlot.reduce((a, s) => a + s.points, 0) + bonus
  return { perSlot, total, bonus, grade: gradeFor(Math.min(50, total)) }
}

/** Områden sorterade efter (vikt × (1 − behärskning)) – högst först. */
export function weakestAreas(m: MasteryMap, n: number, among?: AreaId[]): AreaId[] {
  const slotW = Object.fromEntries(EXAM_SLOTS.map((s) => [s.slot, s.weight / s.areas.length + s.weight * 0.3]))
  return AREAS.filter((a) => !among || among.includes(a.id))
    .map((a) => ({ id: a.id, score: slotW[a.slot] * (1 - m[a.id]) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, n)
    .map((x) => x.id)
}
