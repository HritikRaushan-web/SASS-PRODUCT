import React from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Play,
  ShoppingCart,
  MessageCircle,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function MasterclassPage({ onBuyProduct }) {
  const courseProduct = {
    id: 'one-page-ai-course',
    title: 'Prestige AI One-Page Website Agency Masterclass',
    price: 499,
    originalPrice: 1999,
    category: 'Masterclass & Training'
  };

  const modules = [
    {
      number: '01',
      title: 'Learn The Basics (Optional)',
      desc: 'Understand One-Page websites, Static sites, HTML, Tailwind CSS, JavaScript, Domain, Subdomain, Hosting, GitHub, Netlify, and Gemini AI.'
    },
    {
      number: '02',
      title: 'Prerequisite & Setup',
      desc: 'Step-by-step guide to setting up your workspace: downloading files, creating GitHub & Netlify accounts, and linking repositories.'
    },
    {
      number: '03',
      title: 'Making Website with AI',
      desc: 'Use Gemini AI or any other free AI tool with ready-made prompts to generate professional website code in seconds.'
    },
    {
      number: '04',
      title: 'Making Website Live for Free',
      desc: 'Deploy your website instantly with free hosting and subdomain setup using GitHub and Netlify in just a few clicks.'
    },
    {
      number: '05',
      title: 'Making Changes in Website',
      desc: 'Learn how to feed updated code back into AI chats with precise prompts to modify your pages seamlessly.'
    },
    {
      number: '06',
      title: 'Manual Editing & Custom Images',
      desc: 'Learn to edit text manually and upload/link your custom images with zero hassle.'
    },
    {
      number: '07',
      title: 'Custom Domain Connection',
      desc: 'Learn how to connect custom domains purchased by you or your customers through Netlify domain management.'
    },
    {
      number: '08',
      title: 'Bonus: How to Sell & Pricing Strategy',
      desc: 'How to charge local customers ₹499–₹2,999 per website and scale to ₹50,000+ monthly revenue with zero coding background.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <div className="py-2 bg-gradient-to-r from-emerald-950 to-cyan-950 border-b border-emerald-500/20 text-center text-xs text-emerald-300 font-semibold">
        Limited Time: Complete AI Web Agency Masterclass for just ₹499 (was ₹1,999)
      </div>

      {/* Hero */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>One-Page Website AI Masterclass (Hindi / English)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Build & Sell Websites With Free AI —{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Zero Coding Needed
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          "I charge customers ₹499–₹1,999 per website made with free AI. In just a few days, I made ₹10,000+ selling simple one-page sites to local businesses."
        </p>

        {/* Pricing Card */}
        <div className="mt-8 max-w-md mx-auto bg-slate-900 border border-emerald-500/30 p-6 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-500 line-through mr-2">₹1,999</span>
              <span className="text-3xl font-black text-white">₹499</span>
              <span className="text-xs text-emerald-400 block font-semibold">Instant Access to All 8 Modules</span>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase">
              75% Off
            </span>
          </div>

          <button
            onClick={() => onBuyProduct && onBuyProduct(courseProduct)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Enroll Now for ₹499 (Instant Access)</span>
          </button>
        </div>
      </section>

      {/* Modules List */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center">
          What You Get Inside The Masterclass
        </h2>
        <div className="space-y-4">
          {modules.map((mod, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 flex items-start gap-4 hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                {mod.number}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{mod.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

