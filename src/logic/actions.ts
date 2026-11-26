// Rena funktioner som returnerar en ny Progress (används av store och tester).
import { CARD_BY_ID } from '../data/cards'
import type { ExerciseStatus, Progress } from '../data/types'
import { enqueue, parseSrsKey, review, srsKey } from './leitner'

const clone = (p: Progress): Progress => structuredClone(p)

export function setExerciseStatus(p0: Progress, id: string, status: ExerciseStatus | null, today: string): Progress {
  const p = clone(p0)
  if (status === null) {
    delete p.exercises[id]
    return p
  }
  p.exercises[id] = { status, date: today, ask: status !== 'ok' ? true : undefined }
  const key = srsKey.exercise(id)
  if (status !== 'ok') p.srs[key] = enqueue(p.srs[key], today)
  return p
}

export function clearAsk(p0: Progress, id: string): Progress {
  const p = clone(p0)
  if (p.exercises[id]) p.exercises[id].ask = false
  return p
}

/** Självrättning av en uppgift: score = andel 0..1. Schemalägger i repetitionskön. */
export function gradeProblem(p0: Progress, pid: string, score: number, today: string, context: 'bank' | 'sim' | 'rep' = 'bank'): Progress {
  const p = clone(p0)
  p.problems[pid] = [...(p.problems[pid] ?? []), { date: today, score, context }]
  const key = srsKey.problem(pid)
  p.srs[key] = review(p.srs[key], score >= 1, today)
  return p
}

export function reviewKey(p0: Progress, key: string, correct: boolean, today: string): Progress {
  let p = clone(p0)
  const { type, id } = parseSrsKey(key)
  if (type === 'prob') return gradeProblem(p, id, correct ? 1 : 0, today, 'rep')
  p.srs[key] = review(p.srs[key], correct, today)
  if (type === 'card' && CARD_BY_ID[id]) p.cardReviews = [...p.cardReviews, { id, date: today, correct }].slice(-3000)
  if (type === 'ex') {
    const prev = p.exercises[id]
    p = { ...p, exercises: { ...p.exercises, [id]: { status: correct ? 'ok' : 'fail', date: today, ask: correct ? false : (prev?.ask ?? true) } } }
  }
  return p
}

export function toggleDone(p0: Progress, date: string, itemId: string): Progress {
  const p = clone(p0)
  const list = new Set(p.planDone[date] ?? [])
  if (list.has(itemId)) list.delete(itemId)
  else list.add(itemId)
  p.planDone[date] = [...list]
  return p
}

/** Markera/avmarkera en föreläsning (eller Ö-sida) som genomgången. */
export function toggleLecture(p0: Progress, momentId: string, today: string): Progress {
  const p = clone(p0)
  const done = { ...(p.lecturesDone ?? {}) }
  if (done[momentId]) delete done[momentId]
  else done[momentId] = today
  p.lecturesDone = done
  return p
}
