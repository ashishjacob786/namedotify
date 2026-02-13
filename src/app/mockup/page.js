"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import {
  Download, Upload, Image as ImageIcon,
  Smartphone, Tablet, Monitor, Laptop,
  Palette, Rotate3D, X, Move, ZoomIn, 
  Layers, Type, RefreshCw, CheckCircle, 
  Maximize2, HelpCircle, ChevronDown
} from 'lucide-react';

// --- PRESETS ---
const PRESET_GRADS = [
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
  'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
  'conic-gradient(from 180deg at 50% 50%, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
  '#ffffff',
  'transparent'
];

export default function MockupStudio() {

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('device'); // device, content, style
  
  // Content
  const [image, setImage] = useState(null);
  const [urlText, setUrlText] = useState('namedotify.com');
  const [imgZoom, setImgZoom] = useState(100);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  
  // Frame
  const [frameType, setFrameType] = useState('macos-dark'); 
  const [frameScale, setFrameScale] = useState(50); // Default 50%
  
  // Background
  const [bgType, setBgType] = useState('preset'); // preset, custom, image
  const [bgStyle, setBgStyle] = useState(PRESET_GRADS[1]);
  const [customColors, setCustomColors] = useState(['#FF3CAC', '#784BA0']);
  const [customBgImg, setCustomBgImg] = useState(null);
  const [padding, setPadding] = useState(60);

  // 3D & Effects
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotate: 0 });
  const [borderRadius, setBorderRadius] = useState(12);

  const [loading, setLoading] = useState(false);
  const mockupRef = useRef(null);
  const fileInputRef = useRef(null);
  const bgInputRef = useRef(null);

  // --- SEO SCHEMA (JSON-LD) ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Mockup Studio',
    url: 'https://namedotify.com/mockup',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web Browser',
    description: 'Free online screenshot beautifier and 3D mockup generator. Create iPhone, macOS, and Windows mockups instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: '3D Tilt, High Resolution Export, Custom Backgrounds, iPhone 15 Frames'
  };

  // --- EFFECT: Custom Gradient Sync ---
  useEffect(() => {
    if (bgType === 'custom') {
      setBgStyle(`linear-gradient(135deg, ${customColors[0]}, ${customColors[1]})`);
    }
  }, [customColors, bgType]);

  // --- HANDLERS ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          setCustomBgImg(e.target.result);
          setBgType('image'); // Switch to image mode automatically
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async (format) => {
    if (!mockupRef.current) return;
    setLoading(true);
    setTimeout(async () => {
        try {
            const scale = 2; 
            const dataUrl = format === 'png'
              ? await toPng(mockupRef.current, { pixelRatio: scale })
              : await toJpeg(mockupRef.current, { quality: 0.95, pixelRatio: scale });
            download(dataUrl, `namedotify-mockup.${format}`);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
    }, 100);
  };

  // --- DEVICE STYLES HELPER ---
  const getDeviceStyles = () => {
      const base = { 
          transition: 'all 0.3s ease', 
          position: 'relative', 
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden' 
      };

      if (frameType === 'iphone') {
          return { ...base, borderRadius: '40px', border: '12px solid #1f2937', aspectRatio: '9/19.5' };
      }
      if (frameType === 'tablet') {
          return { ...base, borderRadius: '24px', border: '12px solid #1f2937', aspectRatio: '4/3' };
      }
      // Windows / Mac
      return { ...base, borderRadius: `${borderRadius}px`, width: '100%', aspectRatio: '16/10' };
  };

  const isMobile = frameType === 'iphone' || frameType === 'tablet';

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pt-24 pb-0 md:pb-20">
      
      {/* ✅ SEO TAGS INJECTION */}
      <title>Free 3D Mockup Generator & Screenshot Beautifier | NameDotify</title>
      <meta name="description" content="Turn boring screenshots into viral 3D mockups. Add iPhone 15, macOS, and Windows frames instantly. Free, no watermark, browser-based tool." />
      <meta property="og:title" content="NameDotify Mockup Studio - Free Screenshot Beautifier" />
      <meta property="og:description" content="Create stunning device mockups for your social media and landing pages in seconds." />
      <meta name="keywords" content="screenshot mockup, 3d device generator, macbook mockup free, iphone frame generator, twitter image maker" />
      
      {/* ✅ SCHEMA INJECTION */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-[1800px] mx-auto px-0 md:px-6">
        
        {/* --- HEADER (Desktop Only) --- */}
        <div className="hidden md:flex justify-between items-center mb-6 px-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Layers className="text-blue-600"/> Mockup Studio
            </h1>
            <button 
                onClick={() => handleDownload('png')}
                disabled={loading}
                className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition active:scale-95"
            >
                {loading ? <RefreshCw className="animate-spin" size={18}/> : <Download size={18}/>}
                Download
            </button>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 h-[100vh] lg:h-auto overflow-hidden lg:overflow-visible">
            
            {/* 1. LEFT CONTROLS (Sticky Sidebar) */}
            <div className="w-full lg:w-[400px] bg-white border-t lg:border border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] lg:shadow-sm z-20 order-2 lg:order-1 flex flex-col rounded-t-3xl lg:rounded-3xl lg:sticky lg:top-28 lg:h-[calc(100vh-140px)]">
                
                {/* Mobile Header for Controls */}
                <div className="flex lg:hidden justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-sm text-gray-500">Editor Controls</span>
                    <button onClick={() => handleDownload('png')} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                         {loading ? '...' : 'Download'}
                    </button>
                </div>

                {/* TABS */}
                <div className="flex p-2 border-b border-gray-100 bg-gray-50/50">
                    {['device', 'content', 'style'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wide rounded-lg transition ${activeTab === tab ? 'bg-white text-blue-700 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* SCROLLABLE CONTROL AREA */}
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24 lg:pb-5">
                    
                    {/* --- TAB: DEVICE --- */}
                    {activeTab === 'device' && (
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Frame Style</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        {id: 'macos-dark', icon: Laptop, label: 'Mac Dark'},
                                        {id: 'macos-light', icon: Laptop, label: 'Mac Light'},
                                        {id: 'win', icon: Monitor, label: 'Windows'},
                                        {id: 'iphone', icon: Smartphone, label: 'iPhone'},
                                        {id: 'tablet', icon: Tablet, label: 'iPad'},
                                        {id: 'none', icon: Maximize2, label: 'None'},
                                    ].map((item) => (
                                        <button 
                                            key={item.id} 
                                            onClick={() => setFrameType(item.id)}
                                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-[10px] font-bold transition ${frameType === item.id ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
                                        >
                                            <item.icon size={16}/> {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-gray-100"/>
                            <div>
                                <div className="flex justify-between mb-2"><label className="text-xs font-bold text-gray-400 uppercase">Frame Size</label><span className="text-xs font-bold text-blue-600">{frameScale}%</span></div>
                                <input type="range" min="40" max="110" value={frameScale} onChange={(e) => setFrameScale(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-gray-900"/>
                            </div>

                             {/* 3D Tilt */}
                             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="flex justify-between mb-3">
                                    <label className="text-xs font-bold text-blue-800 uppercase flex items-center gap-1"><Rotate3D size={12}/> 3D Tilt</label>
                                    <button onClick={() => setTilt({x:0, y:0, rotate:0})} className="text-[10px] text-blue-600 font-bold hover:underline">Reset</button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 w-4">X</span>
                                        <input type="range" min="-45" max="45" value={tilt.x} onChange={(e) => setTilt({...tilt, x: Number(e.target.value)})} className="w-full h-1.5 bg-blue-200 rounded-lg cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 w-4">Y</span>
                                        <input type="range" min="-45" max="45" value={tilt.y} onChange={(e) => setTilt({...tilt, y: Number(e.target.value)})} className="w-full h-1.5 bg-blue-200 rounded-lg cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 w-4">R</span>
                                        <input type="range" min="-90" max="90" value={tilt.rotate} onChange={(e) => setTilt({...tilt, rotate: Number(e.target.value)})} className="w-full h-1.5 bg-blue-200 rounded-lg cursor-pointer accent-blue-600"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: CONTENT --- */}
                    {activeTab === 'content' && (
                        <div className="space-y-6">
                            <button onClick={() => fileInputRef.current.click()} className="w-full py-4 border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-100 transition flex flex-col items-center gap-1">
                                <Upload size={20}/>
                                {image ? 'Change Screenshot' : 'Upload Screenshot'}
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*"/>

                            {!isMobile && frameType !== 'none' && (
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Browser URL</label>
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3">
                                        <Type size={14} className="text-gray-400"/>
                                        <input type="text" value={urlText} onChange={(e) => setUrlText(e.target.value)} className="w-full py-2.5 bg-transparent text-sm outline-none font-medium" placeholder="namedotify.com"/>
                                    </div>
                                </div>
                            )}

                            <div className={!image ? 'opacity-50 pointer-events-none' : ''}>
                                <div className="flex justify-between items-center mb-4"><h4 className="text-xs font-bold text-gray-900 uppercase">Image Position</h4><button onClick={() => { setImgPos({x:0, y:0}); setImgZoom(100); }} className="text-[10px] text-blue-600 font-bold">Reset</button></div>
                                <div className="space-y-4">
                                    <div><div className="flex justify-between mb-1"><label className="text-[10px] font-bold text-gray-400">Zoom</label><span className="text-[10px]">{imgZoom}%</span></div><input type="range" min="100" max="250" value={imgZoom} onChange={(e) => setImgZoom(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-black"/></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-[10px] font-bold text-gray-400 mb-1 block">Pan X</label><input type="range" min="-200" max="200" value={imgPos.x} onChange={(e) => setImgPos({...imgPos, x: Number(e.target.value)})} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-black"/></div>
                                        <div><label className="text-[10px] font-bold text-gray-400 mb-1 block">Pan Y</label><input type="range" min="-200" max="200" value={imgPos.y} onChange={(e) => setImgPos({...imgPos, y: Number(e.target.value)})} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-black"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: STYLE (Appearance) --- */}
                    {activeTab === 'style' && (
                        <div className="space-y-6">
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                {['preset', 'custom', 'image'].map(t => (
                                    <button key={t} onClick={() => setBgType(t)} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition ${bgType === t ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}>{t}</button>
                                ))}
                            </div>

                            {/* 1. PRESETS */}
                            {bgType === 'preset' && (
                                <div className="grid grid-cols-5 gap-2">
                                    {PRESET_GRADS.map((g, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setBgStyle(g)} 
                                            className={`w-full aspect-square rounded-lg border hover:scale-105 transition shadow-sm ${bgStyle === g ? 'ring-2 ring-black' : 'border-gray-200'} ${g === 'transparent' ? 'checkerboard-bg-sm' : ''}`} 
                                            style={g !== 'transparent' ? { background: g } : {}}
                                            title={g === 'transparent' ? 'Transparent' : 'Gradient'}
                                        />
                                    ))}
                                    <div className="relative w-full aspect-square rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50"><input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => { setBgStyle(e.target.value); setBgType('preset'); }} /><Palette size={14} className="text-gray-400"/></div>
                                </div>
                            )}

                            {/* 2. CUSTOM GRADIENT */}
                            {bgType === 'custom' && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 border p-2 rounded-xl"><input type="color" value={customColors[0]} onChange={(e) => setCustomColors([e.target.value, customColors[1]])} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"/><span className="text-xs font-mono text-gray-500">{customColors[0]}</span></div>
                                    <div className="flex items-center gap-2 border p-2 rounded-xl"><input type="color" value={customColors[1]} onChange={(e) => setCustomColors([customColors[0], e.target.value])} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"/><span className="text-xs font-mono text-gray-500">{customColors[1]}</span></div>
                                </div>
                            )}

                            {/* 3. CUSTOM IMAGE (Restored) */}
                            {bgType === 'image' && (
                                <div className="space-y-3">
                                    <button onClick={() => bgInputRef.current.click()} className="w-full py-8 border-2 border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 flex flex-col items-center gap-2 transition">
                                        <ImageIcon size={24} className="opacity-50"/>
                                        {customBgImg ? 'Change Wallpaper' : 'Upload Background Image'}
                                    </button>
                                    <input type="file" ref={bgInputRef} onChange={handleBgUpload} className="hidden" accept="image/*"/>
                                    {customBgImg && (
                                        <button onClick={() => { setCustomBgImg(null); setBgType('preset'); }} className="text-[10px] text-red-500 hover:underline w-full text-center">Remove Image</button>
                                    )}
                                </div>
                            )}

                            {/* PADDING */}
                            <hr className="border-gray-100"/>
                            <div>
                                <div className="flex justify-between mb-2"><label className="text-xs font-bold text-gray-400 uppercase">Padding</label><span className="text-xs font-bold text-blue-600">{padding}px</span></div>
                                <input type="range" min="0" max="150" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"/>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. RIGHT PREVIEW AREA (Full Width Mobile, Right Side Desktop) */}
            <div className="lg:col-span-8 w-full order-1 lg:order-2 flex-1 lg:h-auto h-[45vh] lg:min-h-screen bg-[#e5e5e5] lg:rounded-3xl border border-gray-300 relative overflow-hidden flex items-center justify-center p-4 checkerboard-bg z-10">
                
                {/* Capture Area */}
                <div 
                    ref={mockupRef}
                    className="relative flex items-center justify-center overflow-hidden transition-all duration-300 shadow-xl"
                    style={{ 
                        background: bgType === 'image' && customBgImg ? `url(${customBgImg}) center/cover` : bgStyle,
                        padding: `${padding}px`,
                        minWidth: '800px', // High Res Capture
                        minHeight: '600px',
                    }}
                >
                    {/* TILT WRAPPER */}
                    <div 
                        style={{ 
                            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${tilt.rotate}deg) scale(${frameScale/100})`,
                            transition: 'transform 0.1s ease-out',
                            width: isMobile ? '320px' : '100%',
                        }}
                    >
                        {/* THE DEVICE FRAME CONTAINER */}
                        <div className="relative bg-white" style={getDeviceStyles()}>
                            
                            {/* --- WINDOWS HEADER --- */}
                            {frameType === 'win' && (
                                <div className="h-9 flex justify-between items-center bg-[#f3f3f3] border-b border-gray-300 select-none">
                                    <div className="px-4 text-[10px] text-gray-500">{urlText}</div>
                                    <div className="flex h-full">
                                        <div className="w-10 flex items-center justify-center"><div className="w-2.5 h-[1px] bg-black"></div></div>
                                        <div className="w-10 flex items-center justify-center"><div className="w-2.5 h-2.5 border border-black"></div></div>
                                        <div className="w-10 flex items-center justify-center hover:bg-red-500 hover:text-white"><X size={14}/></div>
                                    </div>
                                </div>
                            )}

                            {/* --- MACOS HEADER --- */}
                            {frameType.includes('macos') && (
                                <div className={`h-9 px-4 flex items-center gap-3 border-b ${frameType.includes('dark') ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-100'} select-none`}>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className={`flex-1 text-center text-[10px] font-medium opacity-50 ${frameType.includes('dark') ? 'text-white' : 'text-black'}`}>{urlText}</div>
                                </div>
                            )}

                            {/* --- IPHONE NOTCH --- */}
                            {frameType === 'iphone' && (
                                <div className="absolute top-2 w-full flex justify-center z-20 pointer-events-none">
                                    <div className="w-24 h-7 bg-black rounded-full shadow-sm"></div>
                                </div>
                            )}

                            {/* --- IMAGE CONTAINER --- */}
                            <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${frameType.includes('dark') ? 'bg-[#121212]' : 'bg-gray-100'}`}>
                                {image ? (
                                    <img 
                                        src={image} 
                                        alt="Preview"
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            transform: `scale(${imgZoom/100}) translate(${imgPos.x}px, ${imgPos.y}px)`,
                                            transition: 'transform 0.1s linear'
                                        }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 cursor-pointer p-10 text-center" onClick={() => fileInputRef.current.click()}>
                                        <ImageIcon size={48} className="mb-2 opacity-30"/>
                                        <span className="text-sm font-bold opacity-50">Upload Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* --- RICH SEO CONTENT (Below Everything) --- */}
        <div className="mt-20 lg:mt-32 max-w-4xl mx-auto px-4 pb-20">
            <article className="prose prose-blue max-w-none bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900">Professional Screenshot Mockup Generator</h2>
                <p className="lead">
                    Transform boring screenshots into viral social media assets. NameDotify's <strong>Mockup Studio</strong> is a free, browser-based tool designed for developers, indie hackers, and marketers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0"><Rotate3D/></div>
                        <div>
                            <h4 className="font-bold text-gray-900">3D Tilt & Perspective</h4>
                            <p className="text-sm text-gray-500">Rotate your images in X, Y, and Z axes. Create depth that makes your design pop on Twitter and LinkedIn.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0"><Layers/></div>
                        <div>
                            <h4 className="font-bold text-gray-900">Diverse Device Frames</h4>
                            <p className="text-sm text-gray-500">Choose from macOS Dark/Light, Windows 11, iPhone 15 Pro, and iPad frames. Automatically adds shadows and glare.</p>
                        </div>
                    </div>
                </div>

                <h3>Frequently Asked Questions</h3>
                <div className="space-y-4 not-prose mt-6">
                    <details className="group p-4 bg-gray-50 rounded-xl cursor-pointer">
                        <summary className="font-bold text-gray-900 flex justify-between items-center list-none">
                            Is this tool free? <ChevronDown className="group-open:rotate-180 transition"/>
                        </summary>
                        <p className="text-sm text-gray-600 mt-2">Yes! NameDotify Mockup Studio is 100% free. No watermarks, no sign-up required.</p>
                    </details>
                    <details className="group p-4 bg-gray-50 rounded-xl cursor-pointer">
                        <summary className="font-bold text-gray-900 flex justify-between items-center list-none">
                            Do you store my images? <ChevronDown className="group-open:rotate-180 transition"/>
                        </summary>
                        <p className="text-sm text-gray-600 mt-2">No. All processing happens in your browser. Your images never touch our servers.</p>
                    </details>
                </div>
            </article>
        </div>

      </div>
      
      {/* GLOBAL CSS */}
      <style jsx global>{`
        .checkerboard-bg {
          background-image: linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        .checkerboard-bg-sm {
           background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
           background-size: 10px 10px;
           background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
}