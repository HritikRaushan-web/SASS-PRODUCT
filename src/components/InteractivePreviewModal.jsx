import React, { useState } from 'react';
import {
  X,
  Star,
  ExternalLink,
  Smartphone,
  Sparkles,
  ShoppingBag,
  Send,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

export default function InteractivePreviewModal({ product, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'external'
  const [rating, setRating] = useState(5);
  const [reviewKeywords, setReviewKeywords] = useState('Friendly staff, delicious sushi, quick delivery');
  const [generatedReview, setGeneratedReview] = useState(
    'Had an incredible dining experience! The staff was super warm and courteous. Everything was served fresh and flavorful. Highly recommended to anyone looking for top quality!'
  );
  const [copiedReview, setCopiedReview] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Truffle Mushroom Pizza', price: 449, qty: 1 },
    { id: 2, name: 'Signature Iced Caramel Latte', price: 189, qty: 2 }
  ]);

  if (!isOpen || !product) return null;

  const handleGenerateReview = () => {
    const samples = [
      `Hands down the best service in town! ${reviewKeywords}. Will definitely be back with friends and family. 5/5 stars!`,
      `Outstanding hospitality! Loved the ambiance and ${reviewKeywords}. A truly top-notch experience.`,
      `Cannot say enough good things! Quick response, great atmosphere, and ${reviewKeywords}. Highly recommended!`
    ];
    setGeneratedReview(samples[Math.floor(Math.random() * samples.length)]);
  };

  const totalCartAmount = cartItems.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#0f172a] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Interactive Live Sandbox</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Prestige Intelligence Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400">{product.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {product.demos && product.demos[0] && (
              <a
                href={product.demos[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <span>Full Screen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulator view */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Simulation condition 1: AI Google Review */}
          {product.id.includes('review') && (
            <div className="max-w-md mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">How was your visit today?</h4>
              <p className="text-xs text-slate-400">
                Tap below to experience the Smart Gating & AI Review Generator
              </p>

              {/* Star selector */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                        }`}
                    />
                  </button>
                ))}
              </div>

              {rating >= 4 ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                    <span>✨ High Rating: Routed to Google Reviews</span>
                    <span>AI Enabled</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-200 font-sans border border-slate-800 leading-relaxed">
                    {generatedReview}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleGenerateReview}
                      className="flex-1 py-2 text-xs font-bold rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                    >
                      Regenerate with AI
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedReview);
                        setCopiedReview(true);
                        setTimeout(() => setCopiedReview(false), 2000);
                      }}
                      className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1"
                    >
                      {copiedReview ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedReview ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2">
                  <div className="text-xs text-amber-300 font-bold">
                    🛡️ Low Rating: Diverted to Private Management Form
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Prevents public negative Google reviews by offering customers direct private escalation to the manager!
                  </p>
                  <textarea
                    rows={2}
                    placeholder="Tell our manager directly what went wrong..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <button className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg">
                    Send Private Message to Owner
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Simulation condition 2: Digital Menu / E-Commerce */}
          {(product.id.includes('menu') || product.id.includes('ecomm')) && (
            <div className="max-w-md mx-auto bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white">Prestige Bistro & Cafe</h4>
                  <p className="text-[11px] text-emerald-400">● Open • Table #4</p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                  {cartItems.reduce((s, i) => s + i.qty, 0)} Items
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-200">{item.name}</p>
                      <p className="text-slate-400">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCartItems(cartItems.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
                        }}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono text-white font-bold">{item.qty}</span>
                      <button
                        onClick={() => {
                          setCartItems(cartItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
                        }}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & 1-Click WhatsApp Order */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Estimated Bill:</span>
                <span className="text-lg font-black text-white">₹{totalCartAmount}</span>
              </div>

              <a
                href={`https://wa.me/919341630325?text=${encodeURIComponent(
                  `New Order from Table #4:\n${cartItems.map(i => `- ${i.qty}x ${i.name} (₹${i.price * i.qty})`).join('\n')}\nTotal: ₹${totalCartAmount}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Simulate 1-Click WhatsApp Order Dispatch</span>
              </a>
            </div>
          )}

          {/* Fallback for other items: show features & external link */}
          {!product.id.includes('review') && !product.id.includes('menu') && !product.id.includes('ecomm') && (
            <div className="max-w-md mx-auto text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">{product.title}</h4>
              <p className="text-xs text-slate-400">
                Explore the full live interactive deployment hosted on Cloudflare & Netlify.
              </p>
              {product.demos && product.demos.length > 0 && (
                <div className="pt-2 flex flex-col gap-2">
                  {product.demos.map((d, i) => (
                    <a
                      key={i}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <span>Launch {d.name} in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

