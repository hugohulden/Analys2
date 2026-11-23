import type { Progress, Settings } from './types'

export const DEFAULT_SETTINGS: Settings = {
  targetGrade: 3,
  dugga2Date: '2026-12-08',
  examDate: '2027-01-12',
  dugga2Confirmed: false,
  examConfirmed: false,
  freeDays: ['2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31', '2027-01-01'],
  maxMinutesWeekday: 180,
  maxMinutesWeekend: 120,
  dugga2Moments: ['F10', 'F11', 'F12', 'F13', 'F14', 'F15'],
  trackFrom: '2026-11-18',
  bonusPerDugga: 1,
  theme: 'auto',
}

export function emptyProgress(): Progress {
  return {
    version: 1,
    settings: { ...DEFAULT_SETTINGS, freeDays: [...DEFAULT_SETTINGS.freeDays], dugga2Moments: [...DEFAULT_SETTINGS.dugga2Moments] },
    exercises: {},
    problems: {},
    srs: {},
    planDone: {},
    lessTime: {},
    sims: [],
    duggaResults: {},
    cardReviews: [],
  }
}

/** Fyller i saknade fält (t.ex. efter import av äldre export). */
export function normalizeProgress(raw: unknown): Progress {
  const base = emptyProgress()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<Progress>
  if (r.version !== 1) throw new Error('Okänd version av progressfilen')
  return {
    ...base,
    ...r,
    settings: { ...base.settings, ...(r.settings ?? {}) },
    exercises: r.exercises ?? {},
    problems: r.problems ?? {},
    srs: r.srs ?? {},
    planDone: r.planDone ?? {},
    lessTime: r.lessTime ?? {},
    sims: r.sims ?? [],
    duggaResults: r.duggaResults ?? {},
    cardReviews: r.cardReviews ?? [],
  }
}
