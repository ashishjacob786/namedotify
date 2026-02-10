"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Server, Shield, Globe, Activity, Loader2, AlertCircle } from 'lucide-react';

export default function DnsPage() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDns = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/dns?domain=${domain}&type=${recordType}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch DNS records.');
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
                <Activity className="text-purple-600 w-10 h-10" /> DNS Checker
            </h1>
            <p className="text-gray-600">Check DNS records (A, MX, NS, CNAME, TXT) for any domain instantly.</p>
        </div>

        {/* Search & Filter Box */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 mb-8">
            
            {/* Dropdown for Record Type */}
            <select 
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="A">A Record (IP Address)</option>
                <option value="MX">MX Record (Email)</option>
                <option value="NS">NS Record (Nameserver)</option>
                <option value="CNAME">CNAME Record (Alias)</option>
                <option value="TXT">TXT Record (Text/Verification)</option>
                <option value="AAAA">AAAA Record (IPv6)</option>
            </select>

            {/* Input Box */}
            <input 
                type="text" 
                placeholder="Enter domain (e.g. namedotify.com)" 
                className="flex-1 p-3 border border-gray-200 rounded-lg outline-none text-lg focus:border-blue-500 transition"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkDns()}
            />

            {/* Button */}
            <button 
                onClick={checkDns} 
                disabled={loading}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* Results Display */}
        {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
                <AlertCircle size={20} /> {error}
            </div>
        )}

        {data && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gray-50 p-4 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <Globe size={18} className="text-purple-500"/> 
                        {domain} 
                        <span className="text-gray-400">/</span> 
                        <span className="text-blue-600">{data.type} Records</span>
                    </span>
                </div>
                
                <div className="p-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 border-b">#</th>
                                <th className="p-4 border-b">Record Value / Destination</th>
                                {data.type === 'MX' && <th className="p-4 border-b">Priority</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {Array.isArray(data.records) ? data.records.map((rec, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-400 w-16">{index + 1}</td>
                                    <td className="p-4 font-mono text-gray-800">
                                        {typeof rec === 'object' && rec.exchange ? rec.exchange : 
                                         typeof rec === 'object' && Array.isArray(rec) ? rec.join(' ') :
                                         rec}
                                    </td>
                                    {data.type === 'MX' && (
                                        <td className="p-4 font-mono text-blue-600 font-bold w-32">
                                            {rec.priority}
                                        </td>
                                    )}
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-500">No standard records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}