import { useMemo, useState } from 'react'
import { AREAS, areaName } from '../data/areas'
import { PROBLEMS, PROBLEM_BY_ID, SOURCES, SOURCE_BY_ID, problemTitle } from '../data/problems'
import type { AreaId, Problem, Progress, SourceId } from '../data/types'
import { gradeProblem } from '../logic/actions'
import { useStore } from '../state/store'
import { go } from '../state/router'
import { Figure, Pill, Rich, Tabs } from '../components/ui'
import { SimView } from './Simulate'

type StatusFilter = 'alla' | 'ny' | 'noll' | 'delvis' | 'full'

export function lastScore(p: Progress, pid: string): number | undefined {
  const a = p.problems[pid]
  return a?.length ? a[a.length - 1].score : undefined
}

function statusOf(p: Progress, pid: string): Exclude<StatusFilter, 'alla'> {
  const s = lastScore(p, pid)
  if (s === undefined) return 'ny'
  if (s >= 1) return 'full'
  if (s > 0) return 'delvis'
  return 'noll'
}

const STATUS_LABEL: Record<Exclude<StatusFilter, 'alla'>, string> = { ny: 'Ej gjord', noll: '0 p', delvis: 'Delvis', full: 'Full poäng' }
const LIST_KEY = 'bank-list'
const FILTER_KEY = 'bank-filter'

interface Filter {
  area: AreaId | ''
  source: SourceId | ''
  points: '' | 'low' | 'mid' | 'high'
  status: StatusFilter
}

function loadFilter(): Filter {
  try {
    return { area: '', source: '', points: '', status: 'alla', ...JSON.parse(sessionStorage.getItem(FILTER_KEY) ?? '{}') }
  } catch {
    return { area: '', source: '', points: '', status: 'alla' }
  }
}

export function BankView() {
  const [tab, setTab] = useState<'bank' | 'sim'>(() => (location.hash.includes('sim') ? 'sim' : 'bank'))
  return (
    <div className="page">
      <Tabs value={tab} onChange={(t) => (t === 'sim' ? go('/simulering') : setTab(t))} options={[{ id: 'bank', label: 'Tentabanken' }, { id: 'sim', label: 'Simulering' }]} />
      {tab === 'bank' ? <BankList /> : <SimView />}
    </div>
  )
}

