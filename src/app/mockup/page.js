"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import {
  Download, Upload, Image as ImageIcon,
  Smartphone, Tablet, Monitor, Laptop,
  Palette, Rotate3D, X, Move, ZoomIn, 
  Layers, Type, RefreshCw, CheckCircle, SmartphoneNfc
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
  const [activeTab, setActiveTab] = useState('device'); // device, content, appearance
  
  // 1. Content
  const [image, setImage] = useState(null);
  const [urlText, setUrlText] = useState('namedotify.com');
  const [imgZoom, setImgZoom] = useState(100);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  
  // 2. Device Frame
  const [frameType, setFrameType] = useState('macos-dark'); 
  const [frameScale, setFrameScale] = useState(90); // Default smaller
  
  // 3. Background
  const [bgType, setBgType] = useState('preset'); // preset, custom, image
  const [bgStyle, setBgStyle] = useState(PRESET_GRADS[1]);
  const [customColors, setCustomColors] = useState(['#FF3CAC', '#784BA0']);
  const [customBgImg, setCustomBgImg] = useState(null);
  const [padding, setPadding] = useState(60);

  // 4. 3D & Effects
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotate: 0 });
  const [shadow, setShadow] = useState('shadow-2xl');
  const [borderRadius, setBorderRadius] = useState(12);

  const [loading, setLoading] = useState(false);
  const mockupRef = useRef(null);
  const fileInputRef = useRef(null);
  const bgInputRef = useRef(null);

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
          setBgType('image');
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

  // --- RENDER HELPERS ---
  const getDeviceStyles = () => {
      const base = { transition: 'all 0.3s ease', overflow: 'hidden', position: 'relative' };
      if (frameType === 'iphone') return { ...base, borderRadius: '40px', border: '12px solid #1f2937', aspectRatio: '9/19.5' };
      if (frameType === 'tablet') return { ...base, borderRadius: '24px', border: '12px solid #1f2937', aspectRatio: '4/3' };
      return { ...base, borderRadius: `${borderRadius}px`, width: '100%', aspectRatio: '16/10' };
  };

  const isMobile = frameType === 'iphone' || frameType === 'tablet';

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pt-28 pb-20">
      
      {/* SEO META */}
      <title>3D Mockup Generator & Screenshot Beautifier | NameDotify</title>
      <meta name="description" content="Create aesthetic 3D mockups for your screenshots. Add macOS, iPhone, and Windows frames. Free tool for developers and marketers." />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        
        {/* --- TOP BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Layers className="text-blue-600"/> Mockup Studio
                </h1>
            </div>
            <button 
                onClick={() => handleDownload('png')}
                disabled={loading}
                className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition active:scale-95"
            >
                {loading ? <RefreshCw className="animate-spin" size={18}/> : <Download size={18}/>}
                Download
            </button>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: CONTROLS (Moved to Left for Pro feel, col-span-4) */}
            <div className="lg:col-span-4 w-full flex flex-col gap-4 order-2 lg:order-1">
                
                {/* 1. TABS */}
                <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex">
                    {['device', 'content', 'appearance'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg transition ${activeTab === tab ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 2. TAB CONTENT */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 min-h-[500px]">
                    
                    {/* --- TAB: DEVICE --- */}
                    {activeTab === 'device' && (
                        <div className="space-y-6">
                            
                            {/* Frame Type */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Frame Style</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        {id: 'macos-dark', icon: Laptop, label: 'Mac Dark'},
                                        {id: 'macos-light', icon: Laptop, label: 'Mac Light'},
                                        {id: 'win', icon: Monitor, label: 'Windows'},
                                        {id: 'iphone', icon: Smartphone, label: 'iPhone'},
                                        {id: 'tablet', icon: Tablet, label: 'iPad'},
                                        {id: 'none', icon: X, label: 'None'},
                                    ].map((item) => (
                                        <button 
                                            key={item.id} 
                                            onClick={() => setFrameType(item.id)}
                                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-[11px] font-medium transition ${frameType === item.id ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
                                        >
                                            <item.icon size={18}/> {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-gray-100"/>

                            {/* Scale Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Frame Size</label>
                                    <span className="text-xs font-bold text-blue-600">{frameScale}%</span>
                                </div>
                                <input type="range" min="40" max="120" value={frameScale} onChange={(e) => setFrameScale(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"/>
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
                                        <input type="range" min="-45" max="45" value={tilt.x} onChange={(e) => setTilt({...tilt, x: Number(e.target.value)})} className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 w-4">Y</span>
                                        <input type="range" min="-45" max="45" value={tilt.y} onChange={(e) => setTilt({...tilt, y: Number(e.target.value)})} className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 w-4">R</span>
                                        <input type="range" min="-90" max="90" value={tilt.rotate} onChange={(e) => setTilt({...tilt, rotate: Number(e.target.value)})} className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* --- TAB: CONTENT --- */}
                    {activeTab === 'content' && (
                        <div className="space-y-6">
                            
                            {/* Upload */}
                            <button onClick={() => fileInputRef.current.click()} className="w-full py-4 border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-100 transition flex flex-col items-center gap-1">
                                <Upload size={20}/>
                                {image ? 'Change Screenshot' : 'Upload Screenshot'}
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*"/>

                            {/* URL Input */}
                            {!isMobile && frameType !== 'none' && (
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Browser URL</label>
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3">
                                        <Type size={14} className="text-gray-400"/>
                                        <input type="text" value={urlText} onChange={(e) => setUrlText(e.target.value)} className="w-full py-2.5 bg-transparent text-sm outline-none font-medium" placeholder="namedotify.com"/>
                                    </div>
                                </div>
                            )}

                            {/* Image Adjustments */}
                            <div className={!image ? 'opacity-50 pointer-events-none' : ''}>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase">Image Position</h4>
                                    <button onClick={() => { setImgPos({x:0, y:0}); setImgZoom(100); }} className="text-[10px] text-blue-600 font-bold">Reset</button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1"><label className="text-[10px] font-bold text-gray-400">Zoom</label><span className="text-[10px]">{imgZoom}%</span></div>
                                        <input type="range" min="100" max="250" value={imgZoom} onChange={(e) => setImgZoom(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-black"/>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 mb-1 block">Pan X</label>
                                            <input type="range" min="-200" max="200" value={imgPos.x} onChange={(e) => setImgPos({...imgPos, x: Number(e.target.value)})} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-black"/>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 mb-1 block">Pan Y</label>
                                            <input type="range" min="-200" max="200" value={imgPos.y} onChange={(e) => setImgPos({...imgPos, y: Number(e.target.value)})} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-black"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* --- TAB: APPEARANCE --- */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            
                            {/* Background Type */}
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                {['preset', 'custom', 'image'].map(t => (
                                    <button key={t} onClick={() => setBgType(t)} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition ${bgType === t ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}>{t}</button>
                                ))}
                            </div>

                            {/* 1. PRESETS */}
                            {bgType === 'preset' && (
                                <div className="grid grid-cols-5 gap-2">
                                    {PRESET_GRADS.map((g, i) => (
                                        <button key={i} onClick={() => setBgStyle(g)} className={`w-full aspect-square rounded-lg border hover:scale-105 transition shadow-sm ${bgStyle === g ? 'ring-2 ring-black' : 'border-gray-200'}`} style={{ background: g }} />
                                    ))}
                                    <div className="relative w-full aspect-square rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50"><input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => { setBgStyle(e.target.value); setBgType('preset'); }} /><Palette size={14} className="text-gray-400"/></div>
                                </div>
                            )}

                            {/* 2. CUSTOM GRADIENT */}
                            {bgType === 'custom' && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 border p-2 rounded-xl">
                                        <input type="color" value={customColors[0]} onChange={(e) => setCustomColors([e.target.value, customColors[1]])} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"/>
                                        <span className="text-xs font-mono text-gray-500">{customColors[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-2 border p-2 rounded-xl">
                                        <input type="color" value={customColors[1]} onChange={(e) => setCustomColors([customColors[0], e.target.value])} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"/>
                                        <span className="text-xs font-mono text-gray-500">{customColors[1]}</span>
                                    </div>
                                </div>
                            )}

                            {/* 3. UPLOAD WALLPAPER */}
                            {bgType === 'image' && (
                                <div>
                                    <button onClick={() => bgInputRef.current.click()} className="w-full py-8 border-2 border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-400 hover:bg-gray-50 flex flex-col items-center gap-2">
                                        <ImageIcon size={24}/> {customBgImg ? 'Change Wallpaper' : 'Upload Wallpaper'}
                                    </button>
                                    <input type="file" ref={bgInputRef} onChange={handleBgUpload} className="hidden" accept="image/*"/>
                                </div>
                            )}

                            <hr className="border-gray-100"/>

                            {/* Padding */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Padding</label>
                                    <span className="text-xs font-bold text-blue-600">{padding}px</span>
                                </div>
                                <input type="range" min="0" max="150" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"/>
                            </div>

                        </div>
                    )}

                </div>
            </div>

            {/* RIGHT: PREVIEW (col-span-8, reduced size) */}
            <div className="lg:col-span-8 w-full order-1 lg:order-2">
                <div className="bg-[#e5e5e5] rounded-3xl border border-gray-300 relative overflow-hidden flex items-center justify-center p-4 checkerboard-bg h-[600px] lg:h-[700px]">
                    
                    {/* Capture Area */}
                    <div 
                        ref={mockupRef}
                        className="relative flex items-center justify-center overflow-hidden transition-all duration-300 shadow-xl"
                        style={{ 
                            background: bgType === 'image' && customBgImg ? `url(${customBgImg}) center/cover` : bgStyle,
                            padding: `${padding}px`,
                            minWidth: '800px',
                            minHeight: '600px',
                        }}
                    >
                        <div 
                            style={{ 
                                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${tilt.rotate}deg) scale(${frameScale/100})`,
                                transition: 'transform 0.1s ease-out',
                                width: isMobile ? '320px' : '100%',
                            }}
                        >
                            <div className={`relative bg-white shadow-2xl overflow-hidden`} style={getDeviceStyles()}>
                                
                                {/* HEADER BARS */}
                                {frameType.includes('macos') && (
                                    <div className={`h-9 px-4 flex items-center gap-3 border-b ${frameType.includes('dark') ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-100'}`}>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <div className={`flex-1 text-center text-[10px] font-medium opacity-50`}>{urlText}</div>
                                    </div>
                                )}

                                {frameType === 'iphone' && (
                                    <div className="absolute top-2 w-full flex justify-center z-20 pointer-events-none">
                                        <div className="w-24 h-7 bg-black rounded-full shadow-sm"></div>
                                    </div>
                                )}

                                {/* IMAGE CONTAINER (Fixed Background Issue) */}
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
                                        <div className="flex flex-col items-center justify-center text-gray-400 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                            <ImageIcon size={48} className="mb-2 opacity-30"/>
                                            <span className="text-sm font-bold opacity-50">Upload Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SEO CONTENT (Added Below Preview) --- */}
                <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 prose prose-blue max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900">Free 3D Mockup Generator for Developers</h2>
                    <p className="lead">
                        Create stunning, professional device mockups in seconds. Whether you need a 
                        <strong> MacBook Pro frame</strong> for your SaaS landing page or an 
                        <strong> iPhone 15 mockup</strong> for your app store screenshots, NameDotify Studio helps you do it for free.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold flex items-center gap-2"><SmartphoneNfc size={18}/> 3D Tilt</h3>
                            <p className="text-sm text-gray-500 mt-1">Rotate your screenshots in X, Y, and Z axes to create realistic depth.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold flex items-center gap-2"><Layers size={18}/> Custom Backgrounds</h3>
                            <p className="text-sm text-gray-500 mt-1">Use our mesh gradients, create your own, or upload brand wallpapers.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold flex items-center gap-2"><CheckCircle size={18}/> High Res Export</h3>
                            <p className="text-sm text-gray-500 mt-1">Download in 4K resolution suitable for Retina displays and print.</p>
                        </div>
                    </div>

                    <h3>How to use?</h3>
                    <ol>
                        <li><strong>Upload:</strong> Take a screenshot of your website or app and upload it.</li>
                        <li><strong>Frame:</strong> Choose between macOS, Windows, iPhone, or iPad frames.</li>
                        <li><strong>Style:</strong> Adjust the 3D tilt, shadow, and background gradient.</li>
                        <li><strong>Download:</strong> Export as a high-quality PNG for free.</li>
                    </ol>
                </div>

            </div>

        </div>
      </div>
      
      {/* GLOBAL CSS */}
      <style jsx global>{`
        .checkerboard-bg {
          background-image:
            linear-gradient(45deg, #ddd 25%, transparent 25%),
            linear-gradient(-45deg, #ddd 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ddd 75%),
            linear-gradient(-45deg, transparent 75%, #ddd 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </div>
  );
}