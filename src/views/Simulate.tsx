import { useEffect, useMemo, useState } from 'react'
import { areaName } from '../data/areas'
import { PROBLEM_BY_ID, TENTOR, problemTitle } from '../data/problems'
import type { SimResult, SourceId } from '../data/types'
import { computeMastery } from '../logic/mastery'
import { finalizeSim, newMiniSim, newMixSim, newRealSim, summarize, type MiniMode } from '../logic/sims'
import { useStore } from '../state/store'
import { go, useRoute } from '../state/router'
import { Figure, Pill, ProgressBar, Rich, Tabs } from '../components/ui'
import { SolutionReveal } from './Bank'

function fmtClock(ms: number) {
  const neg = ms < 0
  const s = Math.floor(Math.abs(ms) / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${neg ? '−' : ''}${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export function SimView() {
  const { progress } = useStore()
  const active = progress.sims.find((s) => !s.done)
  return (
    <div className="page">
      {!location.hash.startsWith('#/uppgifter') && (
        <Tabs value="sim" onChange={(t) => t === 'bank' && go('/uppgifter')} options={[{ id: 'bank', label: 'Tentabanken' }, { id: 'sim', label: 'Simulering' }]} />
      )}
      {active ? (active.submittedAt ? <Grading sim={active} /> : <Running sim={active} />) : <StartMenu />}
    </div>
  )
}

function StartMenu() {
  const { progress, update, today } = useStore()
  const route = useRoute()
  const pre = route.query.get('start')
  const preMini = route.query.get('mini') as MiniMode | null
  const m = useMemo(() => computeMastery(progress, today), [progress, today])
  const start = (sim: SimResult) => update((p) => ({ ...p, sims: [...p.sims, sim] }))
  const done = progress.sims.filter((s) => s.done)
  const last = done[done.length - 1]

  return (
    <>
      <h1>Tentasimulering</h1>
      {(pre || preMini) && (
        <div className="card calm">
          <p>Dagens plan föreslår: <strong>{pre === 'mix' ? 'Mixtenta' : pre ? TENTOR.find((t) => t.id === pre)?.label : `Mini-dugga (${preMini === 'dugga2' ? 'Dugga 2-moment' : 'integrationsmetoder'})`}</strong></p>
          <button
            className="btn primary"
            onClick={() => start(pre === 'mix' ? newMixSim(progress, m) : pre ? newRealSim(pre as SourceId) : newMiniSim(progress, m, preMini ?? 'integration'))}
          >
            Starta nu
          </button>
        </div>
      )}
      <section className="card">
        <h2>Riktig tenta (4 h, formelblad)</h2>
        <p className="small muted">Inga lösningar visas förrän du lämnar in. Rätta dig sedan själv uppgift för uppgift. Betyg: 3 ≥ 20, 4 ≥ 30, 5 ≥ 40 av 50.</p>
        <div className="col gap">
          {TENTOR.map((t) => (
            <button key={t.id} className="btn" onClick={() => start(newRealSim(t.id))}>
              {t.label}
            </button>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>Mixtenta (4 h)</h2>
        <p className="small muted">En uppgift per tentaplats 1–9, hämtad från olika år och egna varianter, viktad mot det du gjort minst. Betygsgränser skalas till maxpoängen (40/60/80 %).</p>
        <button className="btn" onClick={() => start(newMixSim(progress, m))}>Generera mixtenta</button>
      </section>
      <section className="card">
        <h2>Mini-dugga (1 h, utan formelblad)</h2>
        <p className="small muted">3 uppgifter à 2 p. Bonusgräns 4 av 6 p.</p>
        <div className="col gap">
          <button className="btn" onClick={() => start(newMiniSim(progress, m, 'integration'))}>Integrationsmetoder (som Dugga 1)</button>
          <button className="btn" onClick={() => start(newMiniSim(progress, m, 'dugga2'))}>Dugga 2-moment ({progress.settings.dugga2Moments.join(', ')})</button>
        </div>
      </section>
      {last && <Result sim={last} />}
      <History />
    </>
  )
}

function Running({ sim }: { sim: SimResult }) {
  const { update } = useStore()
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const iv = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(iv)
  }, [])
  const left = sim.startedAt + sim.durationMin * 60_000 - now
  const submit = () => {
    if (confirm('Lämna in? Därefter visas lösningarna och du rättar dig själv.')) update((p) => ({ ...p, sims: p.sims.map((s) => (s.id === sim.id ? { ...s, submittedAt: Date.now() } : s)) }))
  }
  const abort = () => {
    if (confirm('Avbryta och ta bort simuleringen?')) update((p) => ({ ...p, sims: p.sims.filter((s) => s.id !== sim.id) }))
  }
  const totalMax = sim.problemIds.reduce((a, id) => a + sim.maxPerProblem[id], 0)
  return (
    <>
      <div className={`timer ${left < 0 ? 'over' : left < 15 * 60_000 ? 'soon' : ''}`} role="timer" aria-live="off">
        <span>{sim.title}</span>
        <strong>{left < 0 ? `Tiden är slut ${fmtClock(left)}` : fmtClock(left)}</strong>
      </div>
      <p className="small muted">
        {totalMax} p. {sim.kind === 'mini' ? 'Inget formelblad. Varje uppgift ger max 2 p.' : <>Hjälpmedel: <a href="#/kort/formelblad">formelbladet</a>.</>} Skriv dina lösningar på papper.
      </p>
      {sim.problemIds.map((id, i) => {
        const p = PROBLEM_BY_ID[id]
        return (
          <section key={id} className="card statement">
            <div className="row between">
              <h3>Uppgift {i + 1}</h3>
              <span className="muted small">{sim.maxPerProblem[id]} p</span>
            </div>
            <Rich text={p.statement} />
            {p.figures?.map((f) => <Figure key={f.src} fig={f} />)}
          </section>
        )
      })}
      <div className="row gap">
        <button className="btn primary" onClick={submit}>Lämna in</button>
        <button className="btn" onClick={abort}>Avbryt</button>
      </div>
    </>
  )
}

function Grading({ sim }: { sim: SimResult }) {
  const { update, today } = useStore()
  const setScore = (pid: string, v: number) => update((p) => ({ ...p, sims: p.sims.map((s) => (s.id === sim.id ? { ...s, scores: { ...s.scores, [pid]: v } } : s)) }))
  const allScored = sim.problemIds.every((id) => sim.scores[id] !== null && sim.scores[id] !== undefined)
  const sum = summarize(sim)
  return (
    <>
      <h1>Rätta: {sim.title}</h1>
      <p className="small muted">Jämför med lösningen och sätt poäng som en rättare skulle göra. Motiveringar krävs för full poäng.</p>
      {sim.problemIds.map((id, i) => {
        const p = PROBLEM_BY_ID[id]
        const max = sim.maxPerProblem[id]
        const steps = sim.kind === 'mini' ? [0, 1, 2] : (p.pointSteps ?? Array.from({ length: max + 1 }, (_, k) => k))
        return (
          <section key={id} className="card">
            <div className="row between">
              <h3>Uppgift {i + 1} <span className="muted small">({problemTitle(p)})</span></h3>
              <span className="muted small">max {max} p</span>
            </div>
            <Rich text={p.statement} />
            {p.figures?.map((f) => <Figure key={f.src} fig={f} />)}
            <SolutionReveal p={p} startAt={3} />
            <div className="points" role="group" aria-label="Poäng">
              {steps.map((v) => (
                <button key={v} className={`pt ${sim.scores[id] === v ? 'on' : ''}`} onClick={() => setScore(id, v)}>
                  {v}
                </button>
              ))}
            </div>
          </section>
        )
      })}
      <div className="card sticky-bottom">
        <div className="row between">
          <span>
            Hittills: <strong>{sum.total}</strong> / {sum.max} p
          </span>
          <button className="btn primary" disabled={!allScored} onClick={() => update((p) => finalizeSim(p, sim.id, today))}>
            Klar med rättningen
          </button>
        </div>
      </div>
    </>
  )
}

export function Result({ sim }: { sim: SimResult }) {
  const s = summarize(sim)
  return (
    <section className="card">
      <h2>Senaste resultat: {sim.title}</h2>
      <p className="big">
        {s.total} / {s.max} p · <strong>{sim.kind === 'mini' ? s.grade : s.grade === 'U' ? 'Underkänt' : `Betyg ${s.grade}`}</strong>
      </p>
      <h4>Poäng per område</h4>
      {s.perArea.map((a) => (
        <div key={a.area} className="area-row">
          <div className="row between small">
            <span>{areaName(a.area)}</span>
            <span className="muted">
              {Math.round(a.got * 10) / 10}/{Math.round(a.max * 10) / 10}
            </span>
          </div>
          <ProgressBar value={a.got} max={a.max} />
        </div>
      ))}
    </section>
  )
}

function History() {
  const { progress, update } = useStore()
  const done = progress.sims.filter((s) => s.done)
  if (!done.length) return null
  const pts = done.map((s) => {
    const r = summarize(s)
    return { s, pct: r.max ? r.total / r.max : 0, r }
  })
  // Trenddiagram: en serie (andel av maxpoäng), referenslinjer för betygsgränser.
  const W = 320
  const H = 140
  const pad = { l: 30, r: 10, t: 10, b: 20 }
  const x = (i: number) => pad.l + (pts.length === 1 ? (W - pad.l - pad.r) / 2 : (i * (W - pad.l - pad.r)) / (pts.length - 1))
  const y = (v: number) => pad.t + (1 - v) * (H - pad.t - pad.b)
  return (
    <section className="card">
      <h2>Historik</h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Andel av maxpoäng per simulering över tid">
        {[0.4, 0.6, 0.8].map((g, i) => (
          <g key={g}>
            <line x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} className="chart-ref" />
            <text x={4} y={y(g) + 3} className="chart-axis">{i + 3}</text>
          </g>
        ))}
        <line x1={pad.l} x2={W - pad.r} y1={y(0)} y2={y(0)} className="chart-base" />
        {pts.length > 1 && <polyline points={pts.map((p, i) => `${x(i)},${y(p.pct)}`).join(' ')} className="chart-line" />}
        {pts.map((p, i) => (
          <g key={p.s.id}>
            <circle cx={x(i)} cy={y(p.pct)} r={10} className="chart-hit">
              <title>{`${p.s.title}: ${p.r.total}/${p.r.max} p (${Math.round(p.pct * 100)} %)`}</title>
            </circle>
            {p.s.kind === 'mini' ? (
              <rect x={x(i) - 4} y={y(p.pct) - 4} width={8} height={8} transform={`rotate(45 ${x(i)} ${y(p.pct)})`} className="chart-dot" />
            ) : (
              <circle cx={x(i)} cy={y(p.pct)} r={4.5} className="chart-dot" />
            )}
          </g>
        ))}
      </svg>
      <p className="small muted">Linjer: betygsgräns 3 (40 %), 4 (60 %), 5 (80 %). ● tenta/mix, ◆ mini-dugga.</p>
      <ul className="plist">
        {[...pts].reverse().map(({ s, r }) => (
          <li key={s.id} className="row between small">
            <span>
              {new Date(s.startedAt).toLocaleDateString('sv-SE')} · {s.title} <Pill>{s.kind === 'mini' ? r.grade : `Betyg ${r.grade}`}</Pill>
            </span>
            <span>
              {r.total}/{r.max}
              <button className="link-btn" aria-label="Ta bort" onClick={() => confirm('Ta bort simuleringen ur historiken?') && update((p) => ({ ...p, sims: p.sims.filter((x) => x.id !== s.id) }))}>
                ✕
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
