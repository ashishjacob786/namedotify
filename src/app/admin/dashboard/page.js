"use client";
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, Eye, ArrowUpRight, MonitorSmartphone, Link as LinkIcon, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-600"><Activity className="animate-spin" size={40} /></div>;
  if (!data) return <div className="text-center mt-20">Error loading data.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24 pt-28 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analytics Dashboard</h1>
            <p className="text-gray-500">Live traffic overview for NameDotify (Last 30 Days)</p>
        </header>

        {/* --- Top Stat Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><Eye size={32} /></div>
                <div>
                    <p className="text-sm font-bold text-gray-400 uppercase">Total Page Views</p>
                    <h2 className="text-4xl font-black text-gray-900">{data.totalViews.toLocaleString()}</h2>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={32} /></div>
                <div>
                    <p className="text-sm font-bold text-gray-400 uppercase">Unique Visitors</p>
                    <h2 className="text-4xl font-black text-gray-900">{data.uniqueVisitors.toLocaleString()}</h2>
                </div>
            </div>
        </div>

        {/* --- Main Chart (Traffic over time) --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Traffic Over Time</h3>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- Top Pages --- */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2"><ArrowUpRight size={18}/> Top Pages / Tools</h3>
                <div className="space-y-3">
                    {data.topPages.map((page, i) => (
                        <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition">
                            <span className="font-medium text-gray-600 truncate pr-4">{page.url}</span>
                            <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{page.views}</span>
                        </div>
                    ))}
                    {data.topPages.length === 0 && <p className="text-gray-400 text-sm">No data yet. Visit some pages!</p>}
                </div>
            </div>

            {/* --- Sidebar Stats (Referrals & Devices) --- */}
            <div className="space-y-8">
                
                {/* Referrals */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2"><LinkIcon size={18}/> Traffic Sources</h3>
                    <div className="space-y-3">
                        {data.referrers.map((ref, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">{ref.source}</span>
                                <span className="font-bold text-gray-900">{ref.views}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2"><MonitorSmartphone size={18}/> Devices</h3>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.devices}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none' }}/>
                                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}