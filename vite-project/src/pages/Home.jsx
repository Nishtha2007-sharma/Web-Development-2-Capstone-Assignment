import { Link } from 'react-router-dom'

const features = [
  { title: '🔍 Breach Checker', desc: 'Check if your email has been exposed in a data breach.', link: '/breach-checker' },
  { title: '⚠️ Threat Feed', desc: 'Browse live CVE vulnerabilities and security advisories.', link: '/threat-feed' },
  { title: '🌐 IP Scanner', desc: 'Scan any IP or URL for malicious activity.', link: '/ip-scanner' },
  { title: '🧠 Security Quiz', desc: 'Test your cybersecurity awareness knowledge.', link: '/quiz' },
]

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-green-400 mb-4 tracking-tight">
          Stay Cyber Aware.
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          CyberSense helps you monitor threats, check breaches, and build security awareness — all in one place.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f) => (
          <Link
            to={f.link}
            key={f.title}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/30 transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home