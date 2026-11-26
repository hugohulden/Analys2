import { useMemo } from 'react'
import { PracticeGuide, PreviewGuide } from '../components/MomentGuide'
import { AREAS } from '../data/areas'
import { EXERCISES, EXERCISE_BY_ID, momentExercises } from '../data/exercises'
import { MOMENTS, WEEKS } from '../data/schedule'
import type { Moment } from '../data/types'
import { clearAsk } from '../logic/actions'
import { formatShort } from '../logic/dates'
import { exerciseLabel } from '../logic/parse'
import { nextExerciseSession } from '../logic/planner'
import { useStore } from '../state/store'
import { Collapsible, Pill, ProgressBar } from '../components/ui'
import { ExerciseRow } from '../components/ExerciseRow'
import type { ExerciseLevel } from '../data/types'

const levelFor = (title: string): ExerciseLevel => (title === 'G-nivå' ? 'G' : title === 'Högre nivå' ? 'högre' : title.includes('högre') ? 'demo-högre' : 'demo-G')

export function CourseView() {
  const { progress, today } = useStore()
  const nextO = nextExerciseSession(today)
  const inclHigher = false // högre nivå räknas inte i progress under grundveckorna
  const higherFrom = progress.settings.higherFrom ?? '2026-12-21'
  const counted = (lvl: string) => lvl === 'G' || (inclHigher && lvl === 'högre')

  const areaStats = useMemo(
    () =>
      AREAS.map((a) => {
        const ex = EXERCISES.filter((e) => e.area === a.id && counted(e.level))
        return { a, total: ex.length, done: ex.filter((e) => progress.exercises[e.id]).length }
      }).filter((x) => x.total > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress.exercises, inclHigher],
  )
  const asks = Object.entries(progress.exercises).filter(([, e]) => e.ask && e.status !== 'ok')

  return (
    <div className="page">
      <h1>Kursplan</h1>
      <p className="muted small">Markera varje uppgift: ✅ klarade själv · 🟡 klarade med hjälp · ❌ fattar inte. 🟡 och ❌ hamnar i repetitionskön och flaggas till nästa Ö-pass. Progress räknar G-nivå. Högre nivå tas med i passen från {formatShort(higherFrom)} (målbetyg 4/5), när grunderna sitter.</p>

      {asks.length > 0 && (
        <div className="card calm">
          <h2>Fråga på Ö-passet {nextO && <span className="muted small">(nästa: {formatShort(nextO)})</span>}</h2>
          <ul className="checklist">
            {asks.map(([id, e]) => (
              <AskRow key={id} id={id} status={e.status} />
            ))}
          </ul>
        </div>
      )}

      {WEEKS.map((w) => {
        const moments = MOMENTS.filter((m) => m.date >= w.from && m.date <= w.to)
        const ex = moments.flatMap((m) => [...momentExercises(m).g, ...(inclHigher ? momentExercises(m).higher : [])])
        const uniq = [...new Set(ex)]
        const done = uniq.filter((id) => progress.exercises[id]).length
        return (
          <section key={w.week} className="card week">
            <div className="row between">
              <h2>Vecka {w.week}</h2>
              <span className="muted small">{formatShort(w.from)}–{formatShort(addDaysLite(w.to, -2))} · {done}/{uniq.length}</span>
            </div>
            <ProgressBar value={done} max={Math.max(1, uniq.length)} />
            {moments.map((m) => (
              <MomentRow key={m.id} m={m} />
            ))}
          </section>
        )
      })}

      <section className="card">
        <h2>Progress per område</h2>
        {areaStats.map(({ a, total, done }) => (
          <div key={a.id} className="area-row">
            <div className="row between small">
              <a href={`#/omraden/${a.id}`}>{a.name}</a>
              <span className="muted">{done}/{total}</span>
            </div>
            <ProgressBar value={done} max={total} />
          </div>
        ))}
      </section>
    </div>
  )
}

function addDaysLite(iso: string, n: number) {
  const d = new Date(iso + 'T12:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

function AskRow({ id, status }: { id: string; status: string }) {
  const { update } = useStore()
  return (
    <li className="ci">
      <span className="ci-label">{status === 'fail' ? '❌' : '🟡'} {EXERCISE_BY_ID[id]?.label ?? exerciseLabel(id)}</span>
      <button className="btn small-btn" onClick={() => update((p) => clearAsk(p, id))}>Frågat ✓</button>
    </li>
  )
}

function MomentRow({ m }: { m: Moment }) {
  const { progress, today } = useStore()
  const e = momentExercises(m)
  const all = [...new Set([...e.g, ...e.higher])]
  const done = all.filter((id) => progress.exercises[id]).length
  const isToday = m.date === today
  const kindPill = m.kind === 'F' ? <Pill>Föreläsning</Pill> : m.kind === 'Ö' ? <Pill tone="info">Övning</Pill> : <Pill tone="warn">Dugga</Pill>

  // Vanlig funktion (inte komponent) så att raderna behåller sitt öppna/stängda läge vid omritning.
  const list = (title: string, ids: string[]) =>
    ids.length ? (
      <div className="ex-group">
        <h4>{title}</h4>
        <ul className="exlist">
          {ids.map((id) => {
            const other = EXERCISE_BY_ID[id]?.momentId !== m.id && !title.startsWith('Demo') ? EXERCISE_BY_ID[id]?.momentId : undefined
            return (
              <ExerciseRow key={id} id={id} level={levelFor(title)} showMoment={false} note={<>{progress.exercises[id]?.ask && progress.exercises[id]?.status !== 'ok' ? <span className="chip-sm st st-fail">🙋 fråga</span> : null}{other ? <span className="chip-sm ghost">se {other}</span> : null}</>} />
            )
          })}
        </ul>
      </div>
    ) : null

  return (
    <Collapsible
      title={
        <span className={isToday ? 'today-mark' : ''}>
          <strong>{m.id}</strong> <span className="muted small">{formatShort(m.date)}</span> {kindPill}
          <br />
          <span className="small">{m.title}</span>
        </span>
      }
      right={all.length ? <span className="muted small">{done}/{all.length}</span> : undefined}
      defaultOpen={isToday}
    >
      <p className="small muted">Avsnitt: {m.sections}</p>
      {m.note && <p className="small warn-text">{m.note}</p>}
      {m.kind !== 'dugga' && <a className="btn small-btn" href={`#/forelasning/${m.id}`}>📓 Öppna {m.kind === 'F' ? 'föreläsningssidan' : 'sidan för Ö-passet'}</a>}
      <PreviewGuide momentId={m.id} />
      {m.kind === 'F' && <PracticeGuide momentId={m.id} />}
      {list('G-nivå', e.g)}
      {list('Högre nivå', e.higher)}
      {list('Demo (G)', e.demoG)}
      {list('Demo (högre)', e.demoHigher)}
      {!all.length && !e.demoG.length && <p className="small muted">Inga övningsuppgifter.</p>}
    </Collapsible>
  )
}

