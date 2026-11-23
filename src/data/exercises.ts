import { chapterNumber, expandAll, exerciseLabel } from '../logic/parse'
import { MOMENTS } from './schedule'
import { STUDY_PLAN } from './studyplan'
import type { AreaId, Exercise, ExerciseLevel, Moment } from './types'

/**
 * Område för en enskild bokuppgift. Bygger på kapitel/uppgiftsnummer – en uppskattning
 * eftersom boken inte finns i repot. Faller tillbaka på momentets första område.
 */
export function exerciseArea(id: string, moment: Moment): AreaId {
  const fallback = moment.areas[0] ?? 'int-primitiva'
  if (id.startsWith('integreringsmetoder:')) return id.includes(':1') ? 'int-partialbrak' : 'int-trig'
  if (id.startsWith('integrering:')) return 'int-teori'
  if (id.startsWith('ackumulering:')) return 'tillamp-area'
  if (id.startsWith('polynomekvationer:')) return 'komplexa-ekvationer'
  const cn = chapterNumber(id)
  if (!cn) return fallback
  const [ch, n] = cn
  switch (ch) {
    case 6:
      if (n <= 36) return 'komplexa-rakna'
      if (n >= 55 && n <= 62) return 'komplexa-geometri'
      return 'komplexa-ekvationer'
    case 11:
      if (n <= 10) return 'taylor-utveckling'
      if (n <= 22) return 'taylor-gransvarde'
      return 'taylor-serier'
    case 12:
      if (n <= 6) return 'int-primitiva'
      if (n <= 12) return 'int-variabelbyte'
      if (n <= 21) return 'int-partiell'
      if (n <= 31) return 'int-partialbrak'
      return 'int-trig'
    case 13:
      return n >= 20 && n <= 40 ? 'int-generaliserade' : 'int-teori'
    case 14:
      if (n <= 4) return 'tillamp-area'
      if (n <= 11 || n >= 39) return 'tillamp-volym'
      return 'tillamp-massa'
    case 15:
      if (n === 63 || n === 71) return 'de1-tillampning'
      if (n <= 9) return 'de1-linjar'
      if (n <= 17 || n === 27) return 'de1-tillampning'
      if (n <= 30) return 'de1-separabel'
      if (n <= 44) return 'de2-homogen'
      return 'de2-partikular'
  }
  return fallback
}

const LEVEL_RANK: Record<ExerciseLevel, number> = { G: 0, högre: 1, 'demo-G': 2, 'demo-högre': 3 }

function build(): Exercise[] {
  const map = new Map<string, Exercise>()
  const add = (ids: string[], moment: Moment, level: ExerciseLevel) => {
    for (const id of ids) {
      const prev = map.get(id)
      // Behåll "starkaste" nivån (G före högre före demo) och tidigaste momentet.
      if (prev && LEVEL_RANK[prev.level] <= LEVEL_RANK[level]) continue
      map.set(id, { id, label: exerciseLabel(id), area: exerciseArea(id, moment), momentId: moment.id, level, due: moment.date })
    }
  }
  for (const m of MOMENTS) {
    add(expandAll(m.g), m, 'G')
    add(expandAll(m.higher), m, 'högre')
  }
  for (const m of MOMENTS) {
    add(expandAll(m.demoG), m, 'demo-G')
    add(expandAll(m.demoHigher), m, 'demo-högre')
  }
  // Ikapp-dagar i studieplanen flyttar fram "senast klar"-datum för de momentens övningar.
  for (const day of STUDY_PLAN) {
    for (const mid of day.catchupMoments ?? []) {
      for (const ex of map.values()) if (ex.momentId === mid && ex.due < day.date) ex.due = day.date
    }
  }
  return [...map.values()]
}

export const EXERCISES: Exercise[] = build()
export const EXERCISE_BY_ID = Object.fromEntries(EXERCISES.map((e) => [e.id, e])) as Record<string, Exercise>

/** Uppgifter (id) som listas under ett moment, per kategori, i den ordning de står i schemat. */
export function momentExercises(m: Moment) {
  return {
    g: expandAll(m.g),
    higher: expandAll(m.higher),
    demoG: expandAll(m.demoG),
    demoHigher: expandAll(m.demoHigher),
  }
}

export function allMomentExerciseIds(m: Moment): string[] {
  const e = momentExercises(m)
  return [...new Set([...e.g, ...e.higher, ...e.demoG, ...e.demoHigher])]
}
