import { SOL6 } from './sol6'
import { SOL11 } from './sol11'
import { SOL12 } from './sol12'
import { SOL13, SOL14 } from './sol13_14'
import { SOL15 } from './sol15'

/** Lösningsförslag. Nyckel '12.17d' (deluppgift) eller '12.3' (hela uppgiften / gemensam lösning). */
export const SOLUTIONS: Record<string, string> = { ...SOL6, ...SOL11, ...SOL12, ...SOL13, ...SOL14, ...SOL15 }

/** Lösningar att visa för en uppgift (ev. deluppgift). Delar utan egen lösning faller tillbaka på uppgiftens. */
export function solutionsFor(taskId: string, letters: string[], letter?: string): [string, string][] {
  if (letter) {
    const s = SOLUTIONS[taskId + letter] ?? SOLUTIONS[taskId]
    return s ? [[letter, s]] : []
  }
  if (SOLUTIONS[taskId]) return [['', SOLUTIONS[taskId]]]
  return letters.filter((l) => SOLUTIONS[taskId + l]).map((l) => [l, SOLUTIONS[taskId + l]] as [string, string])
}
