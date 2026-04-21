import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BreachChecker from './pages/BreachChecker'
import ThreatFeed from './pages/ThreatFeed'
import Quiz from './pages/Quiz'
import IPScanner from './pages/IPScanner'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breach-checker" element={<BreachChecker />} />
        <Route path="/threat-feed" element={<ThreatFeed />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ip-scanner" element={<IPScanner />} />
      </Routes>
    </Router>
  )
}

export default App