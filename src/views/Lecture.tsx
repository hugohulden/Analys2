import { useMemo, useState } from 'react'
import { GUIDES } from '../data/guides'
import { LECTURES, type LectureExample } from '../data/lectures'
import { MOMENTS, MOMENT_BY_ID } from '../data/schedule'
import { formatShort } from '../logic/dates'
import { srsKey } from '../logic/leitner'
import { useStore } from '../state/store'
import { go } from '../state/router'
import { Collapsible, Pill, Rich } from '../components/ui'
import { PracticeGuide, PreviewGuide } from '../components/MomentGuide'

export function LectureView({ id }: { id?: string }) {
  if (!id || !MOMENT_BY_ID[id]) return <LectureList />
  return <LecturePage key={id} id={id} />
}

function LectureList() {
  const { today } = useStore()
  return (
    <div className="page">
      <h1>Föreläsningar</h1>
      <p className="small muted">Sammanfattning av lärarens anteckningar, lärarens exempel att räkna själv, kontrollfrågor och de inskannade originalsidorna.</p>
      <ul className="plist card">
        {MOMENTS.filter((m) => m.kind !== 'dugga').map((m) => (
          <li key={m.id}>
            <a className="plist-btn" href={`#/forelasning/${m.id}`}>
              <span className="plist-title">
                <strong>{m.id}</strong> <span className="muted small">{formatShort(m.date)}</span>
                <br />
                <span className="small">{m.title}</span>
              </span>
              {LECTURES[m.id] ? <Pill tone="ok">anteckningar</Pill> : m.date < today && m.kind === 'F' ? <Pill>väntar</Pill> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LecturePage({ id }: { id: string }) {
  const m = MOMENT_BY_ID[id]
  const lec = LECTURES[id]
  const idx = MOMENTS.findIndex((x) => x.id === id)
  const prev = MOMENTS.slice(0, idx).reverse().find((x) => x.kind !== 'dugga')
  const next = MOMENTS.slice(idx + 1).find((x) => x.kind !== 'dugga')
  const base = import.meta.env.BASE_URL

  return (
    <div className="page lecture">
      <a href="#/forelasning" className="link-btn">‹ Alla föreläsningar</a>
      <h1>
        {m.id}: {m.title}
      </h1>
      <p className="small muted">
        {formatShort(m.date)} · {lec?.sections ?? `Avsnitt ${m.sections}`}
      </p>

      {m.kind === 'F' && GUIDES[id] && (
        <div className="card calm">
          <h2>📖 Innan du läser anteckningarna</h2>
          <Rich text={GUIDES[id].preview} />
        </div>
      )}
      {m.kind === 'Ö' && <PreviewGuide momentId={id} defaultOpen />}

      {!lec && m.kind === 'F' && <p className="card small muted">Lärarens anteckningar till {id} är inte uppladdade än. Skicka pdf:en så lägger jag in dem.</p>}

      {lec && (
        <>
          <section className="card keypoints">
            <h2>⭐ Det viktigaste</h2>
            <ul>
              {lec.keyPoints.map((k, i) => (
                <li key={i}>
                  <Rich text={k} />
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>📝 Anteckningarna, sammanfattade</h2>
            <p className="small muted">I samma ordning som på föreläsningen, med lärarens beteckningar.</p>
            {lec.notes.map((n, i) => (
              <Collapsible key={i} title={<strong>{n.heading}</strong>} defaultOpen={i === 0}>
                <Rich text={n.body} />
              </Collapsible>
            ))}
          </section>

          {lec.widget === 'riemann' && <RiemannWidget />}

          <section className="card">
            <h2>✍️ Lärarens exempel: räkna själv först</h2>
            <p className="small muted">Försök på papper, och visa sedan lösningen ett steg i taget. Alla svar är kontrollerade med sympy.</p>
            {lec.examples.map((e, i) => (
              <ExampleCard key={e.id} e={e} n={i + 1} />
            ))}
          </section>

          <QuizSection id={id} />
        </>
      )}

      {m.kind === 'F' && <PracticeGuide momentId={id} />}
      <a className="btn" href="#/kursplan">Till övningarna i kursplanen</a>

      {lec && (
        <section className="card">
          <Collapsible title={<strong>🗂 Originalanteckningar ({lec.pages} sidor)</strong>}>
            <p className="small muted">Tryck på en sida för att öppna den i full storlek.</p>
            <div className="pages">
              {Array.from({ length: lec.pages }, (_, i) => {
                const src = `${base}forelasningar/${id}-${i + 1}.jpg`
                return (
                  <a key={i} href={src} target="_blank" rel="noreferrer" className="page-thumb">
                    <img src={src} alt={`${id} sida ${i + 1}`} loading="lazy" />
                    <span className="small muted">Sida {i + 1}</span>
                  </a>
                )
              })}
              {lec.extraImages?.map((im) => (
                <a key={im.src} href={base + im.src} target="_blank" rel="noreferrer" className="page-thumb">
                  <img src={base + im.src} alt={im.alt} loading="lazy" />
                  <span className="small muted">{im.alt}</span>
                </a>
              ))}
            </div>
          </Collapsible>
        </section>
      )}

      <div className="row between">
        {prev ? <a className="btn" href={`#/forelasning/${prev.id}`}>‹ {prev.id}</a> : <span />}
        {next ? <a className="btn" href={`#/forelasning/${next.id}`}>{next.id} ›</a> : <span />}
      </div>
    </div>
  )
}

function ExampleCard({ e, n }: { e: LectureExample; n: number }) {
  const [shown, setShown] = useState(0) // antal visade steg; steps.length + 1 = svaret visas
  const done = shown > e.steps.length
  return (
    <div className="example">
      <div className="row between">
        <h3>
          Exempel {n}: {e.title}
        </h3>
      </div>
      <Rich text={e.q} />
      {e.note && <p className="small muted">{e.note}</p>}
      {shown > 0 && (
        <ol className="steps">
          {e.steps.slice(0, shown).map((s, i) => (
            <li key={i}>
              <Rich text={s} />
            </li>
          ))}
        </ol>
      )}
      {done && (
        <div className="reveal-part answer">
          <Rich text={`**Svar:** ${e.answer}`} />
        </div>
      )}
      <div className="row gap wrap">
        {!done && (
          <button className="btn small-btn primary" onClick={() => setShown(shown + 1)}>
            {shown === 0 ? 'Visa första steget' : shown < e.steps.length ? 'Nästa steg' : 'Visa svaret'}
          </button>
        )}
        {!done && shown === 0 && (
          <button className="btn small-btn" onClick={() => setShown(e.steps.length + 1)}>
            Visa hela lösningen
          </button>
        )}
        {shown > 0 && (
          <button className="btn small-btn" onClick={() => setShown(0)}>
            Dölj
          </button>
        )}
      </div>
    </div>
  )
}

function QuizSection({ id }: { id: string }) {
  const lec = LECTURES[id]
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const keys = lec.quiz.map((q) => srsKey.card(q.id))
  return (
    <section className="card">
      <h2>🧠 Testa dig själv</h2>
      <p className="small muted">Svara i huvudet och tryck sedan på frågan. Frågorna finns också i repetitionskön.</p>
      {lec.quiz.map((q) => (
        <button key={q.id} type="button" className={`quiz ${open[q.id] ? 'open' : ''}`} onClick={() => setOpen({ ...open, [q.id]: !open[q.id] })}>
          <Rich text={q.q} />
          {open[q.id] ? (
            <div className="quiz-a">
              <Rich text={q.a} />
            </div>
          ) : (
            <span className="small muted">Tryck för svar</span>
          )}
        </button>
      ))}
      <button className="btn" onClick={() => go(`/repetition?keys=${encodeURIComponent(keys.join(','))}`)}>
        Öva frågorna som flashcards (räknas i repetitionen)
      </button>
    </section>
  )
}

/** Interaktiv Riemannsumma (F5): rektanglar under y = f(x), reglage för n och val av punkt ξ. */
const FUNCS = [
  { id: 'x2', label: 'f(x) = x² på [0, 2]', f: (x: number) => x * x, a: 0, b: 2, exact: 8 / 3, exactTex: '8/3' },
  { id: 'sin', label: 'f(x) = sin x på [0, π]', f: Math.sin, a: 0, b: Math.PI, exact: 2, exactTex: '2' },
  { id: 'neg', label: 'f(x) = x − 1 på [0, 3]', f: (x: number) => x - 1, a: 0, b: 3, exact: 1.5, exactTex: '3/2' },
]

function RiemannWidget() {
  const [fi, setFi] = useState(0)
  const [n, setN] = useState(4)
  const [mode, setMode] = useState<'left' | 'mid' | 'right'>('left')
  const F = FUNCS[fi]
  const { rects, sum, ymin, ymax } = useMemo(() => {
    const dx = (F.b - F.a) / n
    const rects = Array.from({ length: n }, (_, l) => {
      const x0 = F.a + l * dx
      const xi = mode === 'left' ? x0 : mode === 'right' ? x0 + dx : x0 + dx / 2
      return { x0, x1: x0 + dx, xi, h: F.f(xi) }
    })
    const sum = rects.reduce((s, r) => s + r.h * (r.x1 - r.x0), 0)
    let ymin = 0
    let ymax = 0
    for (let i = 0; i <= 200; i++) {
      const v = F.f(F.a + ((F.b - F.a) * i) / 200)
      ymin = Math.min(ymin, v)
      ymax = Math.max(ymax, v)
    }
    return { rects, sum, ymin, ymax }
  }, [F, n, mode])
  const W = 320
  const H = 180
  const pad = 14
  const X = (x: number) => pad + ((x - F.a) / (F.b - F.a)) * (W - 2 * pad)
  const Y = (y: number) => pad + ((ymax - y) / (ymax - ymin || 1)) * (H - 2 * pad)
  const curve = Array.from({ length: 101 }, (_, i) => {
    const x = F.a + ((F.b - F.a) * i) / 100
    return `${X(x)},${Y(F.f(x))}`
  }).join(' ')
  return (
    <section className="card">
      <h2>🔬 Testa: Riemannsumma</h2>
      <p className="small muted">Öka antalet rektanglar och se summan närma sig integralen (Sats 13.3). Prova också den negativa funktionen: rektanglar under axeln räknas negativt.</p>
      <select value={fi} onChange={(e) => setFi(Number(e.target.value))} aria-label="Funktion">
        {FUNCS.map((f, i) => (
          <option key={f.id} value={i}>
            {f.label}
          </option>
        ))}
      </select>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart riemann" role="img" aria-label="Riemannsumma">
        {rects.map((r, i) => (
          <rect key={i} x={X(r.x0)} width={Math.max(0, X(r.x1) - X(r.x0) - 1)} y={Math.min(Y(r.h), Y(0))} height={Math.abs(Y(r.h) - Y(0))} className={r.h >= 0 ? 'rr-pos' : 'rr-neg'} />
        ))}
        <line x1={pad} x2={W - pad} y1={Y(0)} y2={Y(0)} className="chart-base" />
        <polyline points={curve} className="chart-line" />
        {n <= 20 && rects.map((r, i) => <circle key={i} cx={X(r.xi)} cy={Y(r.h)} r={2.5} className="chart-dot" />)}
      </svg>
      <label className="field">
        Antal rektanglar n = {n}
        <input type="range" min={1} max={60} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <div className="seg">
        {(['left', 'mid', 'right'] as const).map((md) => (
          <button key={md} className={mode === md ? 'on' : ''} onClick={() => setMode(md)}>
            {md === 'left' ? 'ξ vänster' : md === 'mid' ? 'ξ mitten' : 'ξ höger'}
          </button>
        ))}
      </div>
      <p>
        Riemannsumma: <strong>{sum.toFixed(4)}</strong> · Integral: <strong>{F.exact.toFixed(4)}</strong> ({F.exactTex}) · Fel: <strong>{(sum - F.exact).toFixed(4)}</strong>
      </p>
    </section>
  )
}
