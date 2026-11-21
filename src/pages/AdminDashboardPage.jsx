import React, { useState, useEffect } from 'react';
import {
  Database,
  TrendingUp,
  ShoppingCart,
  Key,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Search,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'licenses' | 'inquiries' | 'database'

  const fetchStats = () => {
    setLoading(true);
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSimulateTestOrder = async () => {
    try {
      const res = await fetch('/api/checkout/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'ai-review-php',
          customerName: 'Test Agency Admin',
          customerEmail: 'admin.test@prestigeintelligence.com',
          customerPhone: '+91 9341630325',
          paymentMethod: 'upi',
          transactionRef: `UPI-ADMIN-TEST-${Math.floor(1000 + Math.random() * 9000)}`
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Test order successfully created in MongoDB! License issued: ${data.license?.licenseKey}`);
        fetchStats();
      }
    } catch (e) {
      alert('Error creating test order: ' + e.message);
    }
  };

  const filteredOrders = stats?.recentOrders?.filter((o) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      o.customerName?.toLowerCase().includes(q) ||
      o.customerEmail?.toLowerCase().includes(q) ||
      o.productTitle?.toLowerCase().includes(q) ||
      o.orderId?.toLowerCase().includes(q) ||
      o.licenseKey?.toLowerCase().includes(q)
    );
  }) || [];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Prestige Control Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                Admin Panel
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Real-time telemetry, MongoDB collections, purchases, and issued license keys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateTestOrder}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate Test MongoDB Order</span>
            </button>
            <button
              onClick={fetchStats}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Refresh Stats"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Database Status Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Database Engine</p>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <span>{stats?.dbStatus?.engine || 'MongoDB (Mongoose)'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            URI: <span className="text-cyan-300">{stats?.dbStatus?.uri || 'mongodb://127.0.0.1:27017/prestige_intelligence'}</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">
              ₹{stats?.metrics?.totalRevenue?.toLocaleString() || '0'}
            </p>
            <p className="text-[11px] text-slate-500">From verified purchases</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Orders</span>
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {stats?.metrics?.totalOrders || 0}
            </p>
            <p className="text-[11px] text-slate-500">Logged in MongoDB</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Active Licenses</span>
              <Key className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">
              {stats?.metrics?.activeLicenses || 0}
            </p>
            <p className="text-[11px] text-slate-500">Issued commercial keys</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Customer Inquiries</span>
              <MessageSquare className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-indigo-400">
              {stats?.metrics?.totalInquiries || 0}
            </p>
            <p className="text-[11px] text-slate-500">Lead capture submissions</p>
          </div>
        </div>

        {/* Tabs & Table */}
        <div className="bg-[#0f172a] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Orders ({stats?.recentOrders?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Inquiries ({stats?.recentInquiries?.length || 0})
              </button>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by customer, ID, or key..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 pl-8 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Orders Table */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              {filteredOrders.length === 0 ? (
                <div className="p-10 text-center text-slate-500 text-sm">
                  No orders recorded in MongoDB yet. Click "Simulate Test MongoDB Order" or complete a checkout to see orders appear!
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Software</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">License Key</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredOrders.map((ord, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5 pl-5 font-mono text-cyan-400 font-semibold">
                          {ord.orderId}
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-white">{ord.customerName}</p>
                          <p className="text-[11px] text-slate-500">{ord.customerEmail}</p>
                        </td>
                        <td className="p-3.5 font-medium max-w-xs truncate">
                          {ord.productTitle}
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400">
                          ₹{ord.amount?.toLocaleString()}
                        </td>
                        <td className="p-3.5 uppercase text-[10px] font-mono text-slate-400">
                          {ord.paymentMethod}
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-amber-300">
                          {ord.licenseKey || 'N/A'}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {ord.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Inquiries Table */}
          {activeTab === 'inquiries' && (
            <div className="overflow-x-auto">
              {stats?.recentInquiries?.length === 0 ? (
                <div className="p-10 text-center text-slate-500 text-sm">
                  No inquiries received yet.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5">Name</th>
                      <th className="p-3.5">Phone / WhatsApp</th>
                      <th className="p-3.5">Software Of Interest</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {stats?.recentInquiries?.map((inq, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5 pl-5 font-bold text-white">{inq.name}</td>
                        <td className="p-3.5 font-mono text-cyan-400">{inq.phone}</td>
                        <td className="p-3.5">{inq.productTitle}</td>
                        <td className="p-3.5 text-slate-500">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                          >
                            <span>WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

