import type { SrsState } from '../data/types'
import { addDays } from './dates'

/** Intervall (dagar) för låda 1–4. */
export const INTERVALS = [1, 3, 7, 14]
export const MAX_BOX = INTERVALS.length

/**
 * Leitner: rätt → nästa låda (längre intervall), fel → tillbaka till låda 1.
 * Ett nytt kort som besvaras rätt hamnar i låda 1 (1 dag), sedan 3, 7, 14, 14 …
 */
export function review(state: SrsState | undefined, correct: boolean, today: string): SrsState {
  const box = correct ? Math.min(MAX_BOX, (state?.box ?? 0) + 1) : 1
  const history = [...(state?.history ?? []), { date: today, correct }].slice(-20)
  return { box, due: addDays(today, INTERVALS[box - 1]), last: today, history }
}

/** Lägg i kön (låda 1) om posten inte redan finns där. Förfaller imorgon. */
export function enqueue(state: SrsState | undefined, today: string): SrsState {
  if (state && state.box === 1 && state.due <= addDays(today, 1)) return state
  return { box: 1, due: addDays(today, 1), last: state?.last, history: state?.history }
}

export function isDue(state: SrsState | undefined, today: string): boolean {
  return !!state && state.due <= today
}

export const srsKey = {
  card: (id: string) => `card:${id}`,
  problem: (id: string) => `prob:${id}`,
  exercise: (id: string) => `ex:${id}`,
}

export function parseSrsKey(key: string): { type: 'card' | 'prob' | 'ex'; id: string } {
  const i = key.indexOf(':')
  return { type: key.slice(0, i) as 'card' | 'prob' | 'ex', id: key.slice(i + 1) }
}
