import { areaWeight } from '../data/areas'
import { CARDS, CARD_BY_ID } from '../data/cards'
import { EXERCISE_BY_ID } from '../data/exercises'
import { PROBLEM_BY_ID } from '../data/problems'
import { MOMENTS } from '../data/schedule'
import type { AreaId, CardKind, Progress } from '../data/types'
import { diffDays, seededRandom } from './dates'
import { parseSrsKey, srsKey } from './leitner'
import type { MasteryMap } from './mastery'

/** Områden som har behandlats i undervisningen till och med ett datum. */
export function introducedAreas(today: string): Set<AreaId> {
  const s = new Set<AreaId>()
  for (const m of MOMENTS) if (m.date <= today) m.areas.forEach((a) => s.add(a))
  return s
}

export function keyArea(key: string): AreaId | undefined {
  const { type, id } = parseSrsKey(key)
  if (type === 'card') return CARD_BY_ID[id]?.area
  if (type === 'prob') return PROBLEM_BY_ID[id]?.areas[0]
  return EXERCISE_BY_ID[id]?.area
}

export function keyMinutes(key: string): number {
  const { type, id } = parseSrsKey(key)
  if (type === 'card') return 2
  if (type === 'prob') return Math.min(20, 3 + (PROBLEM_BY_ID[id]?.points ?? 2) * 3)
  return 8
}

export interface Candidate {
  key: string
  weight: number
  isNew: boolean
}

/** Allt som kan repeteras idag, med vikt = tentapoäng × (1 − behärskning) × förfallofaktor. */
export function reviewCandidates(p: Progress, today: string, m: MasteryMap, kinds?: CardKind[]): Candidate[] {
  const intro = introducedAreas(today)
  const out: Candidate[] = []
  for (const [key, st] of Object.entries(p.srs)) {
    if (st.due > today) continue
    const area = keyArea(key)
    if (!area) continue
    if (kinds && (parseSrsKey(key).type !== 'card' || !kinds.includes(CARD_BY_ID[parseSrsKey(key).id].kind))) continue
    const overdue = Math.min(7, diffDays(st.due, today))
    out.push({ key, weight: areaWeight(area) * (1.05 - m[area]) * (1 + overdue * 0.1) * (st.box === 1 ? 1.3 : 1), isNew: false })
  }
  for (const c of CARDS) {
    const key = srsKey.card(c.id)
    if (p.srs[key] || !intro.has(c.area)) continue
    if (kinds && !kinds.includes(c.kind)) continue
    out.push({ key, weight: areaWeight(c.area) * (1.05 - m[c.area]) * 0.5, isNew: true })
  }
  return out
}

/** Viktat urval utan återläggning, deterministiskt per dag. */
export function pickWeighted<T extends { weight: number }>(items: T[], n: number, seed: string): T[] {
  const rnd = seededRandom(seed)
  const pool = [...items]
  const out: T[] = []
  while (out.length < n && pool.length) {
    const total = pool.reduce((a, c) => a + c.weight, 0)
    let x = rnd() * total
    let i = 0
    for (; i < pool.length - 1; i++) {
      x -= pool[i].weight
      if (x <= 0) break
    }
    out.push(pool[i])
    pool.splice(i, 1)
  }
  return out
}

export function pickReview(p: Progress, today: string, m: MasteryMap, n: number, kinds?: CardKind[], salt = ''): string[] {
  return pickWeighted(reviewCandidates(p, today, m, kinds), n, `rep-${today}${salt}`).map((c) => c.key)
}
