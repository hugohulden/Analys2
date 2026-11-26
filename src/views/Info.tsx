import { AREAS, AREA_BY_ID, EXAM_SLOTS, STRATEGY_POINTS } from '../data/areas'
import { EXERCISES } from '../data/exercises'
import { PROBLEMS, PROBLEM_BY_ID, problemTitle } from '../data/problems'
import { THEORY } from '../data/theory'
import type { AreaId } from '../data/types'
import { useStore } from '../state/store'
import { pct, Rich } from '../components/ui'
import { computeMastery } from '../logic/mastery'
import { useMemo } from 'react'

export function StrategyView() {
  return (
    <div className="page">
      <h1>Strategi</h1>
      <p className="small muted">Tentan: 50 p, 4 h, med formelblad. Betyg 3 ≥ 20, 4 ≥ 30, 5 ≥ 40. Strukturen är mycket stabil: 9 uppgifter i nästan samma ordning.</p>
      <div className="card">
        <ul className="strategy">
          {STRATEGY_POINTS.map((s, i) => (
            <li key={i}>
              <Rich text={s} />
            </li>
          ))}
        </ul>
      </div>
      <div className="card table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Område</th>
              <th>ht24</th>
              <th>ht25</th>
              <th>Omt.</th>
              <th>Typiskt</th>
            </tr>
          </thead>
          <tbody>
            {EXAM_SLOTS.map((s) => (
              <tr key={s.slot}>
                <td>{s.slot}</td>
                <td>{s.name}</td>
                <td>{s.ht24}</td>
                <td>{s.ht25}</td>
                <td>{s.omtenta}</td>
                <td>
                  <strong>{s.typical}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AreasView({ id }: { id?: string }) {
  const { progress, today } = useStore()
  const m = useMemo(() => computeMastery(progress, today), [progress, today])
  if (id && AREA_BY_ID[id as AreaId]) return <AreaDetail id={id as AreaId} mastery={m[id as AreaId]} />
  return (
    <div className="page">
      <h1>Områden</h1>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((slot) => (
        <section key={slot} className="card">
          <h2>Plats {slot}: {EXAM_SLOTS[slot - 1].name}</h2>
          <ul className="plist">
            {AREAS.filter((a) => a.slot === slot).map((a) => (
              <li key={a.id}>
                <a className="plist-btn" href={`#/omraden/${a.id}`}>
                  <span className="plist-title">{a.name}</span>
                  <span className="muted small">{pct(m[a.id])}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function AreaDetail({ id, mastery }: { id: AreaId; mastery: number }) {
  const { progress } = useStore()
  const a = AREA_BY_ID[id]
  const t = THEORY[id]
  const probs = PROBLEMS.filter((p) => p.areas.includes(id))
  const ex = EXERCISES.filter((e) => e.area === id && (e.level === 'G' || e.level === 'högre'))
  return (
    <div className="page">
      <a href="#/omraden" className="link-btn">‹ Områden</a>
      <h1>{a.name}</h1>
      <p className="small muted">Tentaplats {a.slot} · behärskning {pct(mastery)} · {ex.filter((e) => progress.exercises[e.id]).length}/{ex.length} bokövningar gjorda</p>
      <section className="card">
        <h2>Teori</h2>
        <Rich text={t.summary} />
      </section>
      <section className="card">
        <h2>Standardmetod</h2>
        <ol>
          {t.method.map((s, i) => (
            <li key={i}><Rich text={s} /></li>
          ))}
        </ol>
      </section>
      <section className="card warn">
        <h2>Vanliga fällor</h2>
        <ul>
          {t.traps.map((s, i) => (
            <li key={i}><Rich text={s} /></li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>Löst exempel</h2>
        <Rich text={t.example.q} />
        <Rich text={`**Lösning:** ${t.example.a}`} />
        <h3>Fler lösta exempel i banken</h3>
        <ul>
          {t.exampleProblems.map((pid) => (
            <li key={pid}><a href={`#/uppgift/${pid}`}>{problemTitle(PROBLEM_BY_ID[pid])}</a></li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>Alla uppgifter i området ({probs.length})</h2>
        <ul className="plist">
          {probs.map((p) => (
            <li key={p.id}><a className="plist-btn" href={`#/uppgift/${p.id}`}><span className="plist-title">{problemTitle(p)}</span><span className="muted small">{p.points} p</span></a></li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function MoreView() {
  const links = [
    { href: '#/forelasning', t: 'Föreläsningar', d: 'Anteckningar, lärarens exempel, kontrollfrågor' },
    { href: '#/statistik', t: 'Statistik – var står jag?', d: 'Behärskning, förväntade poäng, duggaresultat' },
    { href: '#/simulering', t: 'Tentasimulering', d: 'Riktiga tentor, mixtenta, mini-dugga' },
    { href: '#/strategi', t: 'Strategi', d: 'Tentaanalys: vad ger poäng' },
    { href: '#/omraden', t: 'Områden', d: 'Teori, metod, fällor och exempel per område' },
    { href: '#/kort/formelblad', t: 'Formelbladet', d: 'Exakt det som delas ut' },
    { href: '#/kort/metodvaljare', t: 'Vad gör jag nu?', d: 'Beslutsträd per område' },
    { href: '#/installningar', t: 'Inställningar', d: 'Målbetyg, datum, studietid, export/import' },
  ]
  return (
    <div className="page">
      <h1>Mer</h1>
      <ul className="plist big-links">
        {links.map((l) => (
          <li key={l.href}>
            <a className="plist-btn" href={l.href}>
              <span className="plist-title">
                <strong>{l.t}</strong>
                <br />
                <span className="muted small">{l.d}</span>
              </span>
              <span aria-hidden>›</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
