"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import {
  Download, Upload, Image as ImageIcon,
  Smartphone, Tablet, Monitor, Laptop,
  Palette, Rotate3D, X, ChevronDown, ChevronUp,
  Move, ZoomIn, Layout, Type, RefreshCw
} from 'lucide-react';

// --- CONSTANTS ---
const GRADIENTS = [
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
  'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
  'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
  'conic-gradient(from 180deg at 50% 50%, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
  '#ffffff',
  'transparent'
];

export default function MockupStudio() {

  // --- STATE ---
  const [image, setImage] = useState(null);
  
  // Image Adjustments
  const [imgZoom, setImgZoom] = useState(100);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [imgFit, setImgFit] = useState('cover');

  // Frame Settings
  const [frameType, setFrameType] = useState('macos-dark'); // macos-dark, macos-light, win, iphone, tablet, none
  const [frameScale, setFrameScale] = useState(100); // Resize the device itself
  const [urlText, setUrlText] = useState('namedotify.com');
  const [shadow, setShadow] = useState('shadow-2xl');
  const [borderRadius, setBorderRadius] = useState(16);

  // Background & Layout
  const [bgStyle, setBgStyle] = useState(GRADIENTS[1]);
  const [padding, setPadding] = useState(80);
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotate: 0 });

  // UI State
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState('device'); // 'device', 'content', 'background', '3d'

  const mockupRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- HANDLERS ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async (format) => {
    if (!mockupRef.current) return;
    setLoading(true);
    // Temporary reset tilt/scale logic if needed for cleaner capture, 
    // but usually creating a clone or capturing as-is works best for 3D.
    // We capture as is to keep the 3D effect.
    setTimeout(async () => {
        try {
            const scale = 2; 
            const dataUrl = format === 'png'
              ? await toPng(mockupRef.current, { pixelRatio: scale, width: mockupRef.current.offsetWidth, height: mockupRef.current.offsetHeight })
              : await toJpeg(mockupRef.current, { quality: 0.95, pixelRatio: scale });
            download(dataUrl, `namedotify-mockup.${format}`);
          } catch (err) {
            console.error(err);
            alert('Error. Please try again or reduce tilt.');
          } finally {
            setLoading(false);
          }
    }, 100);
  };

  // Toggle Accordion
  const toggleSection = (section) => {
      setOpenSection(openSection === section ? null : section);
  }

  // Helper for Frame Styles
  const getDeviceStyle = () => {
      const base = { transition: 'all 0.3s ease' };
      if (frameType === 'iphone') {
          return { ...base, borderRadius: '40px', border: '12px solid #1f2937', aspectRatio: '9/19.5', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' };
      }
      if (frameType === 'tablet') {
          return { ...base, borderRadius: '24px', border: '12px solid #1f2937', aspectRatio: '4/3', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' };
      }
      // Browsers
      return { ...base, borderRadius: `${borderRadius}px`, width: '100%', minHeight: '100%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' };
  };

  const isBrowser = ['macos-dark', 'macos-light', 'win'].includes(frameType);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-28 pb-20">
      
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Mockup Studio <span className="text-blue-600 text-lg align-top">PRO</span></h1>
            </div>
            <div className="flex gap-3">
                 <button 
                  onClick={() => handleDownload('png')}
                  disabled={loading}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                    {loading ? <RefreshCw className="animate-spin" size={18}/> : <Download size={18}/>}
                    Download
                </button>
            </div>
        </div>

        {/* WORKSPACE */}
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)] min-h-[600px]">
            
            {/* LEFT: CANVAS (Preview) */}
            <div className="flex-1 bg-[#e5e5e5] rounded-3xl border border-gray-300 relative overflow-hidden flex items-center justify-center p-4 checkerboard-bg">
                
                {/* 3D Context Wrapper */}
                <div 
                    ref={mockupRef}
                    className="relative flex items-center justify-center overflow-hidden transition-colors duration-300"
                    style={{ 
                        background: bgStyle.includes('url') ? `url(${bgStyle}) center/cover` : bgStyle,
                        padding: `${padding}px`,
                        minWidth: '800px', // Forces High Res Capture area
                        minHeight: '600px',
                    }}
                >
                    {/* Tilt/Rotate Wrapper */}
                    <div 
                        style={{ 
                            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${tilt.rotate}deg) scale(${frameScale/100})`,
                            transition: 'transform 0.1s ease-out',
                            width: frameType === 'iphone' ? '300px' : (frameType === 'tablet' ? '500px' : '700px'),
                            // height: 'auto'
                        }}
                    >
                        {/* DEVICE FRAME */}
                        <div 
                            className={`relative bg-white overflow-hidden ${frameType === 'none' ? '' : 'bg-white'}`}
                            style={getDeviceStyle()}
                        >
                            
                            {/* --- HEADER BARS --- */}
                            
                            {/* macOS Header */}
                            {frameType.includes('macos') && (
                                <div className={`h-9 px-4 flex items-center gap-3 border-b ${frameType.includes('dark') ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-100'}`}>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                                    </div>
                                    <div className={`flex-1 text-center text-xs font-medium py-1 rounded ${frameType.includes('dark') ? 'bg-[#2a2a2a] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                                        {urlText}
                                    </div>
                                </div>
                            )}

                            {/* Windows Header */}
                            {frameType === 'win' && (
                                <div className="h-9 flex justify-between items-center bg-[#f3f3f3] border-b border-gray-300">
                                    <div className="px-4 text-xs text-gray-500">{urlText}</div>
                                    <div className="flex h-full">
                                        <div className="w-10 flex items-center justify-center hover:bg-gray-200"><div className="w-2.5 h-[1px] bg-black"></div></div>
                                        <div className="w-10 flex items-center justify-center hover:bg-gray-200"><div className="w-2.5 h-2.5 border border-black"></div></div>
                                        <div className="w-10 flex items-center justify-center hover:bg-red-500 hover:text-white"><X size={14}/></div>
                                    </div>
                                </div>
                            )}

                            {/* iPhone Dynamic Island */}
                            {frameType === 'iphone' && (
                                <div className="absolute top-0 left-0 w-full flex justify-center pt-3 z-20 pointer-events-none">
                                    <div className="w-24 h-7 bg-black rounded-full"></div>
                                </div>
                            )}

                            {/* --- IMAGE AREA --- */}
                            <div className={`relative overflow-hidden w-full h-full bg-white flex items-center justify-center ${frameType === 'iphone' ? 'aspect-[9/19.5]' : (frameType === 'tablet' ? 'aspect-[4/3]' : 'aspect-video')}`}>
                                {image ? (
                                    <img 
                                        src={image} 
                                        alt="preview"
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: imgFit,
                                            transform: `scale(${imgZoom/100}) translate(${imgPos.x}px, ${imgPos.y}px)`,
                                        }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-300 p-10 cursor-pointer hover:text-gray-400 transition" onClick={() => fileInputRef.current.click()}>
                                        <ImageIcon size={48} className="mb-2"/>
                                        <span className="font-bold text-sm">Upload Image</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Reset View FAB */}
                <button onClick={() => { setTilt({x:0, y:0, rotate:0}); setFrameScale(100); }} className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition" title="Reset View">
                    <RefreshCw size={20}/>
                </button>
            </div>

            {/* RIGHT: CONTROLS (Sidebar) */}
            <div className="w-full lg:w-[360px] bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col overflow-hidden h-full">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                    
                    {/* 1. DEVICE TYPE */}
                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                        <button onClick={() => toggleSection('device')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition">
                            <span className="font-bold text-sm text-gray-700 flex items-center gap-2"><Monitor size={16}/> Device Type</span>
                            {openSection === 'device' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </button>
                        
                        {openSection === 'device' && (
                            <div className="p-4 bg-white space-y-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {['macos-dark', 'macos-light', 'win', 'iphone', 'tablet', 'none'].map((type) => (
                                        <button 
                                            key={type}
                                            onClick={() => setFrameType(type)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-xs font-semibold transition ${frameType === type ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
                                        >
                                            {type.includes('macos') && <Laptop size={20}/>}
                                            {type === 'win' && <Monitor size={20}/>}
                                            {type === 'iphone' && <Smartphone size={20}/>}
                                            {type === 'tablet' && <Tablet size={20}/>}
                                            {type === 'none' && <Layout size={20}/>}
                                            <span className="capitalize">{type.replace('macos-', 'Mac ')}</span>
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Frame Scale Slider */}
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-xs font-bold text-gray-400">Frame Size</label>
                                        <span className="text-xs text-gray-400">{frameScale}%</span>
                                    </div>
                                    <input type="range" min="50" max="150" value={frameScale} onChange={(e) => setFrameScale(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"/>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. CONTENT & IMAGE */}
                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                        <button onClick={() => toggleSection('content')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition">
                            <span className="font-bold text-sm text-gray-700 flex items-center gap-2"><ImageIcon size={16}/> Screen Content</span>
                            {openSection === 'content' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </button>

                        {openSection === 'content' && (
                            <div className="p-4 bg-white space-y-4">
                                {/* Upload */}
                                <button onClick={() => fileInputRef.current.click()} className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50 hover:border-blue-400 hover:text-blue-500 transition flex items-center justify-center gap-2">
                                    <Upload size={16}/> {image ? 'Replace Image' : 'Upload Image'}
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*"/>

                                {isBrowser && (
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 mb-1 block">Browser URL</label>
                                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2">
                                            <Type size={14} className="text-gray-400"/>
                                            <input type="text" value={urlText} onChange={(e) => setUrlText(e.target.value)} className="w-full py-2 bg-transparent text-sm outline-none" placeholder="Type URL..."/>
                                        </div>
                                    </div>
                                )}

                                {/* Zoom & Fit */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 mb-1 block">Zoom</label>
                                        <input type="range" min="10" max="200" value={imgZoom} onChange={(e) => setImgZoom(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div className="flex items-end">
                                        <button onClick={() => setImgFit(imgFit === 'cover' ? 'contain' : 'cover')} className="w-full py-1 text-xs font-bold border rounded bg-gray-50 hover:bg-gray-100">
                                            Fit: {imgFit.toUpperCase()}
                                        </button>
                                    </div>
                                </div>

                                {/* Position (Pan) */}
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-xs font-bold text-gray-400">Position (Pan X / Y)</label>
                                        <button onClick={() => setImgPos({x:0, y:0})} className="text-[10px] text-blue-600 font-bold hover:underline">Reset</button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="range" min="-300" max="300" value={imgPos.x} onChange={(e) => setImgPos({...imgPos, x: Number(e.target.value)})} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" title="Move X"/>
                                        <input type="range" min="-300" max="300" value={imgPos.y} onChange={(e) => setImgPos({...imgPos, y: Number(e.target.value)})} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" title="Move Y"/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. BACKGROUND */}
                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                        <button onClick={() => toggleSection('background')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition">
                            <span className="font-bold text-sm text-gray-700 flex items-center gap-2"><Palette size={16}/> Background</span>
                            {openSection === 'background' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </button>
                        
                        {openSection === 'background' && (
                            <div className="p-4 bg-white space-y-4">
                                <div className="grid grid-cols-5 gap-2">
                                    {GRADIENTS.map((g, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setBgStyle(g)} 
                                            className={`w-full aspect-square rounded-lg border hover:scale-105 transition shadow-sm ${bgStyle === g ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}
                                            style={{ background: g }}
                                        />
                                    ))}
                                    <div className="relative w-full aspect-square rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                                        <input type="color" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={(e) => setBgStyle(e.target.value)} />
                                        <Palette size={14} className="text-gray-400"/>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-xs font-bold text-gray-400 mb-1 block">Canvas Padding</label>
                                    <input type="range" min="0" max="200" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"/>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 4. 3D EFFECTS */}
                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                        <button onClick={() => toggleSection('3d')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition">
                            <span className="font-bold text-sm text-gray-700 flex items-center gap-2"><Rotate3D size={16}/> 3D Tilt</span>
                            {openSection === '3d' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </button>
                        
                        {openSection === '3d' && (
                            <div className="p-4 bg-white space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 block mb-1">Tilt X</label>
                                        <input type="range" min="-45" max="45" value={tilt.x} onChange={(e) => setTilt({...tilt, x: Number(e.target.value)})} className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 block mb-1">Tilt Y</label>
                                        <input type="range" min="-45" max="45" value={tilt.y} onChange={(e) => setTilt({...tilt, y: Number(e.target.value)})} className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-gray-400 block mb-1">Rotate Z</label>
                                        <input type="range" min="-180" max="180" value={tilt.rotate} onChange={(e) => setTilt({...tilt, rotate: Number(e.target.value)})} className="w-full h-1.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"/>
                                    </div>
                                </div>
                                <button onClick={() => setTilt({x:0, y:0, rotate:0})} className="w-full py-2 text-xs font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-100">Reset 3D</button>
                            </div>
                        )}
                    </div>

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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
}