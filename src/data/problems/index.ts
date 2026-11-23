import type { ExamSource, Problem, SourceId } from '../types'
import { DUGGA_PROBLEMS } from './duggor'
import { HT24_PROBLEMS } from './ht24'
import { HT25_PROBLEMS } from './ht25'
import { OMTENTA_PROBLEMS } from './omtenta'
import { VARIANT_PROBLEMS } from './variants'

export const PROBLEMS: Problem[] = [
  ...HT24_PROBLEMS,
  ...HT25_PROBLEMS,
  ...OMTENTA_PROBLEMS,
  ...DUGGA_PROBLEMS,
  ...VARIANT_PROBLEMS,
]

export const PROBLEM_BY_ID = Object.fromEntries(PROBLEMS.map((p) => [p.id, p])) as Record<string, Problem>

const ids = (src: SourceId) => PROBLEMS.filter((p) => p.source === src).map((p) => p.id)

export const SOURCES: ExamSource[] = [
  { id: 'ht24', label: 'Tenta 2025-01-14 (ht24)', short: 'ht24', kind: 'tenta', date: '2025-01-14', durationMin: 240, maxPoints: 50, formelblad: true, problemIds: ids('ht24') },
  { id: 'ht25', label: 'Tenta 2026-01-13 (ht25)', short: 'ht25', kind: 'tenta', date: '2026-01-13', durationMin: 240, maxPoints: 50, formelblad: true, problemIds: ids('ht25') },
  { id: 'omtenta-ht25', label: 'Omtenta 2026-04-09', short: 'omtenta', kind: 'tenta', date: '2026-04-09', durationMin: 240, maxPoints: 50, formelblad: true, problemIds: ids('omtenta-ht25') },
  { id: 'dugga1A-26', label: 'Dugga 1A HT2026', short: 'D1A-26', kind: 'dugga', date: '2026-11-18', durationMin: 60, maxPoints: 6, formelblad: false, problemIds: ids('dugga1A-26') },
  { id: 'dugga1B-26', label: 'Dugga 1B HT2026', short: 'D1B-26', kind: 'dugga', date: '2026-11-18', durationMin: 60, maxPoints: 6, formelblad: false, problemIds: ids('dugga1B-26') },
  { id: 'dugga2A-ht24', label: 'Dugga 2A HT2024', short: 'D2A-ht24', kind: 'dugga', durationMin: 60, maxPoints: 6, formelblad: false, problemIds: ids('dugga2A-ht24') },
  { id: 'dugga2B-ht24', label: 'Dugga 2B HT2024', short: 'D2B-ht24', kind: 'dugga', durationMin: 60, maxPoints: 6, formelblad: false, problemIds: ids('dugga2B-ht24') },
  { id: 'dugga2A-ht25', label: 'Dugga 2A HT2025', short: 'D2A-ht25', kind: 'dugga', durationMin: 60, maxPoints: 6, formelblad: false, problemIds: ids('dugga2A-ht25') },
  { id: 'variant', label: 'Variant (ej från tenta)', short: 'Variant', kind: 'variant', durationMin: 0, maxPoints: 0, formelblad: true, problemIds: ids('variant') },
]

export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, ExamSource>

export const TENTOR = SOURCES.filter((s) => s.kind === 'tenta')

export function problemTitle(p: Problem): string {
  const s = SOURCE_BY_ID[p.source]
  return p.source === 'variant' ? `Variant ${p.number}` : `${s.short} #${p.number}`
}
