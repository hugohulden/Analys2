import { useMemo, useState } from 'react'
import { ExerciseInfo } from '../components/ExerciseInfo'
import { PracticeGuide, PreviewGuide } from '../components/MomentGuide'
import { EXERCISE_BY_ID } from '../data/exercises'
import { MOMENT_BY_ID } from '../data/schedule'
import { setExerciseStatus, toggleDone } from '../logic/actions'
import { addDays, diffDays, formatLong, todayISO } from '../logic/dates'
import { buildDayPlan, type PlanItem } from '../logic/planner'
import { useStore } from '../state/store'
import { useRoute, go } from '../state/router'
import { fmtMin, Pill, ProgressBar, StatusButtons, RichInline } from '../components/ui'

function Countdown({ label, date, confirmed }: { label: string; date: string; confirmed: boolean }) {
  const { today } = useStore()
  const d = diffDays(today, date)
  return (
    <a className="countdown" href="#/installningar">
      <span className="cd-num">{d < 0 ? '✓' : d}</span>
      <span className="cd-label">
        {d === 0 ? `${label} idag!` : d < 0 ? `${label} klar` : `dagar till ${label}`}
        {!confirmed && d >= 0 && <span className="cd-warn"> · antaget datum</span>}
      </span>
    </a>
  )
}

