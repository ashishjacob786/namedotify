"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateBatch } from '@/utils/megaGenerator';
import { Copy, RefreshCw, Type, Smartphone, CheckCircle, Sparkles, Zap, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function FontGenerator() {
  // State Variables
  const [input, setInput] = useState('NameDotify');
  const [fonts, setFonts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [previewText, setPreviewText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Ref for Debounce
  const typingTimeoutRef = useRef(null);

  // ✅ 1. Advanced JSON-LD Schema (SoftwareApp + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NameDotify Fancy Font Generator",
        "operatingSystem": "Web",
        "applicationCategory": "DesignApplication",
        "url": "https://namedotify.com/fonts-generator",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Generate 100+ stylish, cool, and fancy fonts for Instagram, Twitter, and TikTok bios. Instant copy & paste font changer."
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
            "name": "Font Generator",
            "item": "https://namedotify.com/fonts-generator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to change fonts on Instagram Bio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply type your text in our generator, pick a style you like, click copy, and paste it into your Instagram profile bio."
            }
          },
          {
            "@type": "Question",
            "name": "Are these fonts free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all generated fonts are Unicode characters which are free to use on social media, games, and messaging apps."
            }
          }
        ]
      }
    ]
  };

  // 1. INPUT CHANGE HANDLER (Lag Fix)
  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setInput(newVal);
    setIsTyping(true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      const initialBatch = generateBatch(newVal || 'NameDotify', 0, 30);
      setFonts(initialBatch);
      setOffset(30);
      setPreviewText(initialBatch[0]?.text || '');
      setIsTyping(false);
    }, 300);
  };

  // 2. INITIAL LOAD
  useEffect(() => {
    const initialBatch = generateBatch('NameDotify', 0, 30);
    setFonts(initialBatch);
    setOffset(30);
    setPreviewText(initialBatch[0]?.text || '');
  }, []);

  // 3. INFINITE SCROLL
  const loadMore = useCallback(() => {
    if (isTyping) return;
    const nextBatch = generateBatch(input || 'NameDotify', offset, 30);
    setFonts((prev) => [...prev, ...nextBatch]);
    setOffset((prev) => prev + 30);
  }, [input, offset, isTyping]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  // 4. COPY FUNCTION
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    // ✅ UI: Added pt-28 for Navbar spacing
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>Free Fancy Font Generator (Copy & Paste) | NameDotify.com</title>
      <meta name="description" content="Generate 10000+ stylish, cool, and fancy fonts for Instagram, Twitter, and TikTok bios. Instant copy & paste font changer tool." />
      <meta name="keywords" content="font generator, fancy text generator, instagram font changer, cool fonts copy paste, stylish text maker, bio fonts" />
      
      {/* ✅ 3. Open Graph Tags */}
      <meta property="og:title" content="Fancy Font Generator | NameDotify.com" />
      <meta property="og:description" content="Copy & paste stylish fonts for your Instagram Bio." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://namedotify.com/fonts-generator" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-bold uppercase tracking-wide mb-6 border border-fuchsia-200">
                <Type size={14} className="mr-2" /> Style Your Text
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Fancy Font <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-500">Generator</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Type your text and generate hundreds of <span className="font-bold text-gray-800">cool, stylish, and aesthetic fonts</span> for your Instagram Bio, Twitter, and Gaming profiles.
            </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 mb-20">
            
            {/* LEFT COLUMN: Input & List */}
            <div className="flex-1 min-w-0">
            
                {/* Sticky Input Box */}
                <div className="sticky top-28 z-40 bg-white p-2 rounded-3xl shadow-xl shadow-fuchsia-100/50 border border-fuchsia-100 mb-8 transition-all">
                    <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your text here..."
                    className="w-full text-xl md:text-3xl font-bold p-5 rounded-2xl outline-none text-gray-900 placeholder:text-gray-300 bg-white focus:ring-4 focus:ring-fuchsia-50 transition"
                    />
                    {isTyping && <div className="absolute right-6 top-1/2 -translate-y-1/2 text-fuchsia-500 font-medium animate-pulse text-sm">Generating...</div>}
                </div>

                {/* Font List */}
                <div className="space-y-4">
                    {fonts.map((item, index) => (
                    <div 
                        key={`${item.id}-${index}`} 
                        className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-fuchsia-200 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                        {/* Text Display */}
                        <div className="flex-1 min-w-0 w-full">
                            <p className="text-lg sm:text-2xl break-all font-medium text-gray-800 leading-relaxed group-hover:text-fuchsia-900 transition">
                                {item.text}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">
                                {item.styleName || 'GEN STYLE'}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            <button
                                onClick={() => setPreviewText(item.text)}
                                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gray-50 text-gray-600 text-sm font-bold hover:bg-fuchsia-50 hover:text-fuchsia-600 transition"
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => handleCopy(item.text, item.id)}
                                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                                copiedId === item.id 
                                    ? 'bg-green-500 shadow-green-200' 
                                    : 'bg-gray-900 hover:bg-fuchsia-600 shadow-gray-200'
                                }`}
                            >
                                {copiedId === item.id ? <CheckCircle size={16}/> : <Copy size={16}/>}
                                {copiedId === item.id ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
                
                {/* Bottom Loading Indicator */}
                <div className="h-24 flex flex-col items-center justify-center mt-8 text-gray-400 text-sm gap-2">
                    <Sparkles className="animate-spin-slow text-fuchsia-300" size={24}/>
                    Scroll for more styles
                </div>
            </div>

            {/* RIGHT COLUMN: Sticky Preview (Mobile Mockup) */}
            <div className="hidden lg:block w-[380px] shrink-0">
                <div className="sticky top-32">
                    <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl ring-4 ring-gray-100 border-4 border-gray-200">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden h-[720px] flex flex-col relative">
                        
                        {/* Phone Status Bar */}
                        <div className="w-full h-8 bg-white z-10 flex justify-center pt-2 absolute top-0 left-0">
                            <div className="w-28 h-6 bg-gray-900 rounded-b-xl"></div>
                        </div>
                        
                        {/* Instagram Profile Header */}
                        <div className="mt-12 px-6 pb-4 border-b border-gray-100">
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[3px] rounded-full">
                                    <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-gray-50">
                                        <span className="text-2xl font-bold text-gray-400">IMG</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center mb-6">
                                <h3 className="font-bold text-lg text-gray-900">{input.length > 20 ? input.substring(0, 20) + '...' : (input || 'Your Name')}</h3>
                                <p className="text-gray-500 text-xs font-semibold bg-gray-100 inline-block px-2 py-1 rounded-md mt-1">Professional Creator</p>
                            </div>
                            
                            {/* LIVE PREVIEW BOX */}
                            <div className="bg-fuchsia-50 border border-fuchsia-100 p-4 rounded-2xl text-left min-h-[120px] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-2 opacity-50"><Instagram size={16} className="text-fuchsia-400"/></div>
                                <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Bio Preview</p>
                                <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed font-medium">
                                    {previewText || "Click 'Preview' on any font style to see how it looks here! ✨"}
                                </p>
                            </div>

                            {/* Fake Buttons */}
                            <div className="flex gap-2 mt-4">
                                <div className="flex-1 bg-gray-100 py-2.5 rounded-lg text-sm font-bold text-center text-gray-700">Edit Profile</div>
                                <div className="flex-1 bg-gray-100 py-2.5 rounded-lg text-sm font-bold text-center text-gray-700">Share Profile</div>
                            </div>
                        </div>

                        {/* Grid placeholder */}
                        <div className="flex-1 bg-gray-50 grid grid-cols-3 gap-[1px] mt-1 overflow-y-auto no-scrollbar">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="bg-white aspect-square relative group">
                                    {i === 4 && <div className="absolute inset-0 flex items-center justify-center text-gray-200"><MessageCircle size={24}/></div>}
                                </div>
                            ))}
                        </div>

                    </div>
                    </div>
                </div>
            </div>

        </div>

        {/* --- SEO ARTICLE --- */}
        <article className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100 prose prose-fuchsia prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Change Fonts on Instagram & Social Media?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="flex flex-col gap-3 p-6 bg-fuchsia-50 rounded-2xl border border-fuchsia-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-fuchsia-600 shadow-sm"><Instagram size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">Instagram Bio</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Make your profile stand out with bold, cursive, or typewriter fonts. Just copy and paste into your settings.</p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm"><Twitter size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">Twitter Name</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Catch more attention in the feed. Use a stylish font for your display name or tweets.</p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm"><MessageCircle size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">WhatsApp Status</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Surprise your friends with unique text styles in your WhatsApp About section or messages.</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">How does this Font Generator work?</h3>
            <p className="text-gray-600">
                Computers use a standard set of characters called Unicode. This tool simply converts your normal text into compatible 
                mathematical symbols, alphabets, and characters from the Unicode standard that look like stylish fonts. 
                That's why you can copy and paste them where normal fonts (like Arial or Times New Roman) don't work!
            </p>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Zap size={20} className="text-yellow-500"/> Pro Tip
                </h3>
                <p className="text-gray-700 text-sm">
                    Don't overdo it! Screen readers (for visually impaired users) might have trouble reading some fancy fonts. 
                    Use them for headings or short bios, but keep important information in plain text.
                </p>
            </div>
        </article>

      </div>
    </div>
  );
}