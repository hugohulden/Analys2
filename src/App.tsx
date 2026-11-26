import { useEffect } from 'react'
import { useStore } from './state/store'
import { useRoute } from './state/router'
import { TodayView } from './views/Today'
import { CourseView } from './views/Course'
import { BankView, ProblemView } from './views/Bank'
import { SimView } from './views/Simulate'
import { CardsView, ReviewSession } from './views/Cards'
import { StatsView } from './views/Stats'
import { StrategyView, AreasView, MoreView } from './views/Info'
import { SettingsView } from './views/Settings'
import { LectureView } from './views/Lecture'

const NAV = [
  { id: 'idag', label: 'Idag', icon: '☀️' },
  { id: 'kursplan', label: 'Kursplan', icon: '📅' },
  { id: 'uppgifter', label: 'Tentor', icon: '📝' },
  { id: 'kort', label: 'Kort', icon: '🃏' },
  { id: 'mer', label: 'Mer', icon: '☰' },
]

const SECTION_OF: Record<string, string> = {
  uppgift: 'uppgifter', forelasning: 'kursplan', simulering: 'uppgifter', repetition: 'kort', statistik: 'mer', strategi: 'mer', omraden: 'mer', installningar: 'mer',
}

export default function App() {
  const { progress, loaded, saveError } = useStore()
  const route = useRoute()
  const top = route.path[0] ?? 'idag'
  const section = SECTION_OF[top] ?? top

  useEffect(() => {
    const t = progress.settings.theme
    if (t === 'auto') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', t)
  }, [progress.settings.theme])

  let view
  switch (top) {
    case 'idag': view = <TodayView />; break
    case 'kursplan': view = <CourseView />; break
    case 'uppgifter': view = <BankView />; break
    case 'uppgift': view = <ProblemView key={route.path[1]} id={route.path[1]} />; break
    case 'simulering': view = <SimView />; break
    case 'kort': view = <CardsView tab={route.path[1]} />; break
    case 'repetition': view = <ReviewSession />; break
    case 'statistik': view = <StatsView />; break
    case 'strategi': view = <StrategyView />; break
    case 'omraden': view = <AreasView id={route.path[1]} />; break
    case 'installningar': view = <SettingsView />; break
    case 'mer': view = <MoreView />; break
    case 'forelasning': view = <LectureView id={route.path[1]} />; break
    default: view = <TodayView />
  }

  return (
    <div className="app">
      <main className="main">
        {saveError && <div className="banner bad">{saveError}</div>}
        {loaded ? view : <p className="muted center">Laddar…</p>}
      </main>
      <nav className="bottom-nav" aria-label="Huvudmeny">
        {NAV.map((n) => (
          <a key={n.id} href={`#/${n.id}`} className={section === n.id ? 'on' : ''} aria-current={section === n.id ? 'page' : undefined}>
            <span className="nav-icon" aria-hidden>{n.icon}</span>
            <span className="nav-label">{n.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
