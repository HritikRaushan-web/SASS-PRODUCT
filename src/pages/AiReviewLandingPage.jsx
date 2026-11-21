import React from 'react';
import {
  Sparkles,
  Star,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ShoppingCart,
  MessageCircle,
  Smartphone,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function AiReviewLandingPage({ onBuyProduct, onPlayVideo }) {
  const product = {
    id: 'ai-review-src',
    title: 'Prestige Enterprise AI Google Review SaaS Platform',
    price: 2999,
    originalPrice: 14999,
    category: 'AI Growth Suite'
  };

  const features = [
    'Smart Negative Review Filter (Diverts 1-3 stars to private owner inbox)',
    'Grok & OpenAI API Integration for 1-Click 5-Star Keyword Rich Reviews',
    'NFC Tap Card & Standee Dynamic URL Generator',
    'Full Customer Panel for Businesses & Master Super Admin Hub',
    'Custom Domain Mapping (e.g. reviews.yourbrand.com)',
    'Zero Monthly Hosting Fees (Runs on Cloudflare Pages / Workers)',
    '100% Full Unencrypted Source Code with Lifetime Rights',
    'Commercial Reseller License Included'
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <div className="py-2 bg-gradient-to-r from-purple-900/60 to-blue-900/40 border-b border-purple-500/20 text-center text-xs text-purple-300 font-semibold">
        Elite Agency Edition: Full AI Review & NFC Card SaaS Code for ₹2,999 (was ₹14,999)
      </div>

      {/* Hero */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>AI Reputation & Google Review Booster SaaS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Launch Your Own{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            AI Google Review SaaS Platform
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Filter bad customer reviews before they hit Google Maps. Auto-generate SEO-optimized 5-star reviews using AI, and charge local clinics, salons, and restaurants ₹999/mo for NFC tap review stands.
        </p>

        {/* Live Demo Link */}
        <div className="pt-2 flex justify-center">
          <a
            href="https://ai-review-lix.pages.dev/food-bites"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-purple-300 font-bold text-sm flex items-center gap-2 shadow-lg"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Try Live Review Card Simulator (Food Bites)</span>
          </a>
        </div>

        {/* Pricing Card */}
        <div className="mt-8 max-w-lg mx-auto bg-slate-900/90 border border-purple-500/30 p-8 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-500 line-through mr-2">₹14,999</span>
              <span className="text-4xl font-black text-white">₹2,999</span>
              <span className="text-xs text-purple-400 block font-semibold">One-Time Payment • Full Code Included</span>
            </div>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold uppercase">
              White Label
            </span>
          </div>

          <button
            onClick={() => onBuyProduct && onBuyProduct(product)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 font-black text-base shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Instant Buy & Generate License Key</span>
          </button>

          <a
            href="https://wa.me/919341630325?text=I%20want%20to%20know%20more%20about%20Prestige%20AI%20Google%20Review%20SaaS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Priority Support</span>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center">
          What Makes Prestige AI Review SaaS Superior
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-200">{f}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

