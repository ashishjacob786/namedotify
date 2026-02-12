"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Globe, Server, Navigation, Search, Loader2, Shield, Info, Radio, Map } from 'lucide-react';

export default function IpPage() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ 1. Advanced JSON-LD Schema (SoftwareApp + Breadcrumbs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NameDotify IP Lookup",
        "operatingSystem": "Web",
        "applicationCategory": "NetworkTool",
        "url": "https://namedotify.com/ip",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free tool to check IP address location, ISP, ASN, and timezone instantly."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://namedotify.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "IP Lookup",
            "item": "https://namedotify.com/ip"
          }
        ]
      }
    ]
  };

  // Auto-fetch user's IP on load
  useEffect(() => {
    fetchIpDetails('');
  }, []);

  const fetchIpDetails = async (inputIp) => {
    setLoading(true);
    setError('');
    try {
      // Using ipapi.co (Free Tier) - Good for client side demos
      const url = inputIp ? `https://ipapi.co/${inputIp}/json/` : 'https://ipapi.co/json/';
      const response = await axios.get(url);
      
      if (response.data && !response.data.error) {
        setData(response.data);
        if (!inputIp) setIp(response.data.ip);
      } else {
        setError('Invalid IP address or private network.');
      }
    } catch (err) {
      setError('Failed to fetch IP details. AdBlocker might be blocking the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ UI: Consistent Padding
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>Free IP Address Lookup & Geolocation Tracker | NameDotify.com</title>
      <meta name="description" content="Find the geographical location, ISP, and timezone of any IP address instantly. Free IP Tracker tool for IPv4 and IPv6." />
      <meta name="keywords" content="ip lookup, ip tracker, my ip address, geolocation finder, check isp, ip address details" />
      
      {/* ✅ 3. Open Graph Tags */}
      <meta property="og:title" content="Free IP Address Lookup | NameDotify.com" />
      <meta property="og:description" content="Trace any IP address to its physical location and ISP." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://namedotify.com/ip" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide mb-6 border border-red-200">
                <MapPin size={14} className="mr-2" /> Geolocation Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                IP Address <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Lookup</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Find the <span className="font-bold text-gray-800">physical location, ISP, and timezone</span> of any IP address. 
                See what websites know about your digital footprint.
            </p>
        </header>

        {/* --- SEARCH BOX --- */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-red-100/50 border border-red-100 mb-12 relative z-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchIpDetails(ip)}
                placeholder="Enter IP address (e.g. 8.8.8.8)"
                className="w-full pl-14 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition font-mono text-lg"
              />
            </div>
            <button
              onClick={() => fetchIpDetails(ip)}
              disabled={loading}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-70 transform active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Trace IP'}
            </button>
          </div>
        </div>

        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <Info size={20} /> {error}
            </div>
        )}

        {/* --- RESULTS GRID --- */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
            
            {/* Main Info Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8"></div>
                
                <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100">
                        <Globe size={40} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Target IP Address</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-mono tracking-tight">{data.ip}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100 relative z-10">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">City</p>
                        <p className="font-bold text-lg text-gray-800">{data.city || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Region</p>
                        <p className="font-bold text-lg text-gray-800">{data.region || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Country</p>
                        <p className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            {data.country_name || 'N/A'}
                            {data.country_code && <img src={`https://flagcdn.com/w20/${data.country_code.toLowerCase()}.png`} alt="flag" className="rounded-sm" />}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Timezone</p>
                        <p className="font-bold text-lg text-gray-800">{data.timezone || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Network Details */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                    <Server size={24} className="text-purple-600" /> ISP & Network
                </h3>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center pb-4 border-b border-gray-50">
                        <span className="text-gray-500 font-medium">Provider (ISP)</span>
                        <span className="font-bold text-gray-900 text-right max-w-[60%]">{data.org || 'Unknown'}</span>
                    </li>
                    <li className="flex justify-between items-center pb-4 border-b border-gray-50">
                        <span className="text-gray-500 font-medium">ASN</span>
                        <span className="font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg font-mono">{data.asn || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Postal Code</span>
                        <span className="font-bold text-gray-900">{data.postal || 'N/A'}</span>
                    </li>
                </ul>
            </div>

            {/* Coordinates & Map */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                        <Navigation size={24} className="text-red-600" /> GPS Coordinates
                    </h3>
                    <div className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-100">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Latitude</p>
                            <p className="font-mono font-bold text-gray-800 text-lg">{data.latitude}</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 font-bold uppercase">Longitude</p>
                            <p className="font-mono font-bold text-gray-800 text-lg">{data.longitude}</p>
                        </div>
                    </div>
                </div>
                
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:-translate-y-1"
                >
                    <Map size={20} /> View on Google Maps
                </a>
            </div>
          </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-red max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Does Your IP Address Reveal?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-10">
                <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><MapPin className="text-red-500"/> Physical Location</h3>
                    <p className="text-gray-600 text-sm">Websites can detect your approximate city and country to serve local content or ads.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Server className="text-purple-500"/> Internet Provider</h3>
                    <p className="text-gray-600 text-sm">Your ISP (e.g., Comcast, Jio) is visible, which can sometimes indicate your connection speed tier.</p>
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-6">IPv4 vs IPv6</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
                Most of the web still uses <strong>IPv4</strong> (e.g., <code>192.168.1.1</code>), which is running out of unique addresses. 
                The new standard, <strong>IPv6</strong>, uses a complex alphanumeric format to ensure we never run out of addresses for future devices.
                
                NameDotify supports lookup for both protocols.
            </p>
        </article>

      </div>
    </div>
  );
}