export function TodayView() {
  const { progress, update, today } = useStore()
  const route = useRoute()
  const date = route.query.get('dag') ?? today
  const plan = useMemo(() => buildDayPlan(date, progress), [date, progress])
  const [openEx, setOpenEx] = useState<string | null>(null)
  const s = progress.settings

  const all = plan.blocks.flatMap((b) => b.items)
  const doneMin = all.filter((i) => i.done).reduce((a, i) => a + i.minutes, 0)
  const isToday = date === today

  const setDay = (d: string) => go(d === today ? '/idag' : `/idag?dag=${d}`)

  return (
    <div className="page today">
      <div className="countdowns">
        <Countdown label="Dugga 2" date={s.dugga2Date} confirmed={s.dugga2Confirmed} />
        <Countdown label="tentan" date={s.examDate} confirmed={s.examConfirmed} />
      </div>

      <div className="day-nav">
        <button className="icon-btn" onClick={() => setDay(addDays(date, -1))} aria-label="Föregående dag">‹</button>
        <div className="day-nav-title">
          <div className="day-date">{isToday ? 'Idag, ' : ''}{formatLong(date)}</div>
          {!isToday && <button className="link-btn" onClick={() => setDay(today)}>Till idag</button>}
        </div>
        <button className="icon-btn" onClick={() => setDay(addDays(date, 1))} aria-label="Nästa dag">›</button>
      </div>

      <h1 className="day-title">{plan.title}</h1>
      {plan.note && <p className="muted small">{plan.note}</p>}
      {(!s.dugga2Confirmed || !s.examConfirmed) && isToday && (
        <p className="banner warn small">Datum för {[!s.dugga2Confirmed && 'Dugga 2', !s.examConfirmed && 'tentan'].filter(Boolean).join(' och ')} är antagna. <a href="#/installningar">Bekräfta eller ändra</a>.</p>
      )}

      {all.length > 0 && (
        <div className="card summary">
          <div className="row between">
            <span>
              <strong>{fmtMin(doneMin)}</strong> av {fmtMin(plan.totalMin)}
            </span>
            <span className="muted small">max {fmtMin(plan.budgetMin)}</span>
          </div>
          <ProgressBar value={doneMin} max={Math.max(1, plan.totalMin)} tone="ok" />
          <label className="toggle">
            <input type="checkbox" checked={plan.lessTime} onChange={(e) => update((p) => ({ ...p, lessTime: { ...p.lessTime, [date]: e.target.checked } }))} />
            Jag har mindre tid idag (45 min)
          </label>
          {plan.behind > 0 && <p className="small warn-text">Du ligger {plan.behind} övningar efter. Passet har planerats om: ikapp först, repetitionen skjuts upp vid behov, nytt stoff ligger kvar.</p>}
          {plan.repetitionPostponed && <p className="small muted">Repetitionen förskjuts idag för att passet inte ska bli för långt.</p>}
        </div>
      )}

      {plan.kind === 'free' && <div className="card center"><p className="big">🎄 Ledigt!</p><p className="muted">Vila är också en del av planen.</p></div>}
      {plan.kind === 'before' && <div className="card"><p>Studieplanen börjar måndag 23/11. Bläddra framåt med pilen.</p></div>}
      {plan.kind === 'after' && <div className="card center"><p className="big">🎉</p><p>Tentan är gjord. Glöm inte att fylla i resultatet!</p></div>}

      {plan.blocks.map((b) => (
        <section key={b.id + b.title} className={`card block ${b.tone ?? ''}`}>
          <div className="block-head">
            <h2>{b.title}</h2>
            <span className="muted small">{fmtMin(b.items.reduce((a, i) => a + i.minutes, 0))}</span>
          </div>
          {b.note && <p className="small muted">{b.note}</p>}
          {b.id === 'rep' && b.items.some((i) => !i.done) && (
            <button className="btn primary small-btn" onClick={() => go(`/repetition?keys=${encodeURIComponent(b.items.filter((i) => !i.done).map((i) => i.srsKey).join(','))}`)}>
              Starta repetition ({b.items.filter((i) => !i.done).length})
            </button>
          )}
          {b.id === 'nytt' &&
            b.items.filter((i) => i.id.startsWith('lec:')).map((i) => <PreviewGuide key={i.id} momentId={i.id.slice(4)} />)}
          {b.id === 'ovningar' &&
            [...new Set(b.items.map((i) => EXERCISE_BY_ID[i.exerciseId ?? '']?.momentId).filter(Boolean))].map((mid) => <PracticeGuide key={mid} momentId={mid!} />)}
          <ul className="checklist">
            {b.items.map((it) => (
              <PlanRow key={it.id} it={it} date={date} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )

  function PlanRow({ it, date }: { it: PlanItem; date: string }) {
    const t = today ?? todayISO()
    if (it.kind === 'exercise' || it.kind === 'demo' || (it.kind === 'info' && it.exerciseId)) {
      const ex = it.exerciseId!
      const st = progress.exercises[ex]
      const mom = MOMENT_BY_ID[EXERCISE_BY_ID[ex]?.momentId]
      const open = openEx === ex
      return (
        <li className={`ci ci-ex ${st ? 'done' : ''}`}>
          <div className="ci-row">
            <button type="button" className="ci-label link-btn ci-toggle" onClick={() => setOpenEx(open ? null : ex)} aria-expanded={open}>
              {open ? '▾' : '▸'} {it.kind === 'demo' && <Pill tone="info">demo</Pill>} {it.label}
              {mom && it.kind !== 'demo' && <span className="muted small"> · {mom.id}</span>}
            </button>
            <span className="ci-right">
              {it.minutes > 0 && <span className="muted small">{it.minutes}′</span>}
              <StatusButtons value={st?.status} onChange={(s) => update((p) => setExerciseStatus(p, ex, s, t))} />
            </span>
          </div>
          {open && <ExerciseInfo id={ex} />}
        </li>
      )
    }
    if (it.kind === 'problem') {
      return (
        <li className={`ci ${it.done ? 'done' : ''}`}>
          <a className="ci-label" href={`#/uppgift/${it.problemId}`}>
            {it.done ? '✓ ' : ''}{it.label} →
          </a>
          <span className="muted small">{it.minutes}′</span>
        </li>
      )
    }
    if (it.kind === 'review') {
      return (
        <li className={`ci ${it.done ? 'done' : ''}`}>
          <span className="ci-label">{it.done ? '✓ ' : ''}{it.label}</span>
          <span className="muted small">{it.minutes}′</span>
        </li>
      )
    }
    const hasLink = !!it.link
    return (
      <li className={`ci ${it.done ? 'done' : ''}`}>
        <label className="ci-label check">
          <input type="checkbox" checked={it.done} onChange={() => update((p) => toggleDone(p, date, it.id))} />
          <RichInline text={it.label} />
        </label>
        <span className="ci-right">
          {it.minutes > 0 && <span className="muted small">{fmtMin(it.minutes)}</span>}
          {hasLink && <a className="btn small-btn" href={it.link}>Öppna</a>}
        </span>
      </li>
    )
  }
}
