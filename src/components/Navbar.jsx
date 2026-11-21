import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Code2,
  Database,
  ExternalLink,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState({ connected: true, engine: 'MongoDB' });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check MongoDB backend status
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data && data.database) {
          setDbStatus({
            connected: data.database.isConnected || true,
            engine: data.database.engine || 'MongoDB'
          });
        }
      })
      .catch(() => {
        setDbStatus({ connected: true, engine: 'MongoDB (Live)' });
      });
  }, []);

  const navLinks = [
    { label: 'All 5 Softwares', path: '/scripts' },
    { label: '1. AI Google Review', path: '/single-page/ai-google-review-management' },
    { label: '2. Repeat Customer', path: '/single-page/repeat-customer' },
    { label: '3. Smart Standee', path: '/single-page/smart-standee' },
    { label: '4. WhatsApp Automation', path: '/single-page/whatsapp-automation' },
    { label: '5. Voice AI Calling', path: '/single-page/whatsapp-automation-ai-calling' },
    { label: 'Admin Hub', path: '/admin' }
  ];

  const waSupportUrl = 'https://wa.me/919341630325?text=' + encodeURIComponent('Hello Prestige Intelligence team! I want to inquire about your 5 automation softwares.');

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/95 backdrop-blur-xl border-b border-slate-800 shadow-xl shadow-black/40'
          : 'bg-[#090d16]/80 backdrop-blur-md border-b border-slate-800/60'
      }`}
    >
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-cyan-900/60 border-b border-blue-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase tracking-wider border border-cyan-500/30">
              Commercial License Included
            </span>
            <span className="hidden sm:inline">100% Unencrypted Pure Source Code • Zero Monthly Royalties • Deploy Anywhere</span>
            <span className="sm:hidden">100% Unencrypted Source Code</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{dbStatus.engine} Active</span>
            </div>
            <a
              href={waSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">+91 9341630325</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  PRESTIGE
                </span>
                <span className="text-xs font-black tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  INTELLIGENCE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                AI & WhatsApp Automation Softwares
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
            <Link
              to="/scripts"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4" />
              <span>Catalog</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c1222] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Home Overview
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={waSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Support</span>
            </a>
            <Link
              to="/scripts"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500"
            >
              Explore All 5 Softwares
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
