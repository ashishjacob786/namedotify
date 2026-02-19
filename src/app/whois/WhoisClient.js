"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Database, Calendar, Server, Shield, Loader2, Globe, Clock, AlertCircle, CheckCircle, Hourglass } from 'lucide-react';

export default function WhoisClient() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🎯 Function to calculate exact Domain Age
  const calculateDomainAge = (dateString) => {
    if (!dateString) return null;
    
    const creationDate = new Date(dateString);
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

  // 🎯 Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const lookupWhois = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/whois?domain=${encodeURIComponent(domain)}`);
      
      if(response.data.error) {
        setError(response.data.error);
      } else {
        setData(response.data);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Network Error: Could not connect to the server. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200">
                <Database size={14} className="mr-2" /> Domain Research Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Whois <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Lookup</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Find out <span className="font-bold text-gray-800">who owns a domain</span>, exactly when it was registered, 
                and when it expires. Essential for domain investors and developers.
            </p>
        </header>

        {/* --- SEARCH BOX --- */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-100 flex flex-col sm:flex-row gap-3 mb-16 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com, google.org)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-2xl bg-gray-50 focus:bg-white transition border border-transparent focus:border-blue-200"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && lookupWhois()}
                />
            </div>
            <button 
                onClick={lookupWhois} 
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-blue-200 transform active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} /> {error}
            </div>
        )}

        {/* --- RESULTS AREA --- */}
        {data && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Result Header */}
                <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <Globe className="text-blue-600" size={28} />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-900">{data.domain || domain}</h2>
                            <p className="text-sm text-gray-500 font-medium">Domain Registered</p>
                        </div>
                    </div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                        <CheckCircle size={16} className="mr-2" /> Active Status
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Key Info Cards */}
                    <div className="space-y-6">
                        
                        {/* Domain Age Card */}
                        {calculateDomainAge(data.creationDate) && (
                            <div className="flex items-start gap-4 p-5 bg-teal-50 rounded-2xl border border-teal-100 transition hover:shadow-md">
                                <Hourglass className="w-6 h-6 text-teal-600 mt-1" />
                                <div>
                                    <p className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Domain Age</p>
                                    <p className="font-extrabold text-xl text-gray-900 leading-tight">
                                        {calculateDomainAge(data.creationDate)}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 transition hover:shadow-md">
                            <Calendar className="w-6 h-6 text-blue-600 mt-1" />
                            <div>
                                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Registered On</p>
                                <p className="font-bold text-lg text-gray-900">{formatDate(data.creationDate)}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-5 bg-orange-50 rounded-2xl border border-orange-100 transition hover:shadow-md">
                            <Clock className="w-6 h-6 text-orange-600 mt-1" />
                            <div>
                                <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">Expires On</p>
                                <p className="font-bold text-lg text-gray-900">{formatDate(data.expiryDate)}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-5 bg-purple-50 rounded-2xl border border-purple-100 transition hover:shadow-md">
                            <Shield className="w-6 h-6 text-purple-600 mt-1" />
                            <div>
                                <p className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">Registrar</p>
                                <p className="font-bold text-lg text-gray-900">{data.registrar || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Name Servers & Technical */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 h-full">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                                <Server size={20} className="text-gray-500" /> Name Servers
                            </h3>
                            <ul className="space-y-3">
                                {Array.isArray(data.nameServer) && data.nameServer.length > 0 ? data.nameServer.map((ns, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-mono bg-white p-3 rounded-xl border border-gray-200 text-sm break-all shadow-sm">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                        {ns}
                                    </li>
                                )) : (
                                    <li className="text-gray-500 italic">No Name Servers Found</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Raw Data Toggle */}
                {data.raw && (
                    <div className="border-t border-gray-200">
                        <details className="group">
                            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 hover:bg-gray-50 transition text-gray-700">
                                <span className="flex items-center gap-2">
                                    <Database size={18}/> View Raw Whois Record
                                </span>
                                <span className="transition group-open:rotate-180">▼</span>
                            </summary>
                            <div className="text-neutral-600 px-6 pb-6 animate-in slide-in-from-top-2">
                                <pre className="bg-gray-900 text-green-400 p-6 rounded-2xl text-xs overflow-x-auto font-mono leading-relaxed border border-gray-800 shadow-inner max-h-96 whitespace-pre-wrap">
                                    {typeof data.raw === 'object' ? JSON.stringify(data.raw, null, 2) : data.raw}
                                </pre>
                            </div>
                        </details>
                    </div>
                )}
            </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <section className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Perform a Whois Lookup?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose">
                <div className="p-6 bg-blue-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 text-sm font-bold shadow-sm">1</span>
                        Verify Domain Ownership
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Before buying a website or entering a business deal, use Whois to confirm the registered owner. 
                        This helps avoid scams and ensures you are dealing with the legitimate rights holder.
                    </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-600 text-sm font-bold shadow-sm">2</span>
                        Check Expiry Dates
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        A domain's expiry date is public information. Use this tool to monitor when a domain you want might become available (drop catching) 
                        or to ensure your own domains are renewed on time.
                    </p>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 text-sm font-bold shadow-sm">3</span>
                        Identify Registrars
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Forgot where you bought your domain? The Whois record clearly lists the "Registrar" (e.g., GoDaddy, Namecheap), 
                        so you know where to log in to manage your DNS settings.
                    </p>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 text-sm font-bold shadow-sm">4</span>
                        Investigate Cybercrime
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
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