import katex from 'katex'
import { memo, useState, type ReactNode } from 'react'
import type { ExerciseStatus, Figure as Fig } from '../data/types'

const cache = new Map<string, string>()

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineMarkup(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*(?!\s)(.+?)\*(?=[\s).,:;!?]|$)/g, '$1<em>$2</em>')
    .replace(/\n/g, '<br/>')
}

/** Markdown-light med KaTeX: stycken, **fet**, *kursiv*, $inline$ och $$display$$. */
export function renderRich(text: string): string {
  const hit = cache.get(text)
  if (hit) return hit
  const paras = text.split(/\n\s*\n/)
  const html = paras
    .map((para) => {
      let out = ''
      let last = 0
      const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g
      let m: RegExpExecArray | null
      while ((m = re.exec(para))) {
        out += inlineMarkup(para.slice(last, m.index))
        const display = m[1] !== undefined
        const tex = display ? m[1] : m[2]
        out += katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore' })
        last = m.index + m[0].length
      }
      out += inlineMarkup(para.slice(last))
      return `<div class="para">${out}</div>`
    })
    .join('')
  cache.set(text, html)
  return html
}

export const Rich = memo(function Rich({ text, className }: { text: string; className?: string }) {
  return <div className={`rich ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: renderRich(text) }} />
})

export const RichInline = memo(function RichInline({ text }: { text: string }) {
  const html = renderRich(text).replace(/^<div class="para">/, '').replace(/<\/div>$/, '')
  return <span className="rich-inline" dangerouslySetInnerHTML={{ __html: html }} />
})

export function Figure({ fig }: { fig: Fig }) {
  return (
    <figure className="figure">
      <img src={`${import.meta.env.BASE_URL}${fig.src}`} alt={fig.alt} loading="lazy" />
      <figcaption>
        {fig.alt}
        {fig.note && <span className="warn-text"> · {fig.note}</span>}
      </figcaption>
    </figure>
  )
}

export function ProgressBar({ value, max = 1, label, tone }: { value: number; max?: number; label?: string; tone?: 'ok' | 'warn' | 'bad' }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
  const t = tone ?? (pct >= 70 ? 'ok' : pct >= 35 ? 'warn' : 'bad')
  return (
    <div className="pbar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={`pbar-fill ${t}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export const STATUS_ICON: Record<ExerciseStatus, string> = { ok: '✅', help: '🟡', fail: '❌' }
export const STATUS_TEXT: Record<ExerciseStatus, string> = { ok: 'Klarade själv', help: 'Klarade med hjälp', fail: 'Fattar inte' }

/** ✅ / 🟡 / ❌ – tryck igen på vald status för att nollställa. */
export function StatusButtons({ value, onChange }: { value?: ExerciseStatus; onChange: (s: ExerciseStatus | null) => void }) {
  return (
    <span className="status-btns" role="group" aria-label="Status">
      {(['ok', 'help', 'fail'] as ExerciseStatus[]).map((s) => (
        <button key={s} type="button" className={`sbtn ${value === s ? 'on' : ''}`} title={STATUS_TEXT[s]} aria-label={STATUS_TEXT[s]} aria-pressed={value === s} onClick={() => onChange(value === s ? null : s)}>
          {STATUS_ICON[s]}
        </button>
      ))}
    </span>
  )
}

export function Collapsible({ title, children, defaultOpen = false, right }: { title: ReactNode; children: ReactNode; defaultOpen?: boolean; right?: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className={`collapsible ${open ? 'open' : ''}`}>
      <button type="button" className="collapsible-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="chev">{open ? '▾' : '▸'}</span>
        <span className="collapsible-title">{title}</span>
        {right && <span className="collapsible-right">{right}</span>}
      </button>
      {open && <div className="collapsible-body">{children}</div>}
    </section>
  )
}

export function Tabs<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="tabs" role="tablist">
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id} className={value === o.id ? 'on' : ''} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Pill({ children, tone }: { children: ReactNode; tone?: 'warn' | 'ok' | 'bad' | 'info' }) {
  return <span className={`pill ${tone ?? ''}`}>{children}</span>
}

export function fmtMin(min: number): string {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

export function pct(x: number) {
  return `${Math.round(x * 100)} %`
}
