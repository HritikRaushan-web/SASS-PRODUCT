import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Play,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  QrCode,
  DollarSign,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';

export default function DigitalMenuLandingPage({ onBuyProduct, onPlayVideo }) {
  const [openFaq, setOpenFaq] = useState(null);

  const product = {
    id: 'digital-menu-src',
    title: 'Prestige White-Label Digital QR Menu SaaS Enterprise',
    price: 2999,
    originalPrice: 14999,
    category: 'SaaS Multi-Tenant Suite'
  };

  const demos = [
    { name: 'Eclipse Gourmet Lounge Menu', url: 'https://menul.pages.dev/elicpse' },
    { name: 'Royal Chef Bistro Showcase', url: 'https://menul.pages.dev/royal-chef' },
    { name: 'Restaurant Owner Panel Demo', url: 'https://demo-menu.pages.dev/signin' }
  ];

  const features = [
    'Complete White-Label SaaS Platform — Sell Under Your Own Brand',
    'Full Customer Panel for Restaurants & Super Owner Control Panel',
    'Custom Domain Connection (e.g. menus.yourbrand.com)',
    '100% Full Source Code (No IonCube, No Encryption, Pure PHP/React)',
    'Runs 100% on Cloudflare Free Tier (Zero Ongoing Hosting Fees)',
    'Real-Time Menu Changes: Prices, Item Availability & Photos',
    'WhatsApp Table Ordering & Delivery Order Dispatch Engine',
    'Multi-Tier Membership Plans (Basic, Pro, Enterprise Monthly Retainers)',
    'Step-by-Step 4K Video Deployment Guide & Database SQL'
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <div className="py-2 bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border-b border-cyan-500/20 text-center text-xs text-cyan-300 font-semibold">
        Special Launch Offer: Get Complete Digital Menu SaaS Source Code for ₹2,999 (was ₹14,999)
      </div>

      {/* Hero */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
          <UtensilsCrossed className="w-4 h-4" />
          <span>White-Label QR Digital Menu SaaS Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Own A Complete{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            QR Digital Menu SaaS Platform
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create unlimited restaurant accounts, charge monthly membership fees (₹999–₹2,999/mo), and build recurring SaaS revenue — all under your own brand. Full source code included. No monthly fees to us.
        </p>

        {/* Demo Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {demos.map((d, i) => (
            <a
              key={i}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{d.name}</span>
            </a>
          ))}
        </div>

        {/* Pricing CTA Box */}
        <div className="mt-8 max-w-lg mx-auto bg-slate-900/90 border border-cyan-500/30 p-8 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-500 line-through mr-2">₹14,999</span>
              <span className="text-4xl font-black text-white">₹2,999</span>
              <span className="text-xs text-cyan-400 block font-semibold">One-Time Payment • Lifetime Rights</span>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase">
              Full Source Code
            </span>
          </div>

          <button
            onClick={() => onBuyProduct && onBuyProduct(product)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Instant Buy & Download Source Code</span>
          </button>

          <a
            href="https://wa.me/919341630325?text=I%20want%20to%20know%20more%20about%20Prestige%20Digital%20QR%20Menu%20SaaS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
          >
            <span>Have questions? WhatsApp our lead engineer</span>
          </a>
        </div>
      </section>

      {/* The Problem with Printed Menus vs Digital Menus */}
      <section className="py-16 bg-slate-950/70 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Why Every Restaurant Needs A Digital Menu
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Printed menus are expensive, get stained, and cost thousands to reprint whenever prices or items change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-bold text-white">Printed Menus Are Expensive</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Restaurants spend ₹5,000–₹15,000 every few months reprinting menus just to change prices or remove out-of-stock items.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <h3 className="text-base font-bold text-white">Instant Real-Time Updates</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                With your digital menu platform, restaurant staff update prices, toggle sold-out items, or add seasonal specials in 5 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                ₹
              </div>
              <h3 className="text-base font-bold text-white">Recurring Monthly Retainers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You charge restaurants ₹999/month. Just 20 clients = ₹19,980/month in passive recurring income with zero hosting cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Included Features */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center">
          What You Get With Prestige Digital QR Menu Suite
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-200">{f}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

