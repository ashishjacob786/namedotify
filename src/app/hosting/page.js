"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Server, MapPin, Globe, Loader2, Info, Cloud, Database, ShieldCheck, CheckCircle, HelpCircle } from 'lucide-react';

export default function HostingPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Advanced JSON-LD Schema (Targeting High CPC Categories)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Web Hosting Checker',
    applicationCategory: 'NetworkTool',
    operatingSystem: 'Web',
    description: 'Free tool to find who hosts a website. Detects WordPress hosting, Cloud providers, Dedicated servers, and CDNs.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const checkHosting = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      // NOTE: Ensure /api/hosting is working properly
      const response = await axios.get(`/api/hosting?domain=${domain}`);
      if(response.data.status === 'fail') {
          setError('Could not identify hosting. Domain might be invalid.');
      } else {
          setData(response.data);
      }
    } catch (err) {
      setError('Server error. Please check the domain name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FIX: 'pt-24' added to remove Black Strip
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Cloud size={12} className="mr-1" /> Server Detective
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Who Is Hosting This Website?
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover the hosting provider behind any domain. Detect if a site uses 
                <span className="font-semibold text-orange-600"> Cloudflare</span>, 
                <span className="font-semibold text-blue-600"> AWS</span>, or 
                <span className="font-semibold text-indigo-600"> WordPress</span> hosting.
            </p>
        </div>

        {/* Input Box */}
        <div className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-orange-100 border border-orange-50 flex flex-col sm:flex-row gap-3 mb-12 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-xl bg-transparent"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkHosting()}
                />
            </div>
            <button 
                onClick={checkHosting} 
                disabled={loading}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-orange-200"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Server size={20} />}
                Check Host
            </button>
        </div>

        {/* Error State */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center gap-3 mb-8">
                <Info size={20} /> {error}
            </div>
        )}

        {/* Result Card */}
        {data && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
                
                {/* Result Header */}
                <div className="bg-gradient-to-r from-orange-50 to-white p-8 border-b border-gray-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                        <Server className="w-10 h-10 text-orange-600" />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Hosting Provider Found</p>
                        <h2 className="text-3xl font-extrabold text-gray-900">{data.isp || data.org}</h2>
                        <p className="text-gray-500 font-medium">{data.as}</p>
                    </div>
                    <div className="md:ml-auto">
                         <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle size={16} className="mr-2" /> Live Server
                        </span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <Globe className="text-blue-500 mt-1" size={24} />
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Public IP Address</span>
                            <p className="text-lg font-mono font-bold text-gray-800">{data.query}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <MapPin className="text-red-500 mt-1" size={24} />
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data Center Location</span>
                            <p className="text-lg font-bold text-gray-800">{data.city}, {data.country}</p>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 bg-blue-50 p-6 rounded-xl border border-blue-100 flex gap-4 items-start">
                        <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900">Is this the real host?</h4>
                            <p className="text-sm text-blue-800 mt-1 leading-relaxed">
                                If the result says <strong>Cloudflare, Akamai, or Fastly</strong>, the website is using a CDN (Content Delivery Network) to hide its real server IP. This is common for security and speed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* ✅ High CPC Keyword Rich Content (SEO Strategy) */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-orange max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Check a Website's Hosting Provider?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4"><Server size={20}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Find Reliable Web Hosting</h3>
                    <p className="text-gray-600 text-sm">
                        Like a fast website? Check who hosts it. Whether it's <strong>Bluehost, SiteGround, or AWS</strong>, knowing the provider helps you choose the <strong>best web hosting</strong> for your own business.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4"><Database size={20}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Analyze Competitor Tech</h3>
                    <p className="text-gray-600 text-sm">
                        See if your competitors are using <strong>Cheap Shared Hosting</strong> or high-performance <strong>Managed WordPress Hosting</strong>. This reveals their budget and traffic scale.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4"><ShieldCheck size={20}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Verify Server Location</h3>
                    <p className="text-gray-600 text-sm">
                        Server location affects SEO. If your audience is in India, but your <strong>Dedicated Server</strong> is in the USA, your site might load slowly. Always choose a data center near your users.
                    </p>
                </div>
            </div>

            <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <HelpCircle size={18}/> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-yellow-900 text-sm">What is the difference between Shared and VPS Hosting?</h4>
                        <p className="text-yellow-800 text-sm">Shared hosting puts multiple sites on one server (cheaper), while <strong>VPS Hosting (Virtual Private Server)</strong> gives you dedicated resources for better speed and security.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-yellow-900 text-sm">How do I hide my hosting provider?</h4>
                        <p className="text-yellow-800 text-sm">You can use a <strong>CDN like Cloudflare</strong>. It acts as a shield, showing the CDN's IP address instead of your actual <strong>Cloud Hosting</strong> provider.</p>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}