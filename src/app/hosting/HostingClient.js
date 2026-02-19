"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Server, MapPin, Globe, Loader2, Info, Cloud, Database, ShieldCheck, CheckCircle, HelpCircle } from 'lucide-react';

export default function HostingClient() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkHosting = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError('');
    setData(null);

    // Clean domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    try {
      // ✅ Using ip-api (Free, supports CORS somewhat, but better with proxy or backend in production)
      // For pure client-side demo, we use ip-api.com over HTTP (browser might block mixed content) 
      // or try a CORS proxy if needed. Here we try direct.
      const response = await axios.get(`http://ip-api.com/json/${cleanDomain}`);
      
      if(response.data.status === 'fail') {
          setError('Could not identify hosting. Domain might be invalid or unreachable.');
      } else {
          setData(response.data);
      }
    } catch (err) {
      // Fallback message for mixed content blocking (common with free APIs)
      setError('Network Error: Please ensure you are not blocking scripts. (Note: Some browsers block HTTP APIs on HTTPS sites).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide mb-6 border border-orange-200">
                <Cloud size={14} className="mr-2" /> Server Detective Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Who Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">Hosting</span> This Website?
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Discover the hosting provider behind any domain. Detect if a site uses 
                <span className="font-bold text-gray-800"> Cloudflare</span>, 
                <span className="font-bold text-gray-800"> AWS</span>, or 
                <span className="font-bold text-gray-800"> WordPress</span> hosting.
            </p>
        </header>

        {/* --- INPUT BOX --- */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100 flex flex-col sm:flex-row gap-4 mb-16 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-2xl bg-gray-50 focus:bg-white transition border border-transparent focus:border-orange-200"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkHosting()}
                />
            </div>
            <button 
                onClick={checkHosting} 
                disabled={loading}
                className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-orange-200 transform active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Server size={20} />}
                Check Host
            </button>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <Info size={20} /> {error}
            </div>
        )}

        {/* --- RESULT CARD --- */}
        {data && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
                
                {/* Result Header */}
                <div className="bg-gradient-to-r from-orange-50 to-white p-8 border-b border-gray-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <Server className="w-12 h-12 text-orange-600" />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Hosting Provider Found</p>
                        <h2 className="text-3xl font-extrabold text-gray-900">{data.isp || data.org}</h2>
                        <p className="text-gray-500 font-medium mt-1">{data.as}</p>
                    </div>
                    <div className="md:ml-auto">
                         <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200 shadow-sm">
                            <CheckCircle size={16} className="mr-2" /> Live Server
                        </span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition hover:shadow-md">
                        <Globe className="text-blue-500 mt-1" size={24} />
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Public IP Address</span>
                            <p className="text-xl font-mono font-bold text-gray-800">{data.query}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition hover:shadow-md">
                        <MapPin className="text-red-500 mt-1" size={24} />
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data Center Location</span>
                            <p className="text-xl font-bold text-gray-800">{data.city}, {data.country}</p>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start">
                        <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 text-lg">Is this the real host?</h4>
                            <p className="text-blue-800 mt-1 leading-relaxed">
                                If the result says <strong>Cloudflare, Akamai, or Fastly</strong>, the website is using a CDN (Content Delivery Network) to hide its real server IP. This is common for security and speed optimization.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-orange max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Check a Website's Hosting?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Server className="text-green-600 w-5 h-5"/> Find Reliable Hosting</h3>
                    <p className="text-gray-600 text-sm">
                        Like a fast website? Check who hosts it. Knowing the provider helps you choose the <strong>best web hosting</strong> for your own business.
                    </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Database className="text-purple-600 w-5 h-5"/> Analyze Competitors</h3>
                    <p className="text-gray-600 text-sm">
                        See if your competitors are using <strong>Shared Hosting</strong> or high-performance <strong>Managed VPS</strong>. This reveals their budget and scale.
                    </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><ShieldCheck className="text-blue-600 w-5 h-5"/> Verify Location</h3>
                    <p className="text-gray-600 text-sm">
                        Server location affects SEO. If your audience is in India, but your server is in the USA, your site might load slowly.
                    </p>
                </div>
            </div>

            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <HelpCircle size={20}/> How to hide my hosting?
                </h3>
                <p className="text-yellow-800 text-sm">
                    You can use a <strong>CDN like Cloudflare</strong>. It acts as a shield/proxy, showing the CDN's IP address instead of your actual <strong>Cloud Hosting</strong> provider's IP.
                </p>
            </div>
        </article>

      </div>
    </div>
  );
}