"use client";
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, Globe, Link as LinkIcon, Activity, BarChart3, Loader2, Eye, MonitorSmartphone, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('7'); 
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/analytics?days=${filter}`);
      if (res.status === 401) { router.push('/admin/login'); return; }
      const json = await res.json();
      setData(json);
    } catch (error) { console.error("Failed to load analytics"); } 
    finally { setIsLoading(false); }
  };

  if (isLoading && !data) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-blue-600">
      <Loader2 className="animate-spin mb-4" size={48} />
      <h2 className="text-xl font-bold text-gray-700">Loading Analytics Engine...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12 pt-16 sm:pt-20">
      {/* Top Navbar & Filter */}
      <div className="bg-slate-900 text-white px-8 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <BarChart3 className="text-blue-500" size={32} /> Overview Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Live traffic, devices & referral insights.</p>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            {['7', '30', '90'].map((days) => (
              <button key={days} onClick={() => setFilter(days)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === days ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}>
                Last {days} Days
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TOP METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Eye size={100} /></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Page Views</p>
            <h2 className="text-4xl font-black text-gray-900">{data?.totalViews?.toLocaleString() || 0}</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Users size={100} /></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Unique Visitors</p>
            <h2 className="text-4xl font-black text-emerald-600">{data?.uniqueVisitors?.toLocaleString() || 0}</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Top Country</p>
            <h2 className="text-2xl font-black text-gray-900 truncate flex items-center gap-2"><Globe className="text-blue-500" size={24}/> {data?.topCountry ? data.topCountry[0] : 'No Data'}</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Top Source</p>
            <h2 className="text-2xl font-black text-gray-900 truncate flex items-center gap-2"><LinkIcon className="text-purple-500" size={24}/> {data?.topReferrer ? data.topReferrer[0] : 'Direct'}</h2>
          </div>
        </div>

        {/* MAIN CHART */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6"><Activity className="text-blue-500"/> Traffic Over Time</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chartData || []}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <RechartsTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" name="Total Views" dataKey="views" stroke="#3b82f6" strokeWidth={4} fill="url(#colorViews)" />
                <Area type="monotone" name="Unique Visitors" dataKey="unique" stroke="#10b981" strokeWidth={3} fill="url(#colorUnique)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Pages & Devices) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* TOP PAGES */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6"><Layers className="text-indigo-500" size={20}/> Top Pages / Tools</h3>
              <div className="space-y-3">
                  {data?.topPages?.length > 0 ? data.topPages.map((page, i) => (
                      <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-100">
                          <span className="font-bold text-gray-700 truncate pr-4">{page.url}</span>
                          <span className="font-black text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-lg text-sm">{page.views} views</span>
                      </div>
                  )) : <p className="text-sm text-gray-400">No page data yet.</p>}
              </div>
            </div>

            {/* DEVICES */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6"><MonitorSmartphone className="text-orange-500" size={20}/> Devices</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.devicesList || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}/>
                            <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN (Referrals & Countries) */}
          <div className="space-y-8">
            
            {/* REFERRALS */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6"><LinkIcon className="text-purple-500" size={20}/> Traffic Sources</h3>
              <div className="space-y-4">
                {data?.referrersList?.length > 0 ? data.referrersList.map((ref, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className="text-gray-700 font-medium truncate pr-4">{ref[0]}</span>
                    <span className="bg-purple-50 text-purple-700 font-bold px-3 py-1 rounded-lg text-sm">{ref[1]}</span>
                  </div>
                )) : <p className="text-sm text-gray-400">No referrers tracked.</p>}
              </div>
            </div>

            {/* ✅ TOP COUNTRIES */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6"><Globe className="text-emerald-500" size={20}/> Top Countries</h3>
              <div className="space-y-4">
                {data?.countriesList?.length > 0 ? data.countriesList.map((country, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className="text-gray-700 font-medium truncate pr-4">{country[0]}</span>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-lg text-sm">{country[1]}</span>
                  </div>
                )) : <p className="text-sm text-gray-400">No countries tracked.</p>}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}