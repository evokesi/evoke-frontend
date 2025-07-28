// app/search/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [summary, setSummary] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`https://evoke-backend.onrender.com/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setSummary(data.summary)
      setResults(data.results)
    } catch (err) {
      console.error('Search failed:', err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold my-6 text-center"
      >
        Evoke 🔍 AI Search
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xl flex"
      >
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Type anything..."
          className="flex-1 px-4 py-3 rounded-l-xl bg-zinc-900 text-white outline-none border border-zinc-700"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-r-xl font-bold"
        >
          Go
        </button>
      </motion.div>

      {loading && <p className="mt-6 text-green-300 animate-pulse">Thinking...</p>}

      {summary && (
        <div className="mt-8 bg-zinc-900 text-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-2">AI Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="mt-6 w-full max-w-2xl space-y-4">
        {results.map((result, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg shadow"
          >
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold underline">
              {result.title}
            </a>
            <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: result.description }} />
          </motion.div>
        ))}
      </div>

      <footer className="mt-10 text-sm text-zinc-500">
        Powered by <a href="https://evoksi.com" className="underline">EvokeSI</a>
      </footer>
    </div>
  )
}
// Trigger redeploy to Vercel