function BankList() {
  const { progress } = useStore()
  const [f, setF] = useState<Filter>(loadFilter)
  const upd = (patch: Partial<Filter>) => {
    const nf = { ...f, ...patch }
    setF(nf)
    try {
      sessionStorage.setItem(FILTER_KEY, JSON.stringify(nf))
    } catch {
      /* ignorera */
    }
  }
  const list = useMemo(
    () =>
      PROBLEMS.filter(
        (p) =>
          (!f.area || p.areas.includes(f.area)) &&
          (!f.source || p.source === f.source) &&
          (!f.points || (f.points === 'low' ? p.points <= 2 : f.points === 'mid' ? p.points >= 3 && p.points <= 4 : p.points >= 5)) &&
          (f.status === 'alla' || statusOf(progress, p.id) === f.status),
      ),
    [f, progress],
  )
  const open = (id: string) => {
    try {
      sessionStorage.setItem(LIST_KEY, JSON.stringify(list.map((p) => p.id)))
    } catch {
      /* ignorera */
    }
    go(`/uppgift/${id}`)
  }

  const bySource = SOURCES.map((s) => ({ s, items: list.filter((p) => p.source === s.id) })).filter((x) => x.items.length)

  return (
    <>
      <div className="filters">
        <select value={f.area} onChange={(e) => upd({ area: e.target.value as AreaId })} aria-label="Område">
          <option value="">Alla områden</option>
          {AREAS.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <select value={f.source} onChange={(e) => upd({ source: e.target.value as SourceId })} aria-label="Källa">
          <option value="">Alla källor</option>
          {SOURCES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <select value={f.points} onChange={(e) => upd({ points: e.target.value as Filter['points'] })} aria-label="Poäng">
          <option value="">Alla poäng</option>
          <option value="low">1–2 p</option>
          <option value="mid">3–4 p</option>
          <option value="high">5–6 p</option>
        </select>
        <select value={f.status} onChange={(e) => upd({ status: e.target.value as StatusFilter })} aria-label="Status">
          <option value="alla">Alla statusar</option>
          {Object.entries(STATUS_LABEL).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <p className="muted small">{list.length} uppgifter</p>
      {bySource.map(({ s, items }) => (
        <section key={s.id} className="card">
          <h2>{s.label}</h2>
          <ul className="plist">
            {items.map((p) => {
              const st = statusOf(progress, p.id)
              return (
                <li key={p.id}>
                  <button className="plist-btn" onClick={() => open(p.id)}>
                    <span className={`dot ${st}`} aria-label={STATUS_LABEL[st]} />
                    <span className="plist-title">
                      <strong>{p.source === 'variant' ? `V${p.number}` : `#${p.number}`}</strong> {areaName(p.areas[0])}
                    </span>
                    <span className="muted small">{p.points} p</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </>
  )
}

const STAGES = ['Ledtråd', 'Metod', 'Lösning', 'Svar'] as const

export function SolutionReveal({ p, startAt = 0 }: { p: Problem; startAt?: number }) {
  const [stage, setStage] = useState(startAt)
  return (
    <div className="reveal">
      {stage >= 1 && (
        <div className="reveal-part hint">
          <h4>Ledtråd</h4>
          <Rich text={p.hint} />
        </div>
      )}
      {stage >= 2 && (
        <div className="reveal-part method">
          <h4>Metod</h4>
          <Rich text={p.method} />
        </div>
      )}
      {stage >= 3 && (
        <div className="reveal-part steps">
          <h4>Lösning</h4>
          <ol className="steps">
            {p.steps.map((s, i) => (
              <li key={i}>
                <Rich text={s} />
              </li>
            ))}
          </ol>
          {p.solutionFigure && <Figure fig={p.solutionFigure} />}
        </div>
      )}
      {stage >= 4 && (
        <div className="reveal-part answer">
          <h4>Svar</h4>
          <Rich text={p.answer} />
        </div>
      )}
      {stage < 4 && (
        <div className="row wrap gap">
          <button className="btn primary" onClick={() => setStage(stage + 1)}>
            Visa {STAGES[stage].toLowerCase()}
          </button>
          {stage < 3 && (
            <button className="btn" onClick={() => setStage(4)}>
              Visa allt
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function ProblemView({ id }: { id: string }) {
  const { progress, update, today } = useStore()
  const p = PROBLEM_BY_ID[id]
  const [graded, setGraded] = useState<number | null>(null)
  if (!p) return <div className="page"><p>Uppgiften finns inte.</p><a href="#/uppgifter">Till tentabanken</a></div>

  let list: string[] = []
  try {
    list = JSON.parse(sessionStorage.getItem(LIST_KEY) ?? '[]')
  } catch {
    /* ignorera */
  }
  if (!list.includes(id)) list = PROBLEMS.map((x) => x.id)
  const idx = list.indexOf(id)
  const prev = idx > 0 ? list[idx - 1] : undefined
  const next = idx < list.length - 1 ? list[idx + 1] : undefined
  const attempts = progress.problems[id] ?? []
  const src = SOURCE_BY_ID[p.source]

  const grade = (score: number) => {
    update((pr) => gradeProblem(pr, id, score, today, 'bank'))
    setGraded(score)
  }

  return (
    <div className="page problem" key={id}>
      <div className="row between">
        <a href="#/uppgifter" className="link-btn">‹ Tentabanken</a>
        <span className="muted small">{idx + 1}/{list.length}</span>
      </div>
      <h1>{problemTitle(p)} <span className="muted">({p.points} p)</span></h1>
      <div className="row wrap gap small">
        {p.source === 'variant' ? <Pill tone="info">Variant (ej från tenta)</Pill> : <Pill>{src.label}</Pill>}
        <Pill>Tentaplats {p.slot}</Pill>
        {p.areas.map((a) => (
          <a key={a} href={`#/omraden/${a}`}><Pill tone="info">{areaName(a)}</Pill></a>
        ))}
      </div>
      <div className="card statement">
        <Rich text={p.statement} />
        {p.figures?.map((f) => <Figure key={f.src} fig={f} />)}
      </div>

      <SolutionReveal key={id} p={p} />

      <div className="card grade">
        <h3>Självrättning</h3>
        <p className="small muted">Hur gick ditt försök? Uppdaterar behärskning och repetitionskön.</p>
        <div className="row gap">
          <button className={`btn ${graded === 0 ? 'bad' : ''}`} onClick={() => grade(0)}>0 p</button>
          <button className={`btn ${graded === 0.5 ? 'warn' : ''}`} onClick={() => grade(0.5)}>Delvis</button>
          <button className={`btn ${graded === 1 ? 'ok' : ''}`} onClick={() => grade(1)}>Full poäng</button>
        </div>
        {graded !== null && <p className="small ok-text">Sparat. {graded >= 1 ? 'Kommer tillbaka om några dagar.' : 'Kommer tillbaka i repetitionen imorgon.'}</p>}
        {attempts.length > 0 && (
          <p className="small muted">
            Tidigare försök: {attempts.slice(-6).map((a) => `${a.date.slice(5)} ${a.score >= 1 ? '✓' : a.score > 0 ? '½' : '✗'}`).join(' · ')}
          </p>
        )}
      </div>

      <div className="row between">
        {prev ? <a className="btn" href={`#/uppgift/${prev}`}>‹ Föregående</a> : <span />}
        {next ? <a className="btn" href={`#/uppgift/${next}`}>Nästa ›</a> : <span />}
      </div>
    </div>
  )
}
