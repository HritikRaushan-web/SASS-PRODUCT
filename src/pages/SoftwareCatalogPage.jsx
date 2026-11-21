import React, { useState, useEffect } from 'react';
import {
  Code2,
  Search,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import SoftwareCard from '../components/SoftwareCard';

export default function SoftwareCatalogPage({ onBuyProduct, onPlayVideo, onOpenDetails, onPreviewInteractive }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
          setFiltered(data.products);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = [...products];
    if (selectedCat !== 'all') {
      list = list.filter((p) => p.category === selectedCat);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }
    setFiltered(list);
  }, [selectedCat, query, products]);

  const categories = [
    { id: 'all', label: 'All Softwares' },
    { id: 'Complete PHP Source code', label: 'PHP Source Codes' },
    { id: 'Reputation & AI Intelligence', label: 'AI Review Management' },
    { id: 'Customer Retention & Loyalty SaaS', label: 'Repeat Customer' },
    { id: 'Hardware & IoT SaaS Platform', label: 'Smart Standee' },
    { id: 'Conversational Marketing & CRM', label: 'WhatsApp Automation' },
    { id: 'Autonomous Voice & Chat AI Enterprise', label: 'Voice AI Calling' }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Code2 className="w-4 h-4" />
            <span>Complete Source Code (Zero Encryption)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready-Made SaaS & PHP Source Codes
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            Turnkey unencrypted codebases ready for immediate commercial deployment. Click <strong>"Get More Details"</strong> to open the complete workflow, benefits, why it matters, and pricing.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search by name, feature, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCat === c.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-slate-400">Loading catalog from MongoDB...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
            <p className="text-lg font-bold text-slate-300">No softwares matched your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((prod) => (
              <SoftwareCard
                key={prod.id}
                product={prod}
                onBuy={onBuyProduct}
                onPlayVideo={onPlayVideo}
                onOpenDetails={onOpenDetails}
                onPreviewInteractive={onPreviewInteractive}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
