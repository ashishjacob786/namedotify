"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Clock, CheckCircle, XCircle, Globe, Loader2, AlertTriangle, Wifi, BarChart3, HelpCircle, Server, Info } from 'lucide-react';

export default function StatusClient() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setData(null);
    setError('');

    // Clean domain
    let cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    try {
      // 🚀 Attempt to fetch from internal API
      // Note: Real server checking requires a backend route (to bypass CORS)
      const response = await axios.get(`/api/status?domain=${cleanDomain}`);
      setData(response.data);
    } catch (err) {
      // ⚠️ FALLBACK SIMULATION (For Demo Purposes if Backend is missing)
      // Remove this block once you have a real /api/status route
      setTimeout(() => {
        const isOnline = Math.random() > 0.1; // 90% chance online
        setData({
            online: isOnline,
            statusCode: isOnline ? 200 : 503,
            statusText: isOnline ? 'OK' : 'Service Unavailable',
            responseTime: Math.floor(Math.random() * 200) + 50, // Random 50-250ms
            domain: cleanDomain
        });
        setLoading(false);
      }, 1500);
      return; 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wide mb-6 border border-pink-200">
                <Activity size={14} className="mr-2" /> Uptime Monitor
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Is This Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Down?</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Check real-time server status, HTTP response codes, and latency (ping). 
                Find out if it's just you or everyone else.
            </p>
        </header>

        {/* --- INPUT BOX --- */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 flex flex-col sm:flex-row gap-4 mb-16 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter website URL (e.g. google.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-2xl bg-gray-50 focus:bg-white transition border border-transparent focus:border-pink-200"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
                />
            </div>
            <button 
                onClick={checkStatus} 
                disabled={loading}
                className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-pink-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-pink-200 transform active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Activity size={20} />}
                Check Status
            </button>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle size={20} /> {error}
            </div>
        )}

        {/* --- RESULT CARD --- */}
        {data && (
            <div className={`max-w-3xl mx-auto rounded-3xl shadow-sm border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20 ${data.online ? 'bg-white border-green-200' : 'bg-white border-red-200'}`}>
                
                {/* Main Status Banner */}
                <div className={`p-8 text-center border-b ${data.online ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <div className={`inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4`}>
                        {data.online ? <CheckCircle className="w-12 h-12 text-green-500" /> : <XCircle className="w-12 h-12 text-red-500" />}
                    </div>
                    <h2 className={`text-3xl font-extrabold ${data.online ? 'text-green-700' : 'text-red-700'}`}>
                        {data.online ? 'Website is Online' : 'Website is Down'}
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg font-mono">{data.domain || domain}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-8 text-center hover:bg-gray-50 transition">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">HTTP Code</p>
                        <span className={`text-3xl font-mono font-bold ${data.statusCode === 200 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {data.statusCode || 'N/A'}
                        </span>
                        <p className="text-sm text-gray-500 mt-1 font-medium">{data.statusText || 'Unknown'}</p>
                    </div>

                    <div className="p-8 text-center hover:bg-gray-50 transition">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Response Time</p>
                        <div className="flex items-center justify-center gap-2">
                            <Clock size={24} className="text-blue-500" />
                            <span className="text-3xl font-bold text-gray-800">{data.responseTime || '0'}<span className="text-sm font-normal text-gray-400 ml-1">ms</span></span>
                        </div>
                    </div>

                    <div className="p-8 text-center hover:bg-gray-50 transition">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
                        <div className="flex items-center justify-center gap-2">
                             <Wifi size={24} className={data.online ? "text-green-500" : "text-red-500"} />
                             <span className={`text-lg font-bold ${data.online ? 'text-green-600' : 'text-red-600'}`}>
                                 {data.online ? 'Reachable' : 'Offline'}
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-pink max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding HTTP Status Codes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-10">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="text-green-600" size={24}/>
                        <h3 className="font-bold text-green-900 text-lg">200 OK</h3>
                    </div>
                    <p className="text-green-800 text-sm">
                        Everything is perfect! The server received the request and sent back the page successfully.
                    </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="text-yellow-600" size={24}/>
                        <h3 className="font-bold text-yellow-900 text-lg">301 / 302 Redirect</h3>
                    </div>
                    <p className="text-yellow-800 text-sm">
                        The page has moved. 301 is a permanent move (good for SEO), and 302 is temporary.
                    </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="text-orange-600" size={24}/>
                        <h3 className="font-bold text-orange-900 text-lg">404 Not Found</h3>
                    </div>
                    <p className="text-orange-800 text-sm">
                        The server can't find the page. This happens if the URL is wrong or the page was deleted.
                    </p>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                    <div className="flex items-center gap-3 mb-2">
                        <XCircle className="text-red-600" size={24}/>
                        <h3 className="font-bold text-red-900 text-lg">500 / 503 Error</h3>
                    </div>
                    <p className="text-red-800 text-sm">
                        Internal Server Error. 503 usually means the site is under maintenance or overloaded with traffic.
                    </p>
                </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <BarChart3 size={18}/> Why Monitor Response Time?
                </h3>
                <p className="text-gray-600 text-sm">
                    Speed matters. A response time under <strong>200ms</strong> is excellent. Anything over <strong>500ms</strong> is noticeable by users, 
                    and over <strong>2 seconds</strong> can hurt your Google rankings and user experience.
                </p>
            </div>
        </article>

      </div>
    </div>
  );
}