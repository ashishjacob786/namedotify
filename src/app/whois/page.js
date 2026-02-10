"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Database, Calendar, Server, Shield, Loader2 } from 'lucide-react';

export default function WhoisPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupWhois = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/whois?domain=${domain}`);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch Whois data. Please check the domain name.');
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
                <Database className="text-blue-600 w-10 h-10" /> Whois Lookup
            </h1>
            <p className="text-gray-600">Find out who owns a domain, when it expires, and where it's hosted.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2 mb-8">
            <input 
                type="text" 
                placeholder="Enter domain (e.g. google.com)" 
                className="flex-1 p-3 outline-none text-lg"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookupWhois()}
            />
            <button 
                onClick={lookupWhois} 
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* Results Area */}
        {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

        {data && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gray-50 p-4 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center">
                    <span>Results for {domain}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Key Info Cards */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Created On</p>
                                <p className="font-medium">{data.creationDate || data.creationDateRaw || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-red-500 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Expires On</p>
                                <p className="font-medium">{data.registryExpiryDate || data.expiryDate || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Registrar</p>
                                <p className="font-medium">{data.registrar || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Name Servers */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                            <Server size={16} /> Name Servers
                        </h3>
                        <ul className="space-y-1 text-sm">
                            {Array.isArray(data.nameServer) ? data.nameServer.map((ns, i) => (
                                <li key={i} className="text-gray-700 font-mono">{ns}</li>
                            )) : <li className="text-gray-700 font-mono">{data.nameServer || 'N/A'}</li>}
                        </ul>
                    </div>
                </div>

                {/* Raw Data Toggle (Optional Details) */}
                <div className="p-6 border-t border-gray-100">
                    <h3 className="font-semibold mb-2">Raw Data</h3>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto h-64">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}