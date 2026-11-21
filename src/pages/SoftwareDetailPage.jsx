import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Play,
  ShoppingCart,
  MessageCircle,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Smartphone,
  Star,
  QrCode,
  Layers,
  Send,
  PhoneCall,
  BrainCircuit,
  RefreshCw,
  HelpCircle,
  Sparkles,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

export default function SoftwareDetailPage({ onBuyProduct, onPlayVideo, onPreviewInteractive }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError('Software product not found in Prestige Intelligence catalog.');
        }
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setError('Error connecting to MongoDB database.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-sm">Loading software specification from MongoDB...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Software Not Found</h2>
        <p className="text-slate-400 mb-6 text-sm">{error || "The software panel you are looking for doesn't exist."}</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors flex items-center gap-2 text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Softwares</span>
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const waText = encodeURIComponent(
    `Hello Prestige Intelligence! I want to know more about ${product.title} (₹${product.price}).`
  );
  const waUrl = `https://wa.me/919341630325?text=${waText}`;

  // Helper for youtube embed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtu.be/')) {
      const vid = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${vid}`;
    }
    if (url.includes('watch?v=')) {
      const vid = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${vid}`;
    }
    return url;
  };

  const renderStepIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-cyan-400" />;
      case 'Star':
        return <Star className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'QrCode':
        return <QrCode className="w-6 h-6 text-cyan-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-blue-400" />;
      case 'Send':
        return <Send className="w-6 h-6 text-cyan-400" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6 text-emerald-400" />;
      case 'PhoneCall':
        return <PhoneCall className="w-6 h-6 text-cyan-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-purple-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-black pb-24">
      {/* Top Breadcrumb Nav */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md sticky top-18 z-40 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all softwares</span>
          </Link>
          <span className="text-xs px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold tracking-wide uppercase">
            {product.category}
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
        {/* HERO SECTION */}
        <div className="text-center space-y-5">
          {product.badge && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
              {product.badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            {product.title}
          </h1>

          <p className="max-w-2xl mx-auto text-cyan-300 text-base sm:text-xl font-semibold leading-relaxed">
            {product.tagline}
          </p>

          <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
            {product.description}
          </p>

          {/* Demos and Simulator Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {product.demos &&
              product.demos.map((d, i) => (
                <a
                  key={i}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-cyan-300 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{d.name}</span>
                </a>
              ))}
            <button
              onClick={() => onPreviewInteractive && onPreviewInteractive(product)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Test Interactive Simulator</span>
            </button>
          </div>

          {/* PRICING & INSTANT CHECKOUT STRIP */}
          <div className="mt-8 max-w-xl mx-auto bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 line-through mr-2">
                  ₹{product.originalPrice?.toLocaleString()}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ₹{product.price?.toLocaleString()}
                </span>
                <span className="text-xs text-cyan-400 block font-semibold mt-0.5">
                  {discountPercent}% Limited Time Discount • Lifetime License
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Unencrypted Source Code
              </span>
            </div>

            <button
              onClick={() => onBuyProduct && onBuyProduct(product)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Instant Buy & Download Source Code</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs sm:text-sm border border-emerald-500/20 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Questions / Priority WhatsApp Consultation</span>
            </a>
          </div>

          {/* Video Player */}
          {product.smallIntro && (
            <div className="pt-8 max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-extrabold text-xs sm:text-sm tracking-wider uppercase bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
                <Play className="w-4 h-4 fill-current animate-pulse" />
                <span>Watch Walkthrough & Architecture Video</span>
              </div>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800">
                <iframe
                  src={getEmbedUrl(product.smallIntro)}
                  title={`${product.title} Presentation`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 1: HOW DOES IT WORK? */}
        <section className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>Process Flow</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              How Does It Work?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A streamlined, automated workflow engineered for immediate results with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {product.howItWorks &&
              product.howItWorks.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0 shadow-inner">
                    {renderStepIcon(step.icon)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold">
                        STEP {step.step || idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* SECTION 2: WHAT IS THE BENEFIT? */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Tangible ROI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              What Are The Benefits?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Measurable revenue growth, reputation defense, and automation perks for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {product.benefits &&
              product.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-gradient-to-br from-[#131d36] to-[#0f172a] border border-slate-800 flex flex-col justify-between space-y-3 shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{b.title}</h3>
                      {b.metric && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase">
                          {b.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* SECTION 3: WHY IS IT IMPORTANT FOR US? */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Competitive Necessity</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Why Is It Important For Us?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The real-world business risks of inaction versus the competitive advantage of automation.
            </p>
          </div>

          <div className="space-y-4">
            {product.importance &&
              product.importance.map((imp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-2 shadow-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {imp.point}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 pl-9 leading-relaxed">
                    {imp.explanation}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* SECTION 4: FULL FEATURES & WHAT'S INCLUDED */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Everything Included in the Reseller Package
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {product.features &&
                product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
            </div>

            {/* Included Files */}
            {product.includedFiles && product.includedFiles.length > 0 && (
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                  Delivered Files In Your Download Package:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
                  {product.includedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-cyan-500">📁</span>
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: FAQS */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="space-y-4 pt-4">
            <h2 className="text-xl sm:text-2xl font-black text-white text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {product.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM BUY CTA STRIP */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 border border-cyan-500/40 text-center space-y-4 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Deploy {product.title}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Get instant unencrypted source code access, automated MongoDB database schema, and dedicated WhatsApp onboarding support.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onBuyProduct && onBuyProduct(product)}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Buy License for ₹{product.price?.toLocaleString()}</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs sm:text-sm border border-emerald-500/20 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Technical Lead</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
