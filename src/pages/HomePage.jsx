import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Code2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Play,
  ArrowRight,
  Database,
  Layers,
  Zap,
  Globe,
  Award,
  Users,
  ChevronDown,
  MessageCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import SoftwareCard from '../components/SoftwareCard';

export default function HomePage({ onBuyProduct, onPlayVideo, onOpenDetails, onPreviewInteractive }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Inquiries form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProduct, setInquiryProduct] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      })
      .catch((err) => console.error('Error loading products:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = [...products];
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }
    setFilteredProducts(list);
  }, [selectedCategory, searchQuery, products]);

  const categories = [
    { id: 'all', label: 'All Softwares' },
    { id: 'Complete PHP Source code', label: 'PHP Source Codes' },
    { id: 'Reputation & AI Intelligence', label: 'AI Review Management' },
    { id: 'Customer Retention & Loyalty SaaS', label: 'Repeat Customer' },
    { id: 'Hardware & IoT SaaS Platform', label: 'Smart Standee' },
    { id: 'Conversational Marketing & CRM', label: 'WhatsApp Automation' },
    { id: 'Autonomous Voice & Chat AI Enterprise', label: 'Voice AI Calling' }
  ];

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          productTitle: inquiryProduct || 'Prestige Intelligence Automation Suite',
          source: 'homepage_contact_box'
        })
      });
      setInquirySubmitted(true);
      const waText = encodeURIComponent(
        `Hello Prestige Intelligence! My name is ${inquiryName} (${inquiryPhone}). I am interested in your software platforms.`
      );
      window.open(`https://wa.me/919341630325?text=${waText}`, '_blank');
    } catch (e) {
      console.error(e);
    }
  };

  const faqs = [
    {
      q: 'Do I really own 100% of the source code?',
      a: 'Yes. You receive 100% complete, unencrypted source code for all software systems. There are zero hidden dependencies, zero monthly software fees, and zero encryption. You can customize, rebrand, and deploy for your business or clients.'
    },
    {
      q: 'Does it use MongoDB for database storage?',
      a: 'Yes! Prestige Intelligence is backed by MongoDB (with Mongoose schemas) for storing product specifications, customer orders, cryptographically signed license keys, and agency inquiries.'
    },
    {
      q: 'What payment methods can customers use to purchase?',
      a: 'We support instant UPI / QR code payment (Google Pay, PhonePe, Paytm), Credit & Debit cards, and Cryptocurrency (USDT TRC20 / BTC / ETH) for international clients, with automatic instant license generation upon payment.'
    },
    {
      q: 'How does AI Google Review Management stop negative reviews?',
      a: 'When customers tap or scan your standee, they rate their experience. If they select 4 or 5 stars, AI prompts them to post on Google Maps. If they select 1, 2, or 3 stars, they are seamlessly redirected to a private manager message, stopping public damage.'
    },
    {
      q: 'How does WhatsApp Automation with AI Calling work?',
      a: 'Within 30 seconds of an inbound lead filling out your form, a human-sounding Voice AI Agent calls the prospect in English or Hindi, pitches your service, qualifies them, and immediately sends a WhatsApp message with meeting details and payment links.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Background Gradients & Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Prestige Intelligence • Turnkey Software Systems & AI Growth Engines</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Ready-Made{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              SAAS Source Code
            </span>{' '}
            & Turnkey Platforms
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Own complete unencrypted software systems. Sell high-demand AI review managers, digital loyalty cards, smart standees, and WhatsApp marketing suites to businesses under your own brand.
          </p>

          {/* Trust Badges Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>One-Time Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Unencrypted Code</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>MongoDB Powered Database</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Key & Setup Video</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              <span>Explore Softwares & Demos</span>
            </a>
            <a
              href="https://wa.me/919341630325?text=I%20want%20to%20know%20more%20about%20Prestige%20Intelligence%20Softwares"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-base border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Video Teaser Card */}
          <div className="mt-14 max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-transparent shadow-2xl">
            <div className="relative aspect-video rounded-[22px] overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="Prestige Intelligence Automation Suite"
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent"></div>
              <button
                onClick={() =>
                  onPlayVideo &&
                  onPlayVideo('https://www.youtube.com/watch?v=vSgVGJqW_SQ', 'Prestige Intelligence Software Suite')
                }
                className="relative z-10 w-20 h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 transition-transform hover:scale-110"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <div className="absolute bottom-4 left-6 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded">
                  Watch Presentation Video
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  How Businesses Multiply Revenue & Retain 90%+ Customers with Our Automation Systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS METRICS STRIP */}
      <section className="border-y border-slate-800 bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-cyan-400">100%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Unencrypted Source Code</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">₹0</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Monthly Royalties or Fees</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-indigo-400">4,800+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Active Agency Founders</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-amber-400">24/7</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Engineer WhatsApp Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOFTWARE CATALOG SHOWCASE */}
      <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Turnkey Software Collection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore All Prestige Softwares
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every software package includes pure unencrypted code, database schemas, and step-by-step video setup. Click <strong>"Get More Details"</strong> to open the full workflow, benefits, why it matters, and pricing.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search by name, feature, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-slate-400">Loading Prestige Intelligence Software catalog from MongoDB...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
            <p className="text-lg font-bold text-slate-300">No softwares matched your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
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
      </section>

      {/* WHY PRESTIGE INTELLIGENCE (THEM VS US) */}
      <section className="py-20 bg-slate-950/70 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
              The Prestige Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Why Businesses Choose Our Owned Softwares
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Renting software month-after-month drains your profits. Prestige Intelligence gives you full digital software ownership.
            </p>
          </div>

          <div className="bg-[#0f172a] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 divide-x divide-slate-800 text-xs sm:text-sm">
              {/* Other Platforms */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-extrabold pb-3 border-b border-slate-800">
                  <XCircle className="w-5 h-5" />
                  <span>Rented SaaS Tools</span>
                </div>
                <div className="space-y-3 text-slate-400">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Cost ₹2,000 to ₹10,000 every single month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Locked ecosystem — you can never modify features</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>They own your customer data and review logs</span>
                  </div>
                </div>
              </div>

              {/* Prestige Intelligence */}
              <div className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-cyan-950/20 to-transparent">
                <div className="flex items-center gap-2 text-cyan-400 font-extrabold pb-3 border-b border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>Prestige Intelligence Softwares</span>
                </div>
                <div className="space-y-3 text-slate-200 font-medium">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>One-time payment — zero recurring fees ever</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>100% unencrypted code you own forever</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Self-hosted on your own free cloud accounts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-slate-950/70 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0f172a] border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm sm:text-base hover:text-cyan-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHATSAPP CONSULTATION LEAD CAPTURE */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/30 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
            <MessageCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Upgrade Your Software Operations?
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2">
              Need custom integration, bulk deployment, or live video demo? Speak directly with a Prestige Intelligence technical architect on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="max-w-md mx-auto grid grid-cols-1 gap-3">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={inquiryName}
              onChange={(e) => setInquiryName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp Number"
              value={inquiryPhone}
              onChange={(e) => setInquiryPhone(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Request Priority WhatsApp Callback</span>
            </button>
          </form>

          {inquirySubmitted && (
            <p className="text-xs text-emerald-400 font-semibold">
              ✓ Inquiry logged to MongoDB! Opening WhatsApp chat...
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
