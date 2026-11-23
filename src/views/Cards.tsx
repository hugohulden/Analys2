import { useMemo, useState } from 'react'
import { areaName } from '../data/areas'
import { CARDS, CARD_BY_ID } from '../data/cards'
import { EXERCISE_BY_ID } from '../data/exercises'
import { FORMULA_SHEET, NOT_ON_SHEET_NOTE } from '../data/formula'
import { METHOD_TREES } from '../data/methods'
import { PROBLEM_BY_ID, problemTitle } from '../data/problems'
import type { CardKind } from '../data/types'
import { reviewKey } from '../logic/actions'
import { isDue, parseSrsKey, srsKey } from '../logic/leitner'
import { computeMastery } from '../logic/mastery'
import { pickReview, reviewCandidates } from '../logic/repetition'
import { useStore } from '../state/store'
import { go, useRoute } from '../state/router'
import { Figure, Pill, Rich, RichInline, Tabs } from '../components/ui'
import { SolutionReveal } from './Bank'

type Tab = 'repetition' | 'utantill' | 'janej' | 'metod' | 'formelblad' | 'metodvaljare'

const TABS: { id: Tab; label: string }[] = [
  { id: 'repetition', label: 'Repetition' },
  { id: 'utantill', label: 'Måste kunna' },
  { id: 'janej', label: 'Ja/nej' },
  { id: 'metod', label: 'Metodkort' },
  { id: 'formelblad', label: 'Formelblad' },
  { id: 'metodvaljare', label: 'Vad gör jag nu?' },
]

export function CardsView({ tab }: { tab?: string }) {
  const t = (TABS.find((x) => x.id === tab)?.id ?? 'repetition') as Tab
  return (
    <div className="page">
      <div className="tabs-scroll">
        <Tabs value={t} onChange={(v) => go(`/kort/${v}`)} options={TABS} />
      </div>
      {t === 'repetition' && <RepetitionHome />}
      {(t === 'utantill' || t === 'janej' || t === 'metod') && <Deck kind={t} key={t} />}
      {t === 'formelblad' && <FormulaSheet />}
      {t === 'metodvaljare' && <MethodPicker />}
    </div>
  )
}

function RepetitionHome() {
  const { progress, today } = useStore()
  const m = useMemo(() => computeMastery(progress, today), [progress, today])
  const due = Object.entries(progress.srs).filter(([, s]) => isDue(s, today))
  const cands = reviewCandidates(progress, today, m)
  const byType = { card: 0, prob: 0, ex: 0 }
  for (const [k] of due) byType[parseSrsKey(k).type]++
  const start = (n: number) => go(`/repetition?keys=${encodeURIComponent(pickReview(progress, today, m, n, undefined, String(Date.now())).join(','))}`)
  return (
    <>
      <h1>Repetition</h1>
      <p className="small muted">Leitner-lådor: rätt → längre intervall (1, 3, 7, 14 dagar), fel → tillbaka till låda 1. Urvalet viktas efter tentapoäng × (1 − behärskning).</p>
      <div className="card">
        <p>
          <strong>{due.length}</strong> förfallna idag: {byType.card} kort, {byType.prob} tentauppgifter, {byType.ex} övningar (🟡/❌).
        </p>
        <p className="small muted">{cands.filter((c) => c.isNew).length} nya kort finns i områden du gått igenom.</p>
        <div className="row gap wrap">
          <button className="btn primary" onClick={() => start(10)} disabled={!cands.length}>Repetera 10</button>
          <button className="btn" onClick={() => start(25)} disabled={!cands.length}>Repetera 25</button>
        </div>
      </div>
      <div className="card">
        <h2>Lådor</h2>
        {[1, 2, 3, 4].map((b) => (
          <div key={b} className="row between small">
            <span>Låda {b} ({[1, 3, 7, 14][b - 1]} d)</span>
            <span>{Object.values(progress.srs).filter((s) => s.box === b).length}</span>
          </div>
        ))}
      </div>
    </>
  )
}

