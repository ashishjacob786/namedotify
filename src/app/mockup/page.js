"use client";
import React, { useState, useRef, useCallback } from 'react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import download from 'downloadjs';
import { 
  Download, Upload, Image as ImageIcon, Layers, 
  Smartphone, Monitor, Laptop, Move, Palette, 
  Maximize, Box, Rotate3D, Check, X
} from 'lucide-react';

// --- CONSTANTS & PRESETS ---
const GRADIENTS = [
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
  'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
  'conic-gradient(at center top, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))', // Mesh-like
  'conic-gradient(from 180deg at 50% 50%, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
];

export default function MockupStudio() {
  
  // --- STATE MANAGEMENT ---
  const [image, setImage] = useState(null); // Uploaded Image
  const [background, setBackground] = useState(GRADIENTS[1]);
  const [padding, setPadding] = useState(64);
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadow, setShadow] = useState('shadow-2xl');
  const [frameType, setFrameType] = useState('macos-dark'); // macos-dark, macos-light, win, iphone, none
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // 3D Tilt
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('frame'); // mobile tab UI

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
    try {
      const scale = 2; // 2x Quality (Retina)
      const dataUrl = format === 'png' 
        ? await toPng(mockupRef.current, { pixelRatio: scale }) 
        : await toJpeg(mockupRef.current, { quality: 0.95, pixelRatio: scale });
      download(dataUrl, `namedotify-mockup.${format}`);
    } catch (err) {
      console.error(err);
      alert('Error generating image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- JSON-LD SCHEMA (Advanced SEO) ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Mockup Studio',
    url: 'https://namedotify.com/mockup',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description: 'Create stunning 3D device mockups and screenshot beautification instantly. Free high-resolution download.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: '3D Tilt, macOS Frames, iPhone Mockups, Mesh Gradients, High-Res Export'
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-32 pt-28">
      
      {/* SEO Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <title>Free Screenshot Mockup Generator - 3D Device Frames | NameDotify</title>
      <meta name="description" content="Turn boring screenshots into beautiful 3D mockups. Add macOS browser frames, iPhone bezels, and mesh gradients. Free tool for developers & marketers." />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Mockup <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Studio</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">Make your screenshots viral-ready.</p>
            </div>
            
            <div className="flex gap-3">
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition"
                >
                    <Upload size={18}/> <span className="hidden sm:inline">Upload Image</span>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

                <button 
                  onClick={() => handleDownload('png')}
                  disabled={loading}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition shadow-lg shadow-gray-300"
                >
                    {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <Download size={18}/>}
                    Download
                </button>
            </div>
        </div>

        {/* --- MAIN WORKSPACE --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start h-auto lg:h-[calc(100vh-250px)]">
            
            {/* 1. PREVIEW CANVAS (Left/Top) */}
            <div className="w-full lg:flex-1 bg-gray-200 rounded-3xl border border-gray-300 shadow-inner overflow-hidden relative flex items-center justify-center min-h-[500px] h-full p-4 lg:p-8 checkerboard-bg">
                
                {/* The Capture Area */}
                <div 
                    ref={mockupRef}
                    className="relative transition-all duration-300 ease-out origin-center flex items-center justify-center overflow-hidden"
                    style={{ 
                        background: background,
                        padding: `${padding}px`,
                        width: 'auto',
                        minWidth: '800px', // Ensure high res export size
                        minHeight: '600px'
                    }}
                >
                    {/* The 3D Wrapper */}
                    <div 
                        className="transition-transform duration-300 ease-out"
                        style={{
                            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`,
                        }}
                    >
                        {/* THE DEVICE FRAME */}
                        <div 
                            className={`relative bg-white transition-all duration-300 ${shadow} overflow-hidden`}
                            style={{ 
                                borderRadius: frameType === 'iphone' ? '40px' : `${borderRadius}px`,
                                border: frameType === 'iphone' ? '12px solid #1f2937' : 'none'
                            }}
                        >
                            
                            {/* Browser Header (macOS) */}
                            {(frameType === 'macos-dark' || frameType === 'macos-light') && (
                                <div className={`h-8 px-4 flex items-center gap-2 border-b ${frameType === 'macos-dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    {/* Fake URL Bar */}
                                    <div className={`ml-4 flex-1 h-5 rounded-md opacity-30 ${frameType === 'macos-dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                                </div>
                            )}

                            {/* Windows Header */}
                            {frameType === 'win' && (
                                <div className="h-8 px-4 flex justify-end items-center gap-4 bg-gray-100 border-b border-gray-200">
                                    <div className="w-3 h-3 border-b-2 border-gray-400"></div>
                                    <div className="w-3 h-3 border border-gray-400"></div>
                                    <div className="w-3 h-3 relative"><X size={12} className="text-gray-500"/></div>
                                </div>
                            )}

                            {/* IMAGE CONTENT */}
                            <div className="relative bg-white overflow-hidden">
                                {image ? (
                                    <img src={image} alt="Screenshot" className="w-full h-auto object-cover block" style={{ maxHeight: '600px', maxWidth: '100%' }} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-[600px] h-[400px] bg-gray-50 text-gray-400">
                                        <ImageIcon size={48} className="mb-2 opacity-50"/>
                                        <span className="font-medium">Upload Image Preview</span>
                                        <span className="text-xs mt-1">or Paste from Clipboard</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Reset Button (Floating) */}
                <button 
                  onClick={() => { setTilt({x:0, y:0}); setScale(1); }}
                  className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg text-gray-500 hover:text-blue-600"
                  title="Reset View"
                >
                    <Maximize size={20} />
                </button>
            </div>

            {/* 2. CONTROLS (Right/Bottom - Sticky) */}
            <div className="w-full lg:w-80 flex flex-col gap-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm h-full overflow-y-auto">
                
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Palette size={18}/> Customization
                </h3>

                {/* Backgrounds */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase">Background</label>
                    <div className="grid grid-cols-5 gap-2">
                        {GRADIENTS.map((grad, i) => (
                            <button 
                                key={i} 
                                onClick={() => setBackground(grad)}
                                className={`w-8 h-8 rounded-full shadow-sm border border-gray-200 transition transform hover:scale-110 ${background === grad ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                                style={{ background: grad }}
                            />
                        ))}
                        <button 
                            onClick={() => setBackground('transparent')}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-400 text-[8px]"
                            title="Transparent"
                        >
                            PNG
                        </button>
                    </div>
                    {/* Solid Color Picker */}
                    <input type="color" className="w-full h-10 rounded-lg cursor-pointer border-none" onChange={(e) => setBackground(e.target.value)} />
                </div>

                <hr className="border-gray-100"/>

                {/* Frame Type */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase">Device Frame</label>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => setFrameType('macos-dark')} className={`p-2 text-xs rounded-lg border font-medium ${frameType === 'macos-dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>macOS Dark</button>
                        <button onClick={() => setFrameType('macos-light')} className={`p-2 text-xs rounded-lg border font-medium ${frameType === 'macos-light' ? 'bg-gray-100 text-gray-900 border-gray-300' : 'bg-gray-50 hover:bg-gray-100'}`}>macOS Light</button>
                        <button onClick={() => setFrameType('iphone')} className={`p-2 text-xs rounded-lg border font-medium ${frameType === 'iphone' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>iPhone</button>
                        <button onClick={() => setFrameType('win')} className={`p-2 text-xs rounded-lg border font-medium ${frameType === 'win' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>Windows</button>
                        <button onClick={() => setFrameType('none')} className={`p-2 text-xs rounded-lg border font-medium ${frameType === 'none' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100'}`}>None</button>
                    </div>
                </div>

                <hr className="border-gray-100"/>

                {/* Sliders (Padding, Roundness, Tilt) */}
                <div className="space-y-5">
                    
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Padding</label>
                            <span className="text-xs text-gray-400">{padding}px</span>
                        </div>
                        <input 
                            type="range" min="0" max="150" value={padding} 
                            onChange={(e) => setPadding(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Roundness</label>
                            <span className="text-xs text-gray-400">{borderRadius}px</span>
                        </div>
                        <input 
                            type="range" min="0" max="40" value={borderRadius} 
                            onChange={(e) => setBorderRadius(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* 3D TILT CONTROLS */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex justify-between mb-3">
                            <label className="text-xs font-bold text-blue-800 uppercase flex items-center gap-1"><Rotate3D size={12}/> 3D Tilt Effect</label>
                            <button onClick={() => setTilt({x:0, y:0})} className="text-[10px] text-blue-600 hover:underline">Reset</button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 w-4">X</span>
                                <input 
                                    type="range" min="-45" max="45" value={tilt.x} 
                                    onChange={(e) => setTilt({...tilt, x: Number(e.target.value)})}
                                    className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 w-4">Y</span>
                                <input 
                                    type="range" min="-45" max="45" value={tilt.y} 
                                    onChange={(e) => setTilt({...tilt, y: Number(e.target.value)})}
                                    className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        {/* --- SEO CONTENT AREA (Advanced) --- */}
        <div className="mt-24 max-w-4xl mx-auto">
            <article className="prose prose-blue max-w-none">
                <h2 className="text-3xl font-bold text-gray-900">Why Use Our Mockup Studio?</h2>
                <p className="lead text-lg text-gray-600">
                    Transforming boring screenshots into professional, viral-worthy images shouldn't require expensive software like Photoshop or Canva Pro. 
                    <strong>NameDotify Mockup Studio</strong> puts the power of 3D design in your browser.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Layers className="text-purple-600"/> 3D Tilt Technology</h3>
                        <p className="text-sm text-gray-600">Unlike basic tools, we allow you to rotate your screenshot in 3D space (X & Y axis) to create depth and realism.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Smartphone className="text-blue-600"/> Multi-Device Frames</h3>
                        <p className="text-sm text-gray-600">One click to wrap your image in a macOS Dark Mode window, a Windows 11 frame, or an iPhone bezel.</p>
                    </div>
                </div>

                <h3>Perfect For:</h3>
                <ul>
                    <li><strong>Developers:</strong> Showcase your code or app on GitHub READMEs.</li>
                    <li><strong>Marketers:</strong> Create engaging visuals for Twitter (X) and LinkedIn posts.</li>
                    <li><strong>Designers:</strong> Present your UI/UX work in a polished, professional context.</li>
                </ul>
            </article>
        </div>

      </div>

      {/* Styles for Checkerboard & Range Slider */}
      <style jsx global>{`
        .checkerboard-bg {
          background-image:
            linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </div>
  );
}