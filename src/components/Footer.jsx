import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, MessageCircle, ArrowUpRight, Database } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const waSupportUrl = 'https://wa.me/919341630325?text=' + encodeURIComponent('Hello Prestige Intelligence Team! I have an inquiry about your 10 software source code licenses.');

  return (
    <footer className="bg-[#060910] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  PRESTIGE
                </span>
                <span className="text-xs font-black tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  INTELLIGENCE
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Prestige Intelligence provides 100% unencrypted commercial software platforms for AI Google review management, customer loyalty retention, smart NFC standees, and WhatsApp marketing automation with Voice AI calling.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>MongoDB Powered Database</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Payment Security</span>
              </div>
            </div>
          </div>

          {/* The 5 Softwares */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Our 5 Core Software Platforms
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/single-page/ai-google-review-management" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">1.</span>
                  <span>AI Google Review Management</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">₹999</span>
                </Link>
              </li>
              <li>
                <Link to="/single-page/repeat-customer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">2.</span>
                  <span>Repeat Customer (Digital Loyalty)</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">₹1,499</span>
                </Link>
              </li>
              <li>
                <Link to="/single-page/smart-standee" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">3.</span>
                  <span>Smart Standee (NFC & Dynamic QR)</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">₹1,299</span>
                </Link>
              </li>
              <li>
                <Link to="/single-page/whatsapp-automation" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">4.</span>
                  <span>What's app Automation</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">₹2,499</span>
                </Link>
              </li>
              <li>
                <Link to="/single-page/whatsapp-automation-ai-calling" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">5.</span>
                  <span>What's app Automation With AI Calling</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">₹4,999</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support & Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Support & Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={waSupportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: +91 9341630325</span>
                </a>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors">
                  Admin Control Hub
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/privacy-policy" className="hover:text-slate-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-and-returns-policy" className="hover:text-slate-300">
                  Refund & Guarantee Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-slate-300">
                  Terms of Service & Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Prestige Intelligence. All Rights Reserved. Built for modern business growth.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">One-Time Payment • Instant License • Zero Royalties</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
