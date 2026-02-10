"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Globe, Server, Navigation, Search, Loader2, Shield, Info } from 'lucide-react';

export default function IpPage() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Advanced Schema for IP Tool
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify IP Lookup',
    applicationCategory: 'NetworkTool',
    operatingSystem: 'Any',
    description: 'Free tool to check IP address location, ISP, and timezone.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  // Auto-fetch user's IP on load
  useEffect(() => {
    fetchIpDetails('');
  }, []);

  const fetchIpDetails = async (inputIp) => {
    setLoading(true);
    setError('');
    try {
      // Free API for demo (ipapi.co)
      const url = inputIp ? `https://ipapi.co/${inputIp}/json/` : 'https://ipapi.co/json/';
      const response = await axios.get(url);
      
      if (response.data && !response.data.error) {
        setData(response.data);
        if (!inputIp) setIp(response.data.ip);
      } else {
        setError('Invalid IP address or API limit reached.');
      }
    } catch (err) {
      setError('Failed to fetch IP details. Try disabling AdBlock.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">IP Address Lookup & Geolocation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the geographical location, ISP, and timezone of any IP address instantly. 
            See what websites know about your digital footprint.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition font-mono"
              />
            </div>
            <button
              onClick={() => fetchIpDetails(ip)}
              disabled={loading}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Trace IP'}
            </button>
          </div>
        </div>

        {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 mb-6">
                <Info size={20} /> {error}
            </div>
        )}

        {/* Results Grid */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                        <Globe size={32} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Target IP Address</p>
                        <h2 className="text-3xl font-bold text-gray-900 font-mono">{data.ip}</h2>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase">City</p>
                        <p className="font-semibold text-gray-800">{data.city}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Region</p>
                        <p className="font-semibold text-gray-800">{data.region}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Country</p>
                        <p className="font-semibold text-gray-800">{data.country_name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Timezone</p>
                        <p className="font-semibold text-gray-800">{data.timezone}</p>
                    </div>
                </div>
            </div>

            {/* Network Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Server size={20} className="text-purple-500" /> ISP & Network
                </h3>
                <ul className="space-y-3">
                    <li className="flex justify-between">
                        <span className="text-gray-500">ISP Name</span>
                        <span className="font-medium text-gray-900 text-right">{data.org}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-gray-500">ASN</span>
                        <span className="font-medium text-gray-900">{data.asn}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-gray-500">Postal Code</span>
                        <span className="font-medium text-gray-900">{data.postal}</span>
                    </li>
                </ul>
            </div>

            {/* Coordinates */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Navigation size={20} className="text-red-500" /> GPS Coordinates
                </h3>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-4">
                    <div>
                        <p className="text-xs text-gray-400">Latitude</p>
                        <p className="font-mono font-bold text-gray-800">{data.latitude}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Longitude</p>
                        <p className="font-mono font-bold text-gray-800">{data.longitude}</p>
                    </div>
                </div>
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`} 
                    target="_blank"
                    className="block w-full text-center py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium text-sm"
                >
                    View on Google Maps →
                </a>
            </div>
          </div>
        )}

        {/* ✅ Human Written SEO Content */}
        <div className="mt-16 prose prose-blue max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">What Does Your IP Address Reveal?</h2>
            <p className="text-gray-600">
                Every device connected to the internet has a unique identifier called an <strong>Internet Protocol (IP) address</strong>. 
                Think of it as your digital home address. Websites, advertisers, and hackers can use this string of numbers to determine your:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                <li className="flex items-center gap-2"><MapPin size={16} className="text-red-500"/> Approximate physical location (City/State)</li>
                <li className="flex items-center gap-2"><Server size={16} className="text-purple-500"/> Internet Service Provider (ISP)</li>
                <li className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Connection security status</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mt-6">IPv4 vs IPv6: What's the Difference?</h3>
            <p className="text-gray-600">
                Most of the web still uses <strong>IPv4</strong> (e.g., <code>192.168.1.1</code>), which is running out of unique addresses. 
                The new standard, <strong>IPv6</strong>, uses a complex alphanumeric format to ensure we never run out of addresses for future devices.
                NameDotify supports lookup for both protocols.
            </p>
        </div>
      </div>
    </div>
  );
}