"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Clock, CheckCircle, XCircle, Globe, Loader2, AlertTriangle, Wifi, BarChart3, HelpCircle, Server } from 'lucide-react';

export default function StatusPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Advanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Server Status Checker',
    applicationCategory: 'NetworkTool',
    operatingSystem: 'Web',
    description: 'Free tool to check if a website is down. Monitor server uptime, response time (ping), and HTTP status codes instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const checkStatus = async () => {
    if (!domain) return;
    setLoading(true);
    setData(null);
    setError('');

    try {
      // NOTE: Ensure /api/status is working on backend
      const response = await axios.get(`/api/status?domain=${domain}`);
      setData(response.data);
    } catch (err) {
      // If API fails, show generic error
      setError('Could not reach the server or domain is invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FIX: 'pt-24' added to prevent black strip
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Activity size={12} className="mr-1" /> Uptime Monitor
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Is This Website Down?
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Check real-time server status, HTTP response codes, and latency (ping). 
                Find out if it's just you or everyone else.
            </p>
        </div>

        {/* Input Box */}
        <div className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-pink-100 border border-pink-50 flex flex-col sm:flex-row gap-3 mb-12 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter website URL (e.g. google.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-xl bg-transparent"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
                />
            </div>
            <button 
                onClick={checkStatus} 
                disabled={loading}
                className="bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-pink-200"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Activity size={20} />}
                Check Status
            </button>
        </div>

        {/* Error State */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center gap-3 mb-8">
                <AlertTriangle size={20} /> {error}
            </div>
        )}

        {/* Result Card */}
        {data && (
            <div className={`max-w-3xl mx-auto rounded-2xl shadow-lg border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20 ${data.online ? 'bg-white border-green-200' : 'bg-white border-red-200'}`}>
                
                {/* Main Status Banner */}
                <div className={`p-8 text-center border-b ${data.online ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <div className={`inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4`}>
                        {data.online ? <CheckCircle className="w-12 h-12 text-green-500" /> : <XCircle className="w-12 h-12 text-red-500" />}
                    </div>
                    <h2 className={`text-3xl font-extrabold ${data.online ? 'text-green-700' : 'text-red-700'}`}>
                        {data.online ? 'Website is Online' : 'Website is Down'}
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg font-mono">{domain}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-8 text-center hover:bg-gray-50 transition">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">HTTP Status Code</p>
                        <span className={`text-3xl font-mono font-bold ${data.statusCode === 200 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {data.statusCode || 'N/A'}
                        </span>
                        <p className="text-sm text-gray-500 mt-1 font-medium">{data.statusText || 'Unknown'}</p>
                    </div>

                    <div className="p-8 text-center hover:bg-gray-50 transition">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Response Time</p>
                        <div className="flex items-center justify-center gap-2">
                            <Clock size={24} className="text-blue-500" />
                            <span className="text-3xl font-bold text-gray-800">{data.responseTime || '0'} <span className="text-sm font-normal text-gray-400">ms</span></span>
                        </div>
                    </div>

                    <div className="p-8 text-center hover:bg-gray-50 transition">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Server Status</p>
                        <div className="flex items-center justify-center gap-2">
                             <Wifi size={24} className={data.online ? "text-green-500" : "text-red-500"} />
                             <span className="text-lg font-bold text-gray-700">{data.online ? 'Reachable' : 'Offline'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* ✅ Human Written SEO Content (High Value) */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-pink max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding HTTP Status Codes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
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
                        <h3 className="font-bold text-red-900 text-lg">500 / 503 Server Error</h3>
                    </div>
                    <p className="text-red-800 text-sm">
                        The server failed to fulfill the request. 503 usually means the site is under maintenance or overloaded with traffic.
                    </p>
                </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <BarChart3 size={18}/> Why Monitor Response Time?
                </h3>
                <p className="text-gray-600 text-sm">
                    Speed matters. A response time under <strong>200ms</strong> is excellent. Anything over <strong>500ms</strong> is noticeable by users, 
                    and over <strong>2 seconds</strong> can hurt your Google rankings and user experience.
                </p>
            </div>
        </section>

      </div>
    </div>
  );
}