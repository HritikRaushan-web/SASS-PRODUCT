import React from 'react';
import {
  X,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ShoppingCart,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Layers,
  Smartphone,
  Star,
  Award,
  Send,
  PhoneCall,
  BrainCircuit,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MoreDetailsModal({ product, isOpen, onClose, onBuyProduct }) {
  if (!isOpen || !product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const waText = encodeURIComponent(
    `Hello Prestige Intelligence! I am reviewing the details of ${product.title} (₹${product.price}) and would like to know more.`
  );
  const waUrl = `https://wa.me/919341630325?text=${waText}`;

  // Helper to render icon by name
  const renderStepIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'QrCode':
        return <QrCode className="w-5 h-5 text-cyan-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-blue-400" />;
      case 'Send':
        return <Send className="w-5 h-5 text-cyan-400" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-5 h-5 text-emerald-400" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-cyan-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-[#0f172a] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {product.category}
            </span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {discountPercent}% OFF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/single-page/${product.id}`}
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Full Page View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
          {/* Main Title & Overview */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {product.title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-300 font-semibold leading-relaxed">
              {product.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Strip & Quick Purchase */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-500 line-through">
                  ₹{product.originalPrice?.toLocaleString()}
                </span>
                <span className="text-3xl font-black text-white">
                  ₹{product.price?.toLocaleString()}
                </span>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  One-Time Payment
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Lifetime unencrypted commercial license • Zero monthly software royalties
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  if (onBuyProduct) onBuyProduct(product);
                }}
                className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Instant Buy & License</span>
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* SECTION 1: HOW IT WORKS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                How Does It Work?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.howItWorks &&
                product.howItWorks.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      {renderStepIcon(step.icon)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                          Step 0{step.step || idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* SECTION 2: WHAT ARE THE BENEFITS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                What Is The Benefit?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.benefits &&
                product.benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#131d36]/70 border border-slate-800 flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm font-bold text-white">{b.title}</h4>
                        {b.metric && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {b.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* SECTION 3: WHY IS IT IMPORTANT FOR US */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                Why Is It Important For Us & Your Business?
              </h3>
            </div>

            <div className="space-y-3">
              {product.importance &&
                product.importance.map((imp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {imp.point}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 pl-7 leading-relaxed">
                      {imp.explanation}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* SECTION 4: WHAT IS INCLUDED IN THE PACKAGE */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <Layers className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                What's Included In The Software Package?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {product.features &&
                product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="sticky bottom-0 z-20 bg-slate-950/95 backdrop-blur-md p-4 px-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 text-center sm:text-left">
            <span className="text-xs text-slate-500 line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
            <span className="text-2xl font-black text-cyan-400">
              ₹{product.price?.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">
              (Includes Full Unencrypted Source Code & MongoDB License)
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                if (onBuyProduct) onBuyProduct(product);
              }}
              className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Instant Buy Now</span>
            </button>
            <Link
              to={`/single-page/${product.id}`}
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1"
            >
              <span>Full Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

