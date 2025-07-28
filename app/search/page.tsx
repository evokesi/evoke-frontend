'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSummary('');
    setResults([]);

    try {
     const response = await fetch(`https://evoke-backend.onrender.com/search?query=${encodeURIComponent(query)}`);

      const data = await response.json();

      if (data?.summary) setSummary(data.summary);
      if (data?.results) setResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
      setSummary('Error fetching results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Evoke AI Search 🔍</h1>

      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="text"
        placeholder="Ask anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">AI Summary</h2>
          <p className="mt-2 text-gray-800">{summary}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Top Results</h2>
          <ul className="space-y-3">
            {results.map((item, idx) => (
              <li key={idx} className="border p-3 rounded hover:bg-gray-100">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
                  {item.title || item.url}
                </a>
                <p className="text-sm text-gray-700">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
