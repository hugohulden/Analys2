// Gemensamma typer för kursdata och progress.

export type AreaId =
  | 'komplexa-rakna'
  | 'komplexa-ekvationer'
  | 'komplexa-geometri'
  | 'int-primitiva'
  | 'int-variabelbyte'
  | 'int-partiell'
  | 'int-partialbrak'
  | 'int-trig'
  | 'int-teori'
  | 'int-generaliserade'
  | 'tillamp-area'
  | 'tillamp-volym'
  | 'tillamp-massa'
  | 'de1-linjar'
  | 'de1-separabel'
  | 'de1-tillampning'
  | 'de2-homogen'
  | 'de2-partikular'
  | 'taylor-utveckling'
  | 'taylor-gransvarde'
  | 'taylor-serier'

export interface Area {
  id: AreaId
  name: string
  slot: number // tentaplats 1–9
}

/** Ett moment i kursschemat (föreläsning, övning eller dugga). */
export interface Moment {
  id: string // 'F10', 'Ö6', 'D1'
  kind: 'F' | 'Ö' | 'dugga'
  date: string // ISO yyyy-mm-dd
  title: string
  sections: string
  areas: AreaId[]
  /** Övningsuppgifter i kompakt notation, se logic/parse.ts. */
  g: string[]
  higher: string[]
  /** Demo-uppgifter (endast Ö-pass). */
  demoG?: string[]
  demoHigher?: string[]
  note?: string
}

export type ExerciseLevel = 'G' | 'högre' | 'demo-G' | 'demo-högre'

export interface Exercise {
  id: string // '12.1a' eller 'integrering:3'
  label: string
  area: AreaId
  /** Första moment där uppgiften är en rekommenderad (ej demo) övning. */
  momentId: string
  level: ExerciseLevel
  /** Datum då uppgiften borde vara gjord. */
  due: string
}

export type SourceId =
  | 'dugga1A-26'
  | 'dugga1B-26'
  | 'dugga2A-ht24'
  | 'dugga2B-ht24'
  | 'dugga2A-ht25'
  | 'ht24'
  | 'ht25'
  | 'omtenta-ht25'
  | 'variant'

export interface Figure {
  src: string // relativt public/, t.ex. 'figurer/ht24-5.svg'
  alt: string
  /** Text som visas om figuren är rekonstruerad/antagen. */
  note?: string
}

export interface Problem {
  id: string
  source: SourceId
  number: string // '3c'
  slot: number // tentaplats 1–9
  areas: AreaId[]
  points: number
  statement: string // markdown-light med $…$ och $$…$$
  figures?: Figure[]
  hint: string
  method: string
  steps: string[]
  answer: string
  solutionFigure?: Figure
  /** Poängskala för ja/nej-uppgifter: möjliga poäng. */
  pointSteps?: number[]
  /** Python-anrop som körs av scripts/verify.py. Måste alla returnera True. */
  checks: string[]
}

export interface ExamSource {
  id: SourceId
  label: string
  short: string
  kind: 'tenta' | 'dugga' | 'variant'
  date?: string
  durationMin: number
  maxPoints: number
  formelblad: boolean
  problemIds: string[]
}

export type CardKind = 'utantill' | 'janej' | 'metod' | 'forelasning'

export interface Card {
  id: string
  kind: CardKind
  area: AreaId
  front: string
  back: string
}

export type DayKind =
  | 'lecture' // nytt stoff
  | 'catchup'
  | 'exam-practice'
  | 'review'
  | 'rest'
  | 'free'
  | 'dugga-prep'
  | 'mini-dugga'
  | 'dugga'
  | 'mock-exam'
  | 'grade-mock'
  | 'weak-areas'
  | 'topic'
  | 'light'
  | 'exam'

export interface PlanDay {
  date: string
  kind: DayKind
  title: string
  moments?: string[] // moment-id:n med nytt stoff
  /** Extra övningar utöver momentens (kompakt notation). */
  exercises?: string[]
  /** Moment vars kvarvarande övningar ska göras ikapp idag. */
  catchupMoments?: string[]
  problems?: string[]
  focusAreas?: AreaId[]
  mockExam?: SourceId
  note?: string
}

// ---------- Progress (sparas i IndexedDB) ----------

export type ExerciseStatus = 'ok' | 'help' | 'fail'

export interface ExerciseProgress {
  status: ExerciseStatus
  date: string
  /** Flaggad att fråga om på nästa Ö-pass. Nollställs när man markerar "frågat". */
  ask?: boolean
}

export interface ProblemAttempt {
  date: string
  score: number // 0..1 (andel av poängen)
  context: 'bank' | 'sim' | 'rep'
}

export interface SrsState {
  box: number // 1..4
  due: string
  last?: string
  history?: { date: string; correct: boolean }[]
}

export interface SimResult {
  id: string
  kind: 'tenta' | 'mix' | 'mini'
  examId?: SourceId
  title: string
  startedAt: number
  submittedAt?: number
  durationMin: number
  problemIds: string[]
  /** Poäng per uppgift efter självrättning (null = ej rättad). */
  scores: Record<string, number | null>
  /** Maxpoäng per uppgift (mini-dugga räknar 2 p per uppgift). */
  maxPerProblem: Record<string, number>
  done: boolean
}

export interface Settings {
  targetGrade: 3 | 4 | 5
  dugga2Date: string
  examDate: string
  dugga2Confirmed: boolean
  examConfirmed: boolean
  freeDays: string[]
  maxMinutesWeekday: number
  maxMinutesWeekend: number
  dugga2Moments: string[]
  /** Övningar från moment före detta datum räknas som redan gjorda (ej ikapp). */
  trackFrom: string
  bonusPerDugga: number
  theme: 'auto' | 'light' | 'dark'
}

export interface Progress {
  version: 1
  settings: Settings
  exercises: Record<string, ExerciseProgress>
  problems: Record<string, ProblemAttempt[]>
  srs: Record<string, SrsState>
  planDone: Record<string, string[]>
  lessTime: Record<string, boolean>
  sims: SimResult[]
  duggaResults: { dugga1?: number; dugga2?: number }
  cardReviews: { id: string; date: string; correct: boolean }[]
}
