"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Server, MapPin, Globe, Loader2, Info } from 'lucide-react';

export default function HostingPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkHosting = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/hosting?domain=${domain}`);
      setData(response.data);
    } catch (err) {
      setError('Could not find hosting details. Please check the domain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Server className="text-orange-600 w-10 h-10" /> Hosting Checker
            </h1>
            <p className="text-gray-600">Discover who is hosting any website and where their server is located.</p>
        </div>

        {/* Input Box */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2 mb-8">
            <input 
                type="text" 
                placeholder="Enter domain (e.g. namedotify.com)" 
                className="flex-1 p-3 outline-none text-lg"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkHosting()}
            />
            <button 
                onClick={checkHosting} 
                disabled={loading}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition flex items-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Server size={20} />}
                Check Host
            </button>
        </div>

        {/* Result Card */}
        {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

        {data && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-orange-50 p-6 border-b border-orange-100 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                        <Server className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">Hosting Provider</p>
                        <h2 className="text-2xl font-bold text-gray-900">{data.isp}</h2>
                        <p className="text-sm text-gray-500">{data.org}</p>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <Globe size={14}/> IP Address
                        </span>
                        <p className="text-lg font-mono bg-gray-100 inline-block px-2 py-1 rounded text-gray-800">{data.query}</p>
                    </div>
                    
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <MapPin size={14}/> Server Location
                        </span>
                        <p className="text-lg font-medium text-gray-800">{data.city}, {data.country}</p>
                    </div>

                    <div className="space-y-1 col-span-1 md:col-span-2">
                        <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800">
                                Note: Some websites use Cloudflare or CDNs. In that case, the result might show "Cloudflare" instead of the actual backend hosting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}