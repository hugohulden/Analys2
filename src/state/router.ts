import { useEffect, useState } from 'react'

export interface Route {
  path: string[] // t.ex. ['uppgift', 'ht24-1a']
  query: URLSearchParams
}

function parse(): Route {
  const h = location.hash.replace(/^#\/?/, '')
  const [p, q] = h.split('?')
  return { path: p ? p.split('/').filter(Boolean).map(decodeURIComponent) : [], query: new URLSearchParams(q ?? '') }
}

export function useRoute(): Route {
  const [r, setR] = useState(parse)
  useEffect(() => {
    const on = () => {
      setR(parse())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return r
}

export function go(hash: string) {
  location.hash = hash.startsWith('#') ? hash : `#${hash}`
}
