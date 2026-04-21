import { useState, useEffect } from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'

const BreachChecker = () => {
  const [breaches, setBreaches] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    const fetchBreaches = async () => {
      try {
        const res = await axios.get('https://haveibeenpwned.com/api/v3/breaches')
        setBreaches(res.data)
      } catch (err) {
        setError('Failed to fetch breach data.')
      } finally {
        setLoading(false)
      }
    }
    fetchBreaches()
  }, [])

  const filtered = breaches.filter(b =>
    b.Name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    b.Domain.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12">
      <h1 className="text-3xl font-bold text-green-400 mb-2">🔍 Breach Checker</h1>
      <p className="text-gray-400 mb-8">Search through all known public data breaches by name or domain.</p>

      <input
        type="text"
        placeholder="Search by breach name or domain..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 mb-8"
      />

      {loading && <p className="text-gray-400">Loading breaches...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((breach) => (
          <div key={breach.Name} className="bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-green-500 transition">
            <div className="flex items-center gap-3 mb-2">
              {breach.LogoPath && (
                <img src={breach.LogoPath} alt={breach.Name} className="w-8 h-8 rounded object-contain bg-white p-0.5" />
              )}
              <h2 className="font-semibold text-white">{breach.Name}</h2>
            </div>
            <p className="text-gray-400 text-xs mb-1">🌐 {breach.Domain || 'N/A'}</p>
            <p className="text-gray-400 text-xs mb-1">📅 {breach.BreachDate}</p>
            <p className="text-gray-400 text-xs">👤 {breach.PwnCount.toLocaleString()} accounts affected</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BreachChecker