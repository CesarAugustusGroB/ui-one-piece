import { AppShell } from './components/AppShell'
import { LeftPanel } from './components/LeftPanel'
import { CardBrowser } from './components/CardBrowser'
import { RightPanel } from './components/RightPanel'

function App() {
  return (
    <AppShell
      leftPanel={<LeftPanel />}
      centerPanel={<CardBrowser />}
      rightPanel={<RightPanel />}
    />
  )
}

export default App
