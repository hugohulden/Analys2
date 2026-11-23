import { CH6 } from './ch6'
import { CH12 } from './ch12'
import { CH13 } from './ch13'
import { CH14 } from './ch14'
import { CH15 } from './ch15'
import type { BookPart, BookTask } from './types'

export const BOOK: BookTask[] = [...CH6, ...CH12, ...CH13, ...CH14, ...CH15]
export const BOOK_BY_ID = Object.fromEntries(BOOK.map((t) => [t.id, t])) as Record<string, BookTask>

/** Slå upp en övning ('12.1a', '6.68', '15.47') → uppgift + ev. deluppgift. */
export function lookupExercise(exId: string): { task: BookTask; part?: BookPart; letter?: string } | undefined {
  const m = exId.match(/^(\d+\.\d+)([a-z])?$/)
  if (!m) return undefined
  const task = BOOK_BY_ID[m[1]]
  if (!task) return undefined
  const letter = m[2]
  return { task, part: letter ? task.parts?.[letter] : undefined, letter }
}

export * from './types'
