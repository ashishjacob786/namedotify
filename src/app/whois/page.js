"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Database, Calendar, Server, Shield, Loader2, Globe, Clock, AlertCircle, CheckCircle, Hourglass } from 'lucide-react';

export default function WhoisPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Advanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Whois Lookup',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    description: 'Free tool to check domain ownership, registration date, expiry status, and nameservers instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  // 🎯 NEW: Function to calculate exact Domain Age
  const calculateDomainAge = (dateString) => {
    if (!dateString) return null;
    
    const creationDate = new Date(dateString);
    // Check if the date is valid
    if (isNaN(creationDate.getTime())) return null;

    const today = new Date();
    if (creationDate > today) return null;

    let years = today.getFullYear() - creationDate.getFullYear();
    let months = today.getMonth() - creationDate.getMonth();
    let days = today.getDate() - creationDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'Year' : 'Years'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'Month' : 'Months'}`);
    if (days > 0) parts.push(`${days} ${days === 1 ? 'Day' : 'Days'}`);

    return parts.length > 0 ? parts.join(', ') : 'Less than a day';
  };

  const lookupWhois = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      // NOTE: Ensure you have your /api/whois route setup or use an external API here
      const response = await axios.get(`/api/whois?domain=${domain}`);
      
      if(response.data.error) {
        setError("Domain not found or private.");
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError('Failed to fetch data. Please check the domain name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FIX: Used 'pt-24' to prevent black strip issue
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Database size={12} className="mr-1" /> Domain Research
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Whois Lookup Tool
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Find out who owns a domain, when it expires, and where it's hosted. 
                Essential for buying domains and checking competitors.
            </p>
        </div>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-blue-100 border border-blue-50 flex flex-col sm:flex-row gap-3 mb-12 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. google.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-xl bg-transparent"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && lookupWhois()}
                />
            </div>
            <button 
                onClick={lookupWhois} 
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-blue-200"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* Error State */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center gap-3 mb-8">
                <AlertCircle size={20} /> {error}
            </div>
        )}

        {/* Results Area */}
        {data && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Result Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-gray-200">
                            <Globe className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{domain}</h2>
                            <p className="text-sm text-gray-500">Domain Information</p>
                        </div>
                    </div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                        <CheckCircle size={16} className="mr-2" /> Active
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Key Info Cards */}
                    <div className="space-y-6">
                        
                        {/* ✅ NEW: Domain Age Card */}
                        {calculateDomainAge(data.creationDate || data.creationDateRaw) && (
                            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
                                <Hourglass className="w-6 h-6 text-teal-600 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-teal-900 uppercase tracking-wide">Domain Age</p>
                                    <p className="font-bold text-lg text-gray-900">
                                        {calculateDomainAge(data.creationDate || data.creationDateRaw)}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <Calendar className="w-6 h-6 text-blue-600 mt-1" />
                            <div>
                                <p className="text-sm font-medium text-blue-900 uppercase tracking-wide">Registered On</p>
                                <p className="font-bold text-lg text-gray-900">{data.creationDate || data.creationDateRaw || 'Not Available'}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <Clock className="w-6 h-6 text-orange-600 mt-1" />
                            <div>
                                <p className="text-sm font-medium text-orange-900 uppercase tracking-wide">Expires On</p>
                                <p className="font-bold text-lg text-gray-900">{data.registryExpiryDate || data.expiryDate || 'Not Available'}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <Shield className="w-6 h-6 text-purple-600 mt-1" />
                            <div>
                                <p className="text-sm font-medium text-purple-900 uppercase tracking-wide">Registrar</p>
                                <p className="font-bold text-lg text-gray-900">{data.registrar || 'Not Available'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Name Servers & Technical */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Server size={20} className="text-gray-500" /> Name Servers
                            </h3>
                            <ul className="space-y-2">
                                {Array.isArray(data.nameServer) ? data.nameServer.map((ns, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-700 font-mono bg-white p-2 rounded border border-gray-200 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        {ns}
                                    </li>
                                )) : (
                                    <li className="text-gray-500 italic">No Name Servers Found</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Raw Data Toggle (Styled like Terminal) */}
                <div className="border-t border-gray-200">
                    <details className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 hover:bg-gray-50 transition">
                            <span className="flex items-center gap-2 text-gray-700">
                                <Database size={18}/> View Raw Whois Record
                            </span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="text-neutral-600 px-6 pb-6 animate-in slide-in-from-top-2">
                            <pre className="bg-gray-900 text-green-400 p-5 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed border border-gray-800 shadow-inner max-h-96">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    </details>
                </div>
            </div>
        )}

        {/* ✅ Human Written SEO Content */}
        <section className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Perform a Whois Lookup?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose mt-10">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">1</span>
                        Verify Domain Ownership
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Before buying a website or entering a business deal, use Whois to confirm the registered owner. 
                        This helps avoid scams and ensures you are dealing with the legitimate rights holder.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm">2</span>
                        Check Expiry Dates
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        A domain's expiry date is public information. Use this tool to monitor when a domain you want might become available (drop catching) 
                        or to ensure your own domains are renewed on time.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm">3</span>
                        Identify Registrars
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Forgot where you bought your domain? The Whois record clearly lists the "Registrar" (e.g., GoDaddy, Namecheap), 
                        so you know where to log in to manage your DNS settings.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">4</span>
                        Investigate Cybercrime
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Cybersecurity researchers use Whois data to track down the sources of spam, phishing attacks, and malware. 
                        Finding the network provider helps in reporting abuse.
                    </p>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}