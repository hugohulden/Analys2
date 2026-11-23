/*
 * Tolkar kompakt övningsnotation till enskilda uppgifts-id:n.
 *
 *   '12.1a-f'           → ['12.1a', …, '12.1f']
 *   '12.2-12.6'         → ['12.2', …, '12.6']
 *   '12.17a,b,c'        → ['12.17a', '12.17b', '12.17c']
 *   '15.13-15.15'       → ['15.13', '15.14', '15.15']
 *   'integrering:3-5'   → ['integrering:3', 'integrering:4', 'integrering:5']
 *   'ackumulering:13.1-13.3' → ['ackumulering:13.1', …]
 *   'integreringsmetoder:2b,c' → ['integreringsmetoder:2b', 'integreringsmetoder:2c']
 */
export function expandToken(token: string): string[] {
  const t = token.trim().replace(/–/g, '-').replace(/\)/g, '')
  let prefix = ''
  let body = t
  const colon = t.indexOf(':')
  if (colon >= 0) {
    prefix = t.slice(0, colon + 1)
    body = t.slice(colon + 1)
  }

  // Intervall av hela uppgifter: 12.2-12.6 eller 3-5
  let m = body.match(/^(?:(\d+)\.)?(\d+)-(?:(\d+)\.)?(\d+)$/)
  if (m) {
    const [, ch1, a, ch2, b] = m
    if (ch1 && ch2 && ch1 !== ch2) throw new Error(`Intervall över kapitel: ${token}`)
    const out: string[] = []
    for (let n = Number(a); n <= Number(b); n++) out.push(prefix + (ch1 ? `${ch1}.${n}` : `${n}`))
    return out
  }

  // Bokstavsintervall: 12.1a-f
  m = body.match(/^([\d.]+)([a-z])-([a-z])$/)
  if (m) {
    const [, base, from, to] = m
    const out: string[] = []
    for (let c = from.charCodeAt(0); c <= to.charCodeAt(0); c++) out.push(prefix + base + String.fromCharCode(c))
    return out
  }

  // Bokstavslista: 12.17a,b,c
  m = body.match(/^([\d.]+)([a-z](?:,[a-z])*)$/)
  if (m) {
    const [, base, letters] = m
    return letters.split(',').map((l) => prefix + base + l)
  }

  // Enkel uppgift
  if (/^[\d.]+$/.test(body)) return [prefix + body]
  throw new Error(`Okänd övningsnotation: ${token}`)
}

export function expandAll(tokens: string[] | undefined): string[] {
  return (tokens ?? []).flatMap(expandToken)
}

const PDF_LABEL: Record<string, string> = {
  integreringsmetoder: 'integreringsmetoder.pdf',
  integrering: 'integrering.pdf',
  ackumulering: 'ackumulering.pdf',
  polynomekvationer: 'polynomekvationer.pdf',
}

export function exerciseLabel(id: string): string {
  const colon = id.indexOf(':')
  if (colon < 0) return id
  const src = id.slice(0, colon)
  return `${PDF_LABEL[src] ?? src} uppg ${id.slice(colon + 1)}`
}

/** Kapitel och uppgiftsnummer, t.ex. '15.47a' → [15, 47]. */
export function chapterNumber(id: string): [number, number] | null {
  const m = id.match(/^(\d+)\.(\d+)/)
  return m ? [Number(m[1]), Number(m[2])] : null
}
