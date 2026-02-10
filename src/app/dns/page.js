"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Server, Shield, Globe, Activity, Loader2, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function DnsPage() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Advanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify DNS Record Checker',
    applicationCategory: 'NetworkTool',
    operatingSystem: 'Web',
    description: 'Free DNS propagation tool. Check A, MX, NS, CNAME, and TXT records globally. Debug website connectivity and email issues.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const checkDns = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      // NOTE: Ensure your /api/dns route is working or replace with external API
      const response = await axios.get(`/api/dns?domain=${domain}&type=${recordType}`);
      
      if(response.data.error) {
        setError(response.data.error);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError('Failed to fetch DNS records. Domain might be invalid.');
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Activity size={12} className="mr-1" /> Network Tools
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                DNS Record Checker
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Instantly check A, MX, NS, CNAME, and TXT records. 
                Verify if your domain points to the right server and if email is configured correctly.
            </p>
        </div>

        {/* Search & Filter Box */}
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-purple-100 border border-purple-50 flex flex-col md:flex-row gap-4 mb-12 relative z-10">
            
            {/* Dropdown for Record Type */}
            <div className="md:w-1/4">
                <select 
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value)}
                    className="w-full h-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                >
                    <option value="A">A Record (IP)</option>
                    <option value="MX">MX Record (Email)</option>
                    <option value="NS">NS (Nameserver)</option>
                    <option value="CNAME">CNAME (Alias)</option>
                    <option value="TXT">TXT (Verify)</option>
                    <option value="AAAA">AAAA (IPv6)</option>
                </select>
            </div>

            {/* Input Box */}
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com)" 
                    className="w-full h-full p-4 pl-6 border border-gray-200 rounded-xl outline-none text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkDns()}
                />
            </div>

            {/* Button */}
            <button 
                onClick={checkDns} 
                disabled={loading}
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 md:w-auto w-full shadow-lg shadow-purple-200 disabled:opacity-70"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* Error State */}
        {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center gap-3 mb-8 max-w-3xl mx-auto">
                <AlertCircle size={20} /> {error}
            </div>
        )}

        {/* Results Display */}
        {data && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
                <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Globe size={20} className="text-purple-600"/> 
                        <span className="font-bold text-gray-900 text-lg">{domain}</span>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-200">
                        {recordType} Records
                    </span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-5 font-medium w-16 text-center">#</th>
                                <th className="p-5 font-medium">Record Value / Destination</th>
                                {recordType === 'MX' && <th className="p-5 font-medium w-32">Priority</th>}
                                <th className="p-5 font-medium w-32 text-center">TTL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {data.records && data.records.length > 0 ? data.records.map((rec, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition group">
                                    <td className="p-5 text-gray-400 text-center font-mono">{index + 1}</td>
                                    <td className="p-5 font-mono text-gray-800 font-medium break-all">
                                        {/* Handle different API response structures */}
                                        {typeof rec === 'object' ? (rec.address || rec.exchange || rec.data || rec.txt || JSON.stringify(rec)) : rec}
                                    </td>
                                    {recordType === 'MX' && (
                                        <td className="p-5 font-mono text-purple-600 font-bold">
                                            {rec.priority || 'N/A'}
                                        </td>
                                    )}
                                    <td className="p-5 text-center text-gray-400 font-mono">
                                        {rec.ttl || 'Auto'}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-gray-500">
                                        <AlertCircle className="mx-auto mb-2 opacity-20" size={32}/>
                                        No {recordType} records found for this domain.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* ✅ Human Written SEO Content */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-purple max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding DNS Records</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                <div className="flex gap-4">
                    <div className="mt-1"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">A</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">A Record (Address)</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            This is the most common record. It points your domain (e.g., example.com) to the IP address of the server hosting your website. If this is wrong, your site won't load.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mt-1"><div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xs">MX</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">MX Record (Mail Exchange)</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Controls where your emails are delivered (e.g., to Gmail or Outlook). It uses a "Priority" system to determine which server to try first.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mt-1"><div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xs">NS</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">NS Record (Nameserver)</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Delegates a DNS zone to use the given authoritative name servers. This essentially tells the internet "who is managing this domain's settings".
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mt-1"><div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-bold text-xs">TXT</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">TXT Record (Text)</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Used for verification (Google Search Console), security (SPF, DKIM for email), and other arbitrary data. It doesn't affect how the website loads.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <HelpCircle size={18}/> What is DNS Propagation?
                </h3>
                <p className="text-yellow-700 text-sm">
                    When you change your DNS records, it can take anywhere from a few minutes to 48 hours for the changes to update worldwide. 
                    This delay is called "DNS Propagation". ISPs cache old records to speed up browsing, and they need time to clear this cache.
                </p>
            </div>
        </section>

      </div>
    </div>
  );
}