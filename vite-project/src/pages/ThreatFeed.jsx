import { useState, useEffect } from 'react'
import axios from 'axios'

const RESULTS_PER_PAGE = 12

const ThreatFeed = () => {
  const [cves, setCves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('ALL')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchCVEs = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=100')
        setCves(res.data.vulnerabilities || [])
      } catch (err) {
        setError('Failed to fetch threat data.')
      } finally {
        setLoading(false)
      }
    }
    fetchCVEs()
  }, [])

  const getSeverity = (cve) => {
    const metrics = cve.cve?.metrics
    const score =
      metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity ||
      metrics?.cvssMetricV30?.[0]?.cvssData?.baseSeverity ||
      metrics?.cvssMetricV2?.[0]?.baseSeverity ||
      'UNKNOWN'
    return score
  }

  const severityColor = (s) => {
    switch (s) {
      case 'CRITICAL': return 'text-red-400 border-red-700'
      case 'HIGH': return 'text-orange-400 border-orange-700'
      case 'MEDIUM': return 'text-yellow-400 border-yellow-700'
      case 'LOW': return 'text-green-400 border-green-700'
      default: return 'text-gray-400 border-gray-700'
    }
  }

  const filtered = cves.filter(v => {
    const id = v.cve?.id?.toLowerCase() || ''
    const desc = v.cve?.descriptions?.[0]?.value?.toLowerCase() || ''
    const matchSearch = id.includes(search.toLowerCase()) || desc.includes(search.toLowerCase())
    const matchSeverity = severity === 'ALL' || getSeverity(v) === severity
    return matchSearch && matchSeverity
  })

  const totalPages = Math.ceil(filtered.length / RESULTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE)

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleSeverity = (e) => {
    setSeverity(e.target.value)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12">
      <h1 className="text-3xl font-bold text-green-400 mb-2">⚠️ Threat Feed</h1>
      <p className="text-gray-400 mb-8">Live CVE vulnerabilities from the NIST National Vulnerability Database.</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by CVE ID or description..."
          value={search}
          onChange={handleSearch}
          className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
        <select
          value={severity}
          onChange={handleSeverity}
          className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {loading && <p className="text-gray-400">Loading threat data...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* CVE Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {paginated.map((v) => {
          const sev = getSeverity(v)
          return (
            <div key={v.cve?.id} className={`bg-gray-900 border rounded-xl p-4 transition hover:border-green-500 ${severityColor(sev)}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-sm text-green-300">{v.cve?.id}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${severityColor(sev)}`}>
                  {sev}
                </span>
              </div>
              <p className="text-gray-300 text-sm line-clamp-3">
                {v.cve?.descriptions?.[0]?.value || 'No description available.'}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                📅 {v.cve?.published?.slice(0, 10) || 'N/A'}
              </p>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 transition"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .map((p, idx, arr) => (
              <>
                {idx > 0 && arr[idx - 1] !== p - 1 && <span key={`dots-${p}`} className="px-2 py-2 text-gray-500">...</span>}
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg transition ${page === p ? 'bg-green-500 text-black font-bold' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                  {p}
                </button>
              </>
            ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default ThreatFeed