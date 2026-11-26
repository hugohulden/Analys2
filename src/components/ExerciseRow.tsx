import { useState, type ReactNode } from 'react'
import { EXERCISE_BY_ID } from '../data/exercises'
import type { ExerciseLevel, ExerciseStatus } from '../data/types'
import { setExerciseStatus } from '../logic/actions'
import { exerciseLabel } from '../logic/parse'
import { useStore } from '../state/store'
import { ExerciseInfo } from './ExerciseInfo'

const STATUS: { s: ExerciseStatus; label: string; icon: ReactNode }[] = [
  {
    s: 'ok', label: 'Klarade själv',
    icon: <path d="M5 12.5l4.2 4.2L19 7" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    s: 'help', label: 'Klarade med hjälp',
    icon: <path d="M9.2 9.3a2.9 2.9 0 1 1 3.9 2.7c-.7.3-1.1.9-1.1 1.6v.6M12 17.6v.1" fill="none" strokeWidth="2.4" strokeLinecap="round" />,
  },
  {
    s: 'fail', label: 'Fattar inte',
    icon: <path d="M7 7l10 10M17 7L7 17" fill="none" strokeWidth="2.6" strokeLinecap="round" />,
  },
]

/** Tre tydliga statusknappar (klarade / med hjälp / fattar inte). Tryck igen för att nollställa. */
export function StatusSegment({ value, onChange }: { value?: ExerciseStatus; onChange: (s: ExerciseStatus | null) => void }) {
  return (
    <span className="seg-status" role="group" aria-label="Status">
      {STATUS.map(({ s, label, icon }) => (
        <button key={s} type="button" className={`ss ss-${s} ${value === s ? 'on' : ''}`} title={label} aria-label={label} aria-pressed={value === s} onClick={(e) => { e.stopPropagation(); onChange(value === s ? null : s) }}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" aria-hidden>
            {icon}
          </svg>
        </button>
      ))}
    </span>
  )
}

const LEVEL_TEXT: Record<ExerciseLevel, string> = { G: 'G', högre: 'Högre', 'demo-G': 'Demo', 'demo-högre': 'Demo · högre' }
export const STATUS_WORD: Record<ExerciseStatus, string> = { ok: 'Klar', help: 'Med hjälp', fail: 'Fråga på Ö-passet' }

/** En övningsrad: nummer, etiketter, statusknappar och utfällbar uppgift/tips/lösning/svar. */
export function ExerciseRow({ id, level, minutes, showMoment = true, note }: { id: string; level?: ExerciseLevel; minutes?: number; showMoment?: boolean; note?: ReactNode }) {
  const { progress, update, today } = useStore()
  const [open, setOpen] = useState(false)
  const st = progress.exercises[id]
  const ex = EXERCISE_BY_ID[id]
  const lv = level ?? ex?.level
  return (
    <li className={`exr ${st ? `st-${st.status}` : ''} ${open ? 'open' : ''}`}>
      <div className="exr-line">
        <button type="button" className="exr-main" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span className="exr-num">{exerciseLabel(id)}</span>
          <span className="exr-chips">
            {lv && <span className={`chip-sm lv-${lv.startsWith('demo') ? 'demo' : lv === 'G' ? 'g' : 'h'}`}>{LEVEL_TEXT[lv]}</span>}
            {showMoment && ex && <span className="chip-sm">{ex.momentId}</span>}
            {minutes ? <span className="chip-sm ghost">{minutes} min</span> : null}
            {st && <span className={`chip-sm st st-${st.status}`}>{STATUS_WORD[st.status]}</span>}
            {note}
          </span>
          <svg className="exr-chev" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <StatusSegment value={st?.status} onChange={(s) => update((p) => setExerciseStatus(p, id, s, today))} />
      </div>
      {open && <ExerciseInfo id={id} />}
    </li>
  )
}

const CHAPTER: Record<string, string> = {
  '6': 'Komplexa tal', '11': 'Maclaurin & Taylor', '12': 'Primitiva funktioner', '13': 'Integraler', '14': 'Användning av integraler', '15': 'Differentialekvationer',
}

export function chapterOf(id: string): string {
  if (id.includes(':')) return 'Övningshäften'
  const ch = id.split('.')[0]
  return CHAPTER[ch] ? `Kap ${ch} · ${CHAPTER[ch]}` : `Kap ${ch}`
}

/** Grupperar rader per kapitel i den ordning de först förekommer. */
export function groupByChapter<T>(items: T[], idOf: (t: T) => string): [string, T[]][] {
  const m = new Map<string, T[]>()
  for (const it of items) {
    const k = chapterOf(idOf(it))
    m.set(k, [...(m.get(k) ?? []), it])
  }
  return [...m.entries()]
}

/** Förloppsrubrik för ett övningsblock. */
export function ExerciseProgress({ done, total, minutesLeft }: { done: number; total: number; minutesLeft: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  const msg =
    done === total && total > 0
      ? 'Alla klara – snyggt jobbat! 🎉'
      : done === 0
        ? 'Börja med de första – det är farten som räknas.'
        : pct >= 50
          ? 'Över halvvägs – fortsätt så!'
          : 'Bra start – en i taget.'
  return (
    <div className={`exprog ${done === total && total > 0 ? 'complete' : ''}`}>
      <div className="exprog-top">
        <span className="exprog-count">
          <strong>{done}</strong> av {total} klara
        </span>
        <span className="exprog-left">{done === total ? '✓' : `≈ ${minutesLeft} min kvar`}</span>
      </div>
      <div className="exprog-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div style={{ width: `${pct}%` }} />
      </div>
      <div className="exprog-msg">{msg}</div>
    </div>
  )
}
