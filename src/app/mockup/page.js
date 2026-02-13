"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import {
  Download, Upload, Image as ImageIcon,
  Smartphone, Tablet, Monitor, Laptop,
  Palette, Maximize, Rotate3D, X,
  ZoomIn, StretchHorizontal, Type, Link as LinkIcon
} from 'lucide-react';

// --- CONSTANTS & PRESETS ---
const GRADIENTS = [
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%)',
  'conic-gradient(at center top, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))',
  'transparent'
];

export default function MockupStudio() {

  // --- STATE MANAGEMENT ---
  // Main Image Content
  const [image, setImage] = useState(null);
  const [imageScale, setImageScale] = useState(100); // 50% to 150%
  const [imageFit, setImageFit] = useState('cover'); // 'cover' or 'contain'

  // Background Styles
  const [bgType, setBgType] = useState('preset'); // 'preset', 'customGrad', 'customImg'
  const [backgroundStyle, setBackgroundStyle] = useState(GRADIENTS[1]);
  const [customGradColors, setCustomGradColors] = useState(['#FF3CAC', '#784BA0']);
  const [customBgImage, setCustomBgImage] = useState(null);

  // Frame & Layout
  const [padding, setPadding] = useState(64);
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadow, setShadow] = useState('shadow-2xl');
  const [frameType, setFrameType] = useState('macos-dark'); // macos-dark/light, win, iphone, tablet, none
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // 3D Tilt
  const [urlText, setUrlText] = useState('namedotify.com'); // Editable URL

  const [loading, setLoading] = useState(false);

  const mockupRef = useRef(null);
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);

  // --- EFFECTS ---
  // Update background when custom colors change
  useEffect(() => {
    if (bgType === 'customGrad') {
      setBackgroundStyle(`linear-gradient(135deg, ${customGradColors[0]}, ${customGradColors[1]})`);
    }
  }, [customGradColors, bgType]);

  // --- HANDLERS ---
  const handleImageUpload = (e, targetState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => targetState(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async (format) => {
    if (!mockupRef.current) return;
    setLoading(true);
    // Temporary disable tilt for cleaner capture if needed, but usually works fine.
    // const currentTilt = tilt; setTilt({x:0,y:0});
    setTimeout(async () => {
        try {
            const scale = 2; // Retina quality
            const dataUrl = format === 'png'
              ? await toPng(mockupRef.current, { pixelRatio: scale })
              : await toJpeg(mockupRef.current, { quality: 0.95, pixelRatio: scale });
            download(dataUrl, `namedotify-mockup.${format}`);
          } catch (err) {
            console.error(err);
            alert('Error generating image. Please try again.');
          } finally {
            setLoading(false);
            // setTilt(currentTilt);
          }
    }, 100); // Small delay for state updates
  };


  // Helper to get dynamic styles for different frames
  const getFrameStyles = () => {
      let styles = {
          borderRadius: `${borderRadius}px`,
          border: 'none',
          aspectRatio: 'auto'
      };

      switch(frameType) {
          case 'iphone':
              styles.borderRadius = '40px';
              styles.border = '14px solid #1f2937'; // Dark bezel
              styles.aspectRatio = '9 / 19.5'; // Phone ratio
              break;
          case 'tablet':
              styles.borderRadius = '24px';
              styles.border = '12px solid #1f2937';
              styles.aspectRatio = '4 / 3'; // Tablet ratio
              break;
          case 'none':
               styles.borderRadius = `${borderRadius}px`;
               styles.boxShadow = 'none';
               break;
          default: // Browser windows
              styles.borderRadius = `${borderRadius}px`;
              break;
      }
      return styles;
  };

  const frameStyles = getFrameStyles();
  const isBrowser = frameType.includes('macos') || frameType === 'win';
  const isMobile = frameType === 'iphone' || frameType === 'tablet';


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-32 pt-28">

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Mockup Studio</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">Create professional 3D device mockups.</p>
            </div>

            <div className="flex gap-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition shadow-sm"
                >
                    <Upload size={18}/> <span className="hidden sm:inline">Upload Screenshot</span>
                </button>
                <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e, setImage)} className="hidden" accept="image/*" />

                <button
                  onClick={() => handleDownload('png')}
                  disabled={loading}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition shadow-lg shadow-gray-300"
                >
                    {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <Download size={18}/>}
                    Download PNG
                </button>
            </div>
        </div>

        {/* --- MAIN WORKSPACE --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start h-auto lg:h-[calc(100vh-220px)]">

            {/* 1. PREVIEW CANVAS (Left) */}
            <div className="w-full lg:flex-1 bg-gray-200 rounded-3xl border border-gray-300 shadow-inner overflow-hidden relative flex items-center justify-center min-h-[500px] h-full p-4 lg:p-8 checkerboard-bg group">

                {/* The Capture Area */}
                <div
                    ref={mockupRef}
                    className="relative transition-all duration-300 ease-out origin-center flex items-center justify-center overflow-hidden"
                    style={{
                        // Logic for background style vs image
                        background: bgType === 'customImg' && customBgImage ? `url(${customBgImage}) center/cover no-repeat` : backgroundStyle,
                        padding: `${padding}px`,
                        minWidth: isMobile ? 'auto' : '800px', // Adjust min width based on device
                        minHeight: '600px'
                    }}
                >
                    {/* The 3D Wrapper */}
                    <div
                        className="transition-transform duration-300 ease-out"
                        style={{
                            transform: `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                            height: isMobile ? '100%' : 'auto' // Important for mobile frames to fill height
                        }}
                    >
                        {/* THE DEVICE FRAME */}
                        <div
                            className={`relative bg-white transition-all duration-300 overflow-hidden flex flex-col ${frameType === 'none' ? '' : shadow}`}
                            style={{
                                ...frameStyles,
                                height: isMobile ? '100%' : 'auto', // Ensure frame fills height for phones/tablets
                            }}
                        >

                            {/* Browser Headers (Editable URL) */}
                            {isBrowser && (
                                <div className={`h-10 px-4 flex items-center gap-3 border-b relative z-10 ${frameType.includes('dark') ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
                                    {frameType.includes('macos') && (
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        </div>
                                    )}
                                    {frameType === 'win' && (
                                        <div className="flex gap-4 ml-auto order-last">
                                             <div className="w-3 h-3 border-b-2 border-gray-400"></div>
                                             <div className="w-3 h-3 border border-gray-400"></div>
                                             <X size={14} className="text-gray-500"/>
                                        </div>
                                    )}
                                    {/* Editable URL Bar */}
                                    <div className="flex-1 flex justify-center">
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs w-full max-w-[300px] ${frameType.includes('dark') ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600 shadow-sm'}`}>
                                             {frameType.includes('macos') && <LinkIcon size={10} className="opacity-50"/>}
                                             <input
                                                 type="text"
                                                 value={urlText}
                                                 onChange={(e) => setUrlText(e.target.value)}
                                                 className="bg-transparent outline-none text-center w-full"
                                                 spellCheck="false"
                                             />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* IMAGE CONTENT CONTAINER */}
                            <div className="relative bg-white flex-1 overflow-hidden w-full h-full flex items-center justify-center">
                                {image ? (
                                    <img
                                        src={image}
                                        alt="Screenshot"
                                        className="transition-transform duration-300"
                                        style={{
                                            transform: `scale(${imageScale / 100})`,
                                            objectFit: imageFit,
                                            width: '100%',
                                            height: isMobile ? '100%' : 'auto', // Mobile needs 100% height fit
                                            borderRadius: (frameType === 'none' && !isBrowser) ? `${borderRadius}px` : '0'
                                        }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 p-10 text-center">
                                        <ImageIcon size={48} className="mb-2 opacity-50"/>
                                        <span className="font-medium">Upload Screenshot</span>
                                        <span className="text-xs mt-1">Image will appear here</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                 {/* Reset View Button */}
                 <button
                  onClick={() => setTilt({x:0, y:0})}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow text-gray-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition"
                  title="Reset 3D View"
                >
                    <Maximize size={20} />
                </button>
            </div>

            {/* 2. CONTROLS (Right - Scrollable) */}
            <div className="w-full lg:w-[340px] flex flex-col gap-5 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm h-full overflow-y-auto custom-scrollbar">

                {/* --- SECTION 1: FRAME & DEVICE --- */}
                <div>
                    <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3 uppercase tracking-wider">
                        <Monitor size={16}/> Device Frame
                    </h3>
                     <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => setFrameType('macos-dark')} className={`control-btn ${frameType === 'macos-dark' ? 'active' : ''}`}><Laptop size={14}/> macOS Dark</button>
                        <button onClick={() => setFrameType('macos-light')} className={`control-btn ${frameType === 'macos-light' ? 'active' : ''}`}><Laptop size={14}/> macOS Light</button>
                        <button onClick={() => setFrameType('win')} className={`control-btn ${frameType === 'win' ? 'active' : ''}`}><Monitor size={14}/> Windows</button>
                        <button onClick={() => setFrameType('iphone')} className={`control-btn ${frameType === 'iphone' ? 'active' : ''}`}><Smartphone size={14}/> iPhone</button>
                        <button onClick={() => setFrameType('tablet')} className={`control-btn ${frameType === 'tablet' ? 'active' : ''}`}><Tablet size={14}/> Tablet</button>
                        <button onClick={() => setFrameType('none')} className={`control-btn ${frameType === 'none' ? 'active-red' : ''}`}><X size={14}/> None</button>
                    </div>
                </div>

                 <hr className="border-gray-100"/>

                {/* --- SECTION 2: IMAGE ADJUSTMENTS --- */}
                <div className={!image ? 'opacity-50 pointer-events-none' : ''}>
                     <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3 uppercase tracking-wider">
                        <ZoomIn size={16}/> Image Scaling
                    </h3>
                    {/* Scale Slider */}
                    <div className="mb-4">
                         <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-gray-500">Zoom</label>
                            <span className="text-xs text-gray-400">{imageScale}%</span>
                        </div>
                        <input
                            type="range" min="50" max="150" value={imageScale}
                            onChange={(e) => setImageScale(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                    {/* Fit Mode Buttons */}
                     <div className="flex gap-2">
                         <button onClick={() => setImageFit('cover')} className={`flex-1 py-2 rounded-lg border text-xs font-bold flex items-center justify-center gap-1 ${imageFit === 'cover' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'hover:bg-gray-50'}`}><StretchHorizontal size={14}/> Cover (Fill)</button>
                         <button onClick={() => setImageFit('contain')} className={`flex-1 py-2 rounded-lg border text-xs font-bold flex items-center justify-center gap-1 ${imageFit === 'contain' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'hover:bg-gray-50'}`}><Maximize size={14}/> Contain (Fit)</button>
                    </div>
                </div>

                <hr className="border-gray-100"/>

                {/* --- SECTION 3: BACKGROUNDS --- */}
                <div>
                    <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3 uppercase tracking-wider">
                        <Palette size={16}/> Background
                    </h3>

                    {/* Type Toggles */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                        <button onClick={() => setBgType('preset')} className={`flex-1 text-xs py-1.5 font-bold rounded-md transition ${bgType === 'preset' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Presets</button>
                        <button onClick={() => setBgType('customGrad')} className={`flex-1 text-xs py-1.5 font-bold rounded-md transition ${bgType === 'customGrad' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Gradient</button>
                        <button onClick={() => setBgType('customImg')} className={`flex-1 text-xs py-1.5 font-bold rounded-md transition ${bgType === 'customImg' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Image</button>
                    </div>

                    {/* 3.1 Presets UI */}
                    {bgType === 'preset' && (
                        <div className="grid grid-cols-6 gap-2">
                            {GRADIENTS.map((grad, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setBackgroundStyle(grad); setBgType('preset'); }}
                                    className={`w-full aspect-square rounded-lg shadow-sm border border-gray-200 transition transform hover:scale-105 ${backgroundStyle === grad && bgType === 'preset' ? 'ring-2 ring-blue-500 ring-offset-1' : ''} ${grad === 'transparent' ? 'checkerboard-bg' : ''}`}
                                    style={grad !== 'transparent' ? { background: grad } : {}}
                                    title={grad === 'transparent' ? 'Transparent PNG' : `Preset ${i+1}`}
                                >
                                   {grad === 'transparent' && <span className="text-[8px] text-gray-400 font-bold">PNG</span>}
                                </button>
                            ))}
                             {/* Solid Color Picker */}
                             <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <input type="color" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => { setBackgroundStyle(e.target.value); setBgType('preset'); }} />
                                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400"><Palette size={14}/></div>
                             </div>
                        </div>
                    )}

                     {/* 3.2 Custom Gradient UI */}
                    {bgType === 'customGrad' && (
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Color 1</label>
                                <div className="flex items-center gap-2 mt-1 border p-1 rounded-lg">
                                    <input type="color" value={customGradColors[0]} onChange={(e) => setCustomGradColors([e.target.value, customGradColors[1]])} className="w-6 h-6 rounded cursor-pointer border-none p-0"/>
                                    <span className="text-xs font-mono text-gray-600">{customGradColors[0]}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Color 2</label>
                                <div className="flex items-center gap-2 mt-1 border p-1 rounded-lg">
                                    <input type="color" value={customGradColors[1]} onChange={(e) => setCustomGradColors([customGradColors[0], e.target.value])} className="w-6 h-6 rounded cursor-pointer border-none p-0"/>
                                    <span className="text-xs font-mono text-gray-600">{customGradColors[1]}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3.3 Custom Image UI */}
                     {bgType === 'customImg' && (
                        <div>
                            <button
                                onClick={() => bgFileInputRef.current.click()}
                                className="w-full border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 px-4 py-6 rounded-xl font-bold flex flex-col items-center gap-2 hover:bg-gray-100 transition"
                            >
                                <ImageIcon size={24} className="opacity-50"/>
                                <span className="text-sm">{customBgImage ? 'Change Background Image' : 'Upload Background Wallpaper'}</span>
                            </button>
                             <input type="file" ref={bgFileInputRef} onChange={(e) => handleImageUpload(e, setCustomBgImage)} className="hidden" accept="image/*" />
                             {customBgImage && (
                                 <button onClick={() => setCustomBgImage(null)} className="text-xs text-red-500 mt-2 flex items-center gap-1 hover:underline"><X size={10}/> Remove Image</button>
                             )}
                        </div>
                    )}
                </div>

                <hr className="border-gray-100"/>

                 {/* --- SECTION 4: LAYOUT & 3D --- */}
                 <div className="space-y-5">
                    {/* Padding Slider */}
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

                     {/* Roundness Slider (Disabled for phones) */}
                     <div className={isMobile ? 'opacity-50 pointer-events-none' : ''}>
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
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <div className="flex justify-between mb-3">
                            <label className="text-xs font-bold text-indigo-800 uppercase flex items-center gap-1"><Rotate3D size={12}/> 3D Perspective</label>
                            <button onClick={() => setTilt({x:0, y:0})} className="text-[10px] text-indigo-600 hover:underline">Reset</button>
                        </div>
                        <div className="space-y-3">
                             {/* X Axis */}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-indigo-400 w-4">X</span>
                                <input
                                    type="range" min="-30" max="30" value={tilt.x}
                                    onChange={(e) => setTilt({...tilt, x: Number(e.target.value)})}
                                    className="w-full h-1 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>
                             {/* Y Axis */}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-indigo-400 w-4">Y</span>
                                <input
                                    type="range" min="-30" max="30" value={tilt.y}
                                    onChange={(e) => setTilt({...tilt, y: Number(e.target.value)})}
                                    className="w-full h-1 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

      </div>

      {/* Styles for Checkerboard & Scrollbar */}
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
        .control-btn {
            @apply p-2 text-[11px] rounded-lg border font-bold flex flex-col items-center gap-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition;
        }
        .control-btn.active {
            @apply bg-blue-50 text-blue-700 border-blue-200 shadow-sm;
        }
         .control-btn.active-red {
            @apply bg-red-50 text-red-700 border-red-200 shadow-sm;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}