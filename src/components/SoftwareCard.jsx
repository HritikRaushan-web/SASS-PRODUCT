import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ExternalLink,
  Play,
  ShoppingCart,
  MessageCircle,
  Sparkles,
  Shield,
  ArrowRight,
  Info,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function SoftwareCard({ product, onBuy, onPlayVideo, onOpenDetails, onPreviewInteractive }) {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const waText = encodeURIComponent(
    `Hello Prestige Intelligence Team! I want more details about ${product.title} (₹${product.price}).`
  );
  const waUrl = `https://wa.me/919341630325?text=${waText}`;

  // Default checklist matching the user's screenshots
  const checklist = product.checklist || [
    'Free Hosting & subDomain (Bonus)',
    'Complete Source code',
    'Full Setup guide Video',
    '100% white label',
    'under your Branding',
    'Completely customizable code',
    'Owner + Customer Panel'
  ];

  const hasStaticCardImage = product.image && (
    product.image.includes('dynamic-qr-card') ||
    product.image.includes('vcard-card') ||
    product.image.includes('qr-menu-card')
  );

  return (
    <div className="group relative bg-[#0f172a] rounded-3xl border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden">
      {/* Top Visual Area */}
      {hasStaticCardImage ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
          {product.smallIntro && (
            <button
              onClick={() => onPlayVideo && onPlayVideo(product.smallIntro, product.title)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              title="Watch Presentation Video"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
          )}
        </div>
      ) : (
        /* Dynamic Rendered Visual Banner matching screenshot structure */
        <div className="relative p-5 bg-gradient-to-br from-slate-900 via-[#10192e] to-cyan-950/30 border-b border-slate-800 flex flex-col justify-between overflow-hidden min-h-[220px]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            {/* Main Bold Title */}
            <h4 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
              {product.bannerTitle || `Complete PHP Source Code ${product.title.split(' ')[0]} SAAS`}
            </h4>

            {/* Ribbon / Brush Tag */}
            <div className="mt-2 inline-block">
              <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                {product.bannerTag || `Make money selling ${product.title.split(' ')[0]} SAAS`}
              </span>
            </div>

            {/* Checklist */}
            <div className="mt-3.5 space-y-1.5">
              {checklist.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Tags / Video trigger */}
          <div className="mt-4 flex items-center justify-between pt-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-cyan-300 border border-cyan-500/30">
              {product.badge || 'Best Seller'}
            </span>
            {product.smallIntro && (
              <button
                onClick={() => onPlayVideo && onPlayVideo(product.smallIntro, product.title)}
                className="w-8 h-8 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                title="Watch Presentation Video"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content Lower Section matching screenshot design */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Blue / Cyan Title */}
          <button
            onClick={() => onOpenDetails && onOpenDetails(product)}
            className="text-left block group-hover:text-cyan-400 transition-colors w-full"
          >
            <h3 className="text-lg sm:text-xl font-extrabold text-blue-400 group-hover:text-cyan-300 leading-snug">
              {product.title}
            </h3>
          </button>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing Strip */}
          <div className="mt-4 flex items-baseline justify-between pt-2 border-t border-slate-800/60">
            <div>
              <span className="text-xs text-slate-500 line-through mr-2">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                ₹{product.price?.toLocaleString()}
              </span>
              <span className="text-[11px] text-cyan-400 font-semibold ml-1.5">
                One-Time Payment
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {/* The Exact "Get More Details ->" Blue Button from Screenshots */}
          <button
            onClick={() => onOpenDetails && onOpenDetails(product)}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
          >
            <span>Get More Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Actions: Instant Buy & WhatsApp */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onBuy && onBuy(product)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Instant Buy</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs sm:text-sm border border-emerald-500/20 flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
