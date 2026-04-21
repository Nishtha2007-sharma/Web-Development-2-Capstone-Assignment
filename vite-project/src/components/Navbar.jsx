import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 border-b border-gray-700 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-green-400 font-bold text-xl tracking-widest">
        🛡️ CyberSense
      </Link>

      <div className="flex gap-6 text-sm text-gray-300">
        <Link to="/" className="hover:text-green-400 transition">Home</Link>
        <Link to="/breach-checker" className="hover:text-green-400 transition">Breach Checker</Link>
        <Link to="/threat-feed" className="hover:text-green-400 transition">Threat Feed</Link>
        <Link to="/ip-scanner" className="hover:text-green-400 transition">IP Scanner</Link>
        <Link to="/quiz" className="hover:text-green-400 transition">Quiz</Link>
      </div>

      <button
        onClick={toggleDarkMode}
        className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-full transition"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}

export default Navbar