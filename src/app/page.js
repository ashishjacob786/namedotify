"use client";
import React, { useState } from 'react';
import { Search, Globe, Server, Shield, Activity, Calendar, Database, LayoutGrid, Zap } from 'lucide-react';

export default function Home() {
  const [domain, setDomain] = useState('');

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
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 tracking-tight">namedotify<span className="text-gray-400">.com</span></div>
        <div className="space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600">Tools</a>
          <a href="#" className="hover:text-blue-600">Blog</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          All-in-One <span className="text-blue-600">Web Tools</span> Platform
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Analyze domains, check server status, and optimize your web presence with our professional SEO and webmaster tools.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg transition transform group-hover:scale-[1.01]"
            placeholder="Enter a domain (e.g., google.com)..."
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-medium hover:bg-blue-700 transition">
            Analyze
          </button>
        </div>
      </header>

      {/* Tools Grid (Jaisa Image me tha) */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition duration-200 cursor-pointer flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                {tool.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-500 text-sm">
        <p>&copy; 2024 namedotify.com. All rights reserved.</p>
      </footer>
    </div>
  );
}