/** Ett repetitionspass över en lista nycklar (kort, uppgifter, övningar). */
export function ReviewSession() {
  const { progress, update, today } = useStore()
  const route = useRoute()
  const keys = useMemo(() => (route.query.get('keys') ?? '').split(',').filter(Boolean), [route.query])
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<boolean[]>([])

  if (!keys.length) return <div className="page"><p>Inget att repetera just nu.</p><a href="#/kort">Till korten</a></div>
  if (i >= keys.length)
    return (
      <div className="page">
        <div className="card center">
          <p className="big">Klart! {results.filter(Boolean).length}/{results.length} rätt</p>
          <div className="row gap center">
            <a className="btn primary" href="#/idag">Till dagens pass</a>
            <a className="btn" href="#/kort">Fler kort</a>
          </div>
        </div>
      </div>
    )

  const key = keys[i]
  const { type, id } = parseSrsKey(key)
  const answer = (correct: boolean) => {
    update((p) => reviewKey(p, key, correct, today))
    setResults([...results, correct])
    setFlipped(false)
    setI(i + 1)
  }
  const box = progress.srs[key]?.box

  return (
    <div className="page">
      <div className="row between">
        <a className="link-btn" href="#/idag">‹ Avsluta</a>
        <span className="muted small">{i + 1}/{keys.length}{box ? ` · låda ${box}` : ' · nytt'}</span>
      </div>
      {type === 'card' && CARD_BY_ID[id] && (
        <Flashcard key={key} front={CARD_BY_ID[id].front} back={CARD_BY_ID[id].back} meta={areaName(CARD_BY_ID[id].area)} flipped={flipped} onFlip={() => setFlipped(true)} />
      )}
      {type === 'prob' && PROBLEM_BY_ID[id] && (
        <div className="card statement" key={key}>
          <h3>{problemTitle(PROBLEM_BY_ID[id])} ({PROBLEM_BY_ID[id].points} p)</h3>
          <Rich text={PROBLEM_BY_ID[id].statement} />
          {PROBLEM_BY_ID[id].figures?.map((f) => <Figure key={f.src} fig={f} />)}
          <SolutionReveal p={PROBLEM_BY_ID[id]} />
          {!flipped && <button className="btn" onClick={() => setFlipped(true)}>Jag har försökt – rätta</button>}
        </div>
      )}
      {type === 'ex' && (
        <div className="card" key={key}>
          <h3>Övning {EXERCISE_BY_ID[id]?.label ?? id}</h3>
          <p>Gör om uppgiften i boken/pdf:en. Klarade du den själv nu?</p>
          {!flipped && <button className="btn" onClick={() => setFlipped(true)}>Jag har försökt</button>}
        </div>
      )}
      {flipped && (
        <div className="row gap center answer-btns">
          <button className="btn bad" onClick={() => answer(false)}>✗ Fel / osäker</button>
          <button className="btn ok" onClick={() => answer(true)}>✓ Rätt</button>
        </div>
      )}
    </div>
  )
}

function Flashcard({ front, back, meta, flipped, onFlip }: { front: string; back: string; meta?: string; flipped: boolean; onFlip: () => void }) {
  return (
    <button type="button" className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={onFlip} aria-label={flipped ? 'Kortets baksida' : 'Vänd kortet'}>
      {meta && <span className="muted small">{meta}</span>}
      <Rich text={front} />
      {flipped ? (
        <div className="flash-back">
          <Rich text={back} />
        </div>
      ) : (
        <span className="muted small">Tryck för att vända</span>
      )}
    </button>
  )
}

function Deck({ kind }: { kind: CardKind }) {
  const { progress, update, today } = useStore()
  const cards = CARDS.filter((c) => c.kind === kind)
  const [mode, setMode] = useState<'ova' | 'lista'>('ova')
  const order = useMemo(() => {
    // Förfallna och nya först, sedan efter låda.
    return [...cards].sort((a, b) => {
      const sa = progress.srs[srsKey.card(a.id)]
      const sb = progress.srs[srsKey.card(b.id)]
      const ra = !sa ? 1 : isDue(sa, today) ? 0 : 2 + sa.box
      const rb = !sb ? 1 : isDue(sb, today) ? 0 : 2 + sb.box
      return ra - rb
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind])
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const c = order[i % order.length]
  const title = kind === 'utantill' ? 'Måste kunna utantill' : kind === 'janej' ? 'Ja/nej – snabba fällor' : 'Metodkort'
  return (
    <>
      <h1>{title}</h1>
      {kind === 'utantill' && <p className="small muted">Det här står <strong>inte</strong> på formelbladet.</p>}
      <Tabs value={mode} onChange={setMode} options={[{ id: 'ova', label: 'Öva' }, { id: 'lista', label: 'Visa alla' }]} />
      {mode === 'ova' ? (
        <>
          <p className="muted small">Kort {(i % order.length) + 1}/{order.length}{progress.srs[srsKey.card(c.id)] ? ` · låda ${progress.srs[srsKey.card(c.id)].box}` : ' · nytt'}</p>
          <Flashcard key={c.id} front={c.front} back={c.back} meta={areaName(c.area)} flipped={flipped} onFlip={() => setFlipped(true)} />
          {flipped && (
            <div className="row gap center answer-btns">
              <button className="btn bad" onClick={() => { update((p) => reviewKey(p, srsKey.card(c.id), false, today)); setFlipped(false); setI(i + 1) }}>✗ Kunde inte</button>
              <button className="btn ok" onClick={() => { update((p) => reviewKey(p, srsKey.card(c.id), true, today)); setFlipped(false); setI(i + 1) }}>✓ Kunde</button>
            </div>
          )}
        </>
      ) : (
        <div className="card">
          {cards.map((c) => (
            <div key={c.id} className="card-row">
              <Rich text={c.front} />
              <Rich text={c.back} className="muted-rich" />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function FormulaSheet() {
  return (
    <>
      <h1>Formelbladet</h1>
      <p className="small muted">Exakt det som delas ut på tentan (inte på duggorna). Lär dig vad som <em>finns</em> här – och vad som inte gör det.</p>
      <div className="card formula">
        {FORMULA_SHEET.map((s) => (
          <section key={s.heading}>
            <h3>{s.heading}</h3>
            {s.items.map((it, i) => (
              <Rich key={i} text={it} />
            ))}
          </section>
        ))}
      </div>
      <div className="card warn">
        <h3>Står inte på formelbladet</h3>
        <Rich text={NOT_ON_SHEET_NOTE} />
        <a className="btn" href="#/kort/utantill">Öva "Måste kunna"</a>
      </div>
    </>
  )
}

function MethodPicker() {
  const [treeId, setTreeId] = useState(METHOD_TREES[0].id)
  const tree = METHOD_TREES.find((t) => t.id === treeId)!
  const [path, setPath] = useState<string[]>([tree.root])
  const node = tree.nodes[path[path.length - 1]]
  const choose = (id: string) => {
    setTreeId(id)
    setPath([METHOD_TREES.find((t) => t.id === id)!.root])
  }
  return (
    <>
      <h1>Vad gör jag nu?</h1>
      <div className="chips">
        {METHOD_TREES.map((t) => (
          <button key={t.id} className={`chip ${t.id === treeId ? 'on' : ''}`} onClick={() => choose(t.id)}>
            {t.title}
          </button>
        ))}
      </div>
      <div className="card method-node">
        {node.q && <h3><RichInline text={node.q} /></h3>}
        {node.result && (
          <div className="method-result">
            <Pill tone="ok">Gör så här</Pill>
            <Rich text={node.result} />
          </div>
        )}
        {node.options && (
          <div className="col gap">
            {node.options.map((o) => (
              <button key={o.next + o.label} className="btn option" onClick={() => setPath([...path, o.next])}>
                <RichInline text={o.label} />
              </button>
            ))}
          </div>
        )}
        {path.length > 1 && (
          <div className="row gap">
            <button className="btn" onClick={() => setPath(path.slice(0, -1))}>‹ Tillbaka</button>
            <button className="btn" onClick={() => setPath([tree.root])}>Börja om</button>
          </div>
        )}
      </div>
    </>
  )
}
