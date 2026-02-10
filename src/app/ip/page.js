"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Globe, Server, Navigation, Search, Loader2 } from 'lucide-react';

export default function IpPage() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Page load hote hi khud ki IP check karo
  useEffect(() => {
    checkIp('');
  }, []);

  const checkIp = async (customIp) => {
    setLoading(true);
    setData(null);
    try {
      const url = customIp ? `/api/ip?ip=${customIp}` : `/api/ip`;
      const response = await axios.get(url);
      setData(response.data);
      if (!customIp) setIp(response.data.query); // Input box me IP dikhao
    } catch (err) {
      console.error("Failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Globe className="text-blue-500 w-10 h-10" /> IP Address Lookup
            </h1>
            <p className="text-gray-600">Find your public IP address, location, and ISP details instantly.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2 mb-8 max-w-2xl mx-auto">
            <input 
                type="text" 
                placeholder="Enter any IP (Leave empty for yours)" 
                className="flex-1 p-3 outline-none text-lg font-mono text-gray-700"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkIp(ip)}
            />
            <button 
                onClick={() => checkIp(ip)} 
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Search
            </button>
        </div>

        {/* Results Card */}
        {data && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Top Banner with Map Background Effect */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-1">IP Address</p>
                        <h2 className="text-4xl md:text-5xl font-mono font-bold tracking-tight">{data.query}</h2>
                        <p className="mt-2 text-blue-100 flex items-center gap-2">
                            <MapPin size={16} /> {data.city}, {data.regionName}, {data.country}
                        </p>
                    </div>
                    <Globe className="absolute -right-10 -bottom-10 text-white opacity-10 w-64 h-64" />
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <Server size={14}/> ISP (Internet Provider)
                        </span>
                        <p className="text-lg font-medium text-gray-800">{data.isp}</p>
                        <p className="text-sm text-gray-500">{data.org}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <Navigation size={14}/> Coordinates
                        </span>
                        <p className="text-lg font-medium text-gray-800">{data.lat}, {data.lon}</p>
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lon}`} 
                            target="_blank"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            View on Google Maps
                        </a>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <Globe size={14}/> Timezone
                        </span>
                        <p className="text-lg font-medium text-gray-800">{data.timezone}</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}