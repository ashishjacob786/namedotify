"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Key, RefreshCw, Copy, CheckCircle, ShieldCheck, Settings, Lock, AlertTriangle, Unlock, FileKey } from 'lucide-react';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0); // 0-4 scale

  // ✅ 1. Advanced JSON-LD Schema (SoftwareApp + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NameDotify Strong Password Generator",
        "operatingSystem": "Web",
        "applicationCategory": "SecurityApplication",
        "url": "https://namedotify.com/password",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Generate secure, random, and uncrackable passwords instantly. Protect your accounts from brute-force attacks."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this password generator safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our password generator runs locally in your browser. No passwords are ever sent to our servers."
            }
          },
          {
            "@type": "Question",
            "name": "What is the recommended password length?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Security experts recommend a minimum length of 12-16 characters with a mix of letters, numbers, and symbols."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://namedotify.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Password Generator",
            "item": "https://namedotify.com/password"
          }
        ]
      }
    ]
  };

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') return;

    let generatedPassword = '';
    // Use crypto.getRandomValues for better security if available
    const array = new Uint32Array(length);
    if (typeof window !== 'undefined' && window.crypto) {
        window.crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
            generatedPassword += charset[array[i] % charset.length];
        }
    } else {
        // Fallback
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (pass.length > 20) score = 5; // Maximum strength
    setStrength(Math.min(score, 4)); // Cap at 4 (0-4 index)
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Uncrackable'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-teal-500', 'bg-green-600'];

  return (
    // ✅ UI: Consistent Padding
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>Strong Random Password Generator (100% Secure) | NameDotify.com</title>
      <meta name="description" content="Generate highly secure, random passwords instantly. Protect your accounts from hackers with our free uncrackable password tool." />
      <meta name="keywords" content="password generator, random password, secure password maker, strong password tool, password security" />
      
      {/* ✅ 3. Open Graph Tags */}
      <meta property="og:title" content="Strong Random Password Generator | NameDotify.com" />
      <meta property="og:description" content="Create uncrackable passwords in seconds. 100% Secure & Client-Side." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://namedotify.com/password" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wide mb-6 border border-teal-200">
                <ShieldCheck size={14} className="mr-2" /> Cyber Security Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Random Password <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500">Generator</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Create highly secure, random passwords to protect your digital identity. 
                Defend against <span className="font-bold text-gray-800">brute-force attacks</span> and credential stuffing.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            
            {/* Left: Controls */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-lg shadow-teal-50/50 border border-teal-50 h-fit">
                <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b border-gray-100 pb-4">
                    <Settings size={20} className="text-teal-600" /> Configuration
                </div>

                {/* Length Slider */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-4 flex justify-between items-center">
                        Length <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg text-lg font-mono">{length}</span>
                    </label>
                    <input 
                        type="range" 
                        min="6" max="64" 
                        value={length} 
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-bold">
                        <span>6</span>
                        <span>32</span>
                        <span>64</span>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition">
                        <span className="text-gray-700 font-medium group-hover:text-teal-600 transition">Uppercase (A-Z)</span>
                        <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 accent-teal-600" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition">
                        <span className="text-gray-700 font-medium group-hover:text-teal-600 transition">Lowercase (a-z)</span>
                        <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 accent-teal-600" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition">
                        <span className="text-gray-700 font-medium group-hover:text-teal-600 transition">Numbers (0-9)</span>
                        <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 accent-teal-600" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition">
                        <span className="text-gray-700 font-medium group-hover:text-teal-600 transition">Symbols (!@#$)</span>
                        <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 accent-teal-600" />
                    </label>
                </div>
            </div>

            {/* Right: Display */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Password Box */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 relative group transition hover:border-teal-300 hover:shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Secure Password</p>
                         <div className="flex items-center gap-3">
                             <div className="flex gap-1.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className={`w-10 h-2 rounded-full transition-all duration-500 ${i <= strength ? strengthColors[strength] : 'bg-gray-100'}`}></div>
                                ))}
                             </div>
                             <span className={`text-xs font-bold uppercase ${strengthColors[strength].replace('bg-', 'text-')}`}>{strengthLabels[strength]}</span>
                         </div>
                    </div>
                    
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-8 break-all relative">
                        <h2 className="text-2xl md:text-4xl font-mono text-gray-800 tracking-wider break-all leading-relaxed text-center font-bold">
                            {password}
                        </h2>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                            onClick={generatePassword}
                            className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            <RefreshCw size={20} /> Regenerate
                        </button>
                        <button 
                            onClick={copyToClipboard}
                            className={`${copied ? 'bg-green-600 border-green-600' : 'bg-teal-600 border-teal-600'} text-white border-2 px-6 py-4 rounded-xl font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-teal-100 transform active:scale-95`}
                        >
                            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                            {copied ? 'Copied to Clipboard' : 'Copy Password'}
                        </button>
                    </div>
                </div>

                {/* Security Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <Lock size={18} /> Enable 2FA
                        </h3>
                        <p className="text-blue-800 text-sm leading-relaxed">
                            A strong password isn't enough. Always enable <strong>Two-Factor Authentication (2FA)</strong> on critical accounts like Email and Banking.
                        </p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                        <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                            <FileKey size={18} /> Use a Manager
                        </h3>
                        <p className="text-purple-800 text-sm leading-relaxed">
                            Don't memorize passwords. Use a secure <strong>Password Manager</strong> (like Bitwarden or 1Password) to generate unique passwords for every site.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-teal max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why You Need a Strong Password Generator?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="flex flex-col gap-3 p-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm"><AlertTriangle size={24}/></div>
                    <h3 className="text-xl font-bold text-gray-900">Stop Brute Force</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Hackers use software to guess billions of passwords per second. A 16-character random password takes <strong>trillions of years</strong> to crack.
                    </p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm"><Unlock size={24}/></div>
                    <h3 className="text-xl font-bold text-gray-900">Prevent Stuffing</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        If you use the same password for Facebook and your Bank, a leak in one exposes both. Using a random generator ensures every account has a unique key.
                    </p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-teal-50 rounded-2xl border border-teal-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm"><ShieldCheck size={24}/></div>
                    <h3 className="text-xl font-bold text-gray-900">True Randomness</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Humans are bad at being random. We pick birthdays or pet names. Computers generate mathematically random strings that have no patterns.
                    </p>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-100 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What makes a password strong?</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li><strong>Length is King:</strong> A 15-character password of just letters is often stronger than an 8-character password with symbols. Aim for 16+ characters.</li>
                    <li><strong>Complexity:</strong> Mix Uppercase, Lowercase, Numbers, and Symbols to expand the "search space" for attackers.</li>
                    <li><strong>Unpredictability:</strong> Avoid common words like "Password", "Admin", or "Welcome".</li>
                </ul>
            </div>
        </article>

      </div>
    </div>
  );
}