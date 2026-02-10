"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Globe, Server, Shield, Activity, Calendar, Database, LayoutGrid, Zap, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // null, 'available', or 'taken'

  const checkDomain = async () => {
    if (!domain) return;
    setLoading(true);
    setResult(null);
    
    try {
      // हमारी बनाई हुई API को कॉल करें
      const response = await axios.get(`/api/check?domain=${domain}`);
      if (response.data.available) {
        setResult('available');
      } else {
        setResult('taken');
      }
    } catch (error) {
      console.error("Error checking domain", error);
      alert("Something went wrong via checking.");
    } finally {
      setLoading(false);
    }
  };

  const tools = [
    { name: 'Domain Price Comparison', icon: <LayoutGrid className="w-6 h-6 text-blue-500" />, desc: 'Compare prices across registrars' },
    { name: 'Domain Availability', icon: <Globe className="w-6 h-6 text-green-500" />, desc: 'Check if domain is free' },
    { name: 'AI Domain Suggestion', icon: <Zap className="w-6 h-6 text-yellow-500" />, desc: 'Get AI-powered names' },
    { name: 'DNS Checker', icon: <Server className="w-6 h-6 text-purple-500" />, desc: 'Verify DNS propagation' },
    { name: 'Whois Lookup', icon: <Database className="w-6 h-6 text-red-500" />, desc: 'Find domain owner info' },
    { name: 'Domain Age', icon: <Calendar className="w-6 h-6 text-orange-500" />, desc: 'Check domain lifespan' },
    { name: 'Hosting Checker', icon: <Server className="w-6 h-6 text-indigo-500" />, desc: 'Find who hosts a site' },
    { name: 'SSL Checker', icon: <Shield className="w-6 h-6 text-emerald-500" />, desc: 'Verify SSL security' },
    { name: 'Status Checker', icon: <Activity className="w-6 h-6 text-pink-500" />, desc: 'Is website down?' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer" onClick={() => window.location.reload()}>namedotify<span className="text-gray-400">.com</span></div>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600">Tools</a>
          <a href="#" className="hover:text-blue-600">Blog</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          Find Your Perfect <span className="text-blue-600">Domain Name</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Instant availability check, AI suggestions, and powerful SEO tools for webmasters.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg transition transform group-hover:scale-[1.01]"
            placeholder="Type a domain (e.g., namedotify.com)..."
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkDomain()}
          />
          <button 
            onClick={checkDomain}
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Analyze'}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className={`max-w-2xl mx-auto p-4 rounded-xl border-2 flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-300 ${result === 'available' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <div className="flex items-center gap-3">
              {result === 'available' ? <CheckCircle className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-600" />}
              <div className="text-left">
                <p className="font-bold text-lg">{domain}</p>
                <p className="text-sm opacity-90">{result === 'available' ? 'is available! Grab it now.' : 'is already taken.'}</p>
              </div>
            </div>
            {result === 'available' && (
              <a href={`https://www.hostinger.com/web-hosting?domain=${domain}`} target="_blank" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 text-sm">
                Buy Now
              </a>
            )}
            {result === 'taken' && (
              <button className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 text-sm">
                Who owns it?
              </button>
            )}
          </div>
        )}
      </header>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">More Professional Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition duration-200 cursor-pointer flex items-center gap-4 group">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition">
                {tool.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-500 text-sm">
        <p>&copy; 2024 namedotify.com. All rights reserved. • <a href="#" className="hover:text-blue-600">Privacy Policy</a></p>
      </footer>
    </div>
  );
}