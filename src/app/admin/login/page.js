"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, User, KeyRound, ArrowRight, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // ✅ अब पासवर्ड चेक करने का काम ब्राउज़र की जगह सर्वर (API) करेगा
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin/dashboard');
        router.refresh(); // Middleware को अपडेट करने के लिए
      } else {
        setError(data.message || 'ACCESS DENIED: Invalid credentials');
      }
    } catch (err) {
      setError('SYSTEM ERROR: Secure Connection Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center text-green-500 mb-4 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
            <Terminal size={52} strokeWidth={1.5} />
        </div>
        <h2 className="text-center text-3xl font-black text-green-500 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">
          System_Login
        </h2>
        <p className="mt-2 text-center text-sm text-green-700 uppercase tracking-widest">
          Secure NameDotify Server
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#111] py-8 px-4 shadow-[0_0_20px_rgba(34,197,94,0.1)] border border-green-500/30 sm:rounded-none sm:px-10 relative before:absolute before:inset-0 before:border-l-2 before:border-r-2 before:border-green-500/50 before:pointer-events-none">
          
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
                <div className="bg-red-950/50 text-red-500 p-3 rounded-none text-sm font-bold text-center border border-red-500/50 flex justify-center items-center gap-2 animate-pulse">
                    <ShieldAlert size={16} /> {error}
                </div>
            )}

            <div>
              <label className="block text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                &gt; USER_ID
              </label>
              <div className="mt-1 relative shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-green-700" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus:ring-1 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-green-900/50 py-3 bg-[#050505] text-green-400 placeholder-green-900 outline-none border transition-all"
                  placeholder="Enter admin email..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                &gt; PASSWORD
              </label>
              <div className="mt-1 relative shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-4 w-4 text-green-700" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-1 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-green-900/50 py-3 bg-[#050505] text-green-400 placeholder-green-900 outline-none border transition-all tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-green-500 text-sm font-bold text-black bg-green-500 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] disabled:opacity-50 focus:outline-none transition-all uppercase tracking-widest"
              >
                {isLoading ? 'Decrypting...' : 'Execute'} <ArrowRight size={18} />
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}