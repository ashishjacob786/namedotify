"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateBatch } from '@/utils/megaGenerator';

export default function FontGenerator() {
  // State Variables
  const [input, setInput] = useState('NameDotify');
  const [fonts, setFonts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [previewText, setPreviewText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Ref for Debounce Timer
  const typingTimeoutRef = useRef(null);

  // 1. INPUT CHANGE HANDLER (Lag Fix)
  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setInput(newVal);
    setIsTyping(true);

    // Purana timer clear karo
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Naya timer set karo (300ms delay)
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

  // 3. INFINITE SCROLL (Load More)
  const loadMore = useCallback(() => {
    if (isTyping) return; // Typing karte waqt load mat karo
    
    const nextBatch = generateBatch(input || 'NameDotify', offset, 30);
    setFonts((prev) => [...prev, ...nextBatch]);
    setOffset((prev) => prev + 30);
  }, [input, offset, isTyping]);

  // Scroll Listener
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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 md:p-8">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Input & List */}
        <div className="flex-1 min-w-0">
          
          {/* Sticky Input Box */}
          <div className="sticky top-4 z-40 bg-white p-3 rounded-2xl shadow-lg border border-gray-200 mb-8">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your text here..."
              className="w-full text-xl md:text-3xl font-bold p-4 rounded-xl outline-none text-gray-900 placeholder:text-gray-300 bg-transparent"
            />
            {isTyping && <p className="text-xs text-blue-500 font-medium px-4 pt-1 animate-pulse">Generating Styles...</p>}
          </div>

          {/* Font List */}
          <div className="space-y-4">
            {fonts.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Text Display */}
                <div className="flex-1 min-w-0">
                  <p className="text-lg sm:text-2xl break-all font-medium text-gray-900 leading-relaxed">
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
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleCopy(item.text, item.id)}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold text-white shadow-sm transition-all active:scale-95 ${
                      copiedId === item.id 
                        ? 'bg-green-500' 
                        : 'bg-black hover:bg-gray-800'
                    }`}
                  >
                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Loading Indicator */}
          <div className="h-20 flex items-center justify-center mt-8 text-gray-400 text-sm">
            Scroll for more magic ✨
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Preview (Mobile Mockup) */}
        <div className="hidden lg:block w-[380px] shrink-0">
          <div className="sticky top-24">
            <div className="bg-black rounded-[3rem] p-3 shadow-2xl ring-4 ring-gray-100">
              <div className="bg-white rounded-[2.5rem] overflow-hidden h-[700px] flex flex-col relative">
                
                {/* Phone Status Bar */}
                <div className="w-full h-8 bg-white z-10 flex justify-center pt-2">
                   <div className="w-24 h-5 bg-black rounded-b-xl"></div>
                </div>
                
                {/* Instagram Profile Header */}
                <div className="mt-4 px-6 pb-4 border-b border-gray-100">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[3px] rounded-full">
                      <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${input}&background=random`} alt="profile" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-lg">{input || 'Your Name'}</h3>
                    <p className="text-gray-500 text-sm mb-4">@design_king</p>
                  </div>
                  
                  {/* LIVE PREVIEW BOX */}
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-left min-h-[100px]">
                    <p className="text-xs font-bold text-gray-400 mb-1 uppercase">Bio Preview</p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {previewText || "Click 'Preview' on any font to see it here!"}
                    </p>
                  </div>

                  {/* Fake Buttons */}
                  <div className="flex gap-2 mt-4">
                    <div className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-semibold text-center text-gray-700">Edit Profile</div>
                    <div className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-semibold text-center text-gray-700">Share</div>
                  </div>
                </div>

                {/* Grid placeholder */}
                <div className="flex-1 bg-gray-50 grid grid-cols-3 gap-[1px] mt-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white aspect-square"></div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}