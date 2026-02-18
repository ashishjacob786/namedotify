"use client";
import React, { useState, useEffect } from 'react';
import { 
  Code2, Play, FileCode, Paintbucket, Terminal, 
  Download, RefreshCw, Layout, Monitor, 
  CheckCircle, Zap, Shield, Blocks
} from 'lucide-react';

export default function EditorClient() {
  const [activeTab, setActiveTab] = useState('html');
  const [isCopied, setIsCopied] = useState(false);

  // Default Code Template (A beautiful glowing button)
  const [htmlCode, setHtmlCode] = useState('<div class="container">\n  <h1>Welcome to NameDotify Studio</h1>\n  <button id="magicBtn">Click for Magic</button>\n</div>');
  const [cssCode, setCssCode] = useState('body {\n  background: #0f172a;\n  color: white;\n  font-family: sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n\n.container {\n  text-align: center;\n}\n\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  font-size: 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\nbutton:hover {\n  background: #4f46e5;\n  box-shadow: 0 0 15px #6366f1;\n  transform: translateY(-2px);\n}');
  const [jsCode, setJsCode] = useState('const btn = document.getElementById("magicBtn");\n\nbtn.addEventListener("click", () => {\n  btn.innerText = "Magic Initiated! 🚀";\n  btn.style.background = "#10b981";\n  btn.style.boxShadow = "0 0 20px #10b981";\n  \n  setTimeout(() => {\n    btn.innerText = "Click for Magic";\n    btn.style.background = "#6366f1";\n    btn.style.boxShadow = "none";\n  }, 2000);\n});');

  const [srcDoc, setSrcDoc] = useState('');

  // Debounce logic: Update iframe 500ms after user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // Support "Tab" key indentation in textarea
  const handleKeyDown = (e, codeType) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      
      if (codeType === 'html') setHtmlCode(newValue);
      if (codeType === 'css') setCssCode(newValue);
      if (codeType === 'js') setJsCode(newValue);

      // Move cursor after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Download code as index.html
  const handleDownload = () => {
    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NameDotify Export</title>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>${jsCode}<\/script>
</body>
</html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'namedotify-project.html';
    a.click();
    URL.revokeObjectURL(url);
    
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clearEditor = () => {
    if(confirm('Are you sure you want to clear all code?')) {
        setHtmlCode(''); setCssCode(''); setJsCode('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-800 font-sans pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200 shadow-sm">
                <Code2 size={14} className="mr-2" /> Live Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
                HTML, CSS & JS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Editor</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Write, test, and preview front-end code in real-time. No setup required.
            </p>
        </header>

        {/* --- MAIN IDE WORKSPACE --- */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-16">
            
            {/* Top Toolbar */}
            <div className="bg-[#0d1117] border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-slate-300 font-bold tracking-wider text-sm flex items-center gap-2">
                        <Monitor size={16} className="text-indigo-400"/> NameDotify Studio
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={clearEditor} className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition">
                        <RefreshCw size={14}/> Clear
                    </button>
                    <button onClick={handleDownload} className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition ${isCopied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
                        {isCopied ? <CheckCircle size={14}/> : <Download size={14}/>} {isCopied ? 'Exported!' : 'Export .html'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* LEFT: CODE EDITORS */}
                <div className="border-r border-slate-800 bg-[#0d1117] flex flex-col h-[500px] lg:h-[600px]">
                    
                    {/* Editor Tabs */}
                    <div className="flex bg-[#161b22] border-b border-slate-800 overflow-x-auto hide-scrollbar">
                        <button onClick={() => setActiveTab('html')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition ${activeTab === 'html' ? 'border-orange-500 text-orange-400 bg-[#0d1117]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                            <FileCode size={16}/> index.html
                        </button>
                        <button onClick={() => setActiveTab('css')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition ${activeTab === 'css' ? 'border-blue-500 text-blue-400 bg-[#0d1117]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                            <Paintbucket size={16}/> style.css
                        </button>
                        <button onClick={() => setActiveTab('js')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition ${activeTab === 'js' ? 'border-yellow-500 text-yellow-400 bg-[#0d1117]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                            <Terminal size={16}/> script.js
                        </button>
                    </div>

                    {/* Textarea Area */}
                    <div className="flex-1 relative p-4">
                        {activeTab === 'html' && (
                            <textarea 
                                value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} onKeyDown={(e) => handleKeyDown(e, 'html')}
                                className="w-full h-full bg-transparent text-orange-200 font-mono text-sm sm:text-base outline-none resize-none custom-scroll placeholder-slate-700"
                                placeholder="" spellCheck="false"
                            />
                        )}
                        {activeTab === 'css' && (
                            <textarea 
                                value={cssCode} onChange={(e) => setCssCode(e.target.value)} onKeyDown={(e) => handleKeyDown(e, 'css')}
                                className="w-full h-full bg-transparent text-blue-200 font-mono text-sm sm:text-base outline-none resize-none custom-scroll placeholder-slate-700"
                                placeholder="/* Write your CSS here */" spellCheck="false"
                            />
                        )}
                        {activeTab === 'js' && (
                            <textarea 
                                value={jsCode} onChange={(e) => setJsCode(e.target.value)} onKeyDown={(e) => handleKeyDown(e, 'js')}
                                className="w-full h-full bg-transparent text-yellow-200 font-mono text-sm sm:text-base outline-none resize-none custom-scroll placeholder-slate-700"
                                placeholder="// Write your JavaScript here" spellCheck="false"
                            />
                        )}
                    </div>
                </div>

                {/* RIGHT: LIVE PREVIEW IFRAME */}
                <div className="bg-white flex flex-col h-[500px] lg:h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 shadow-sm pointer-events-none">
                        <Play size={14} className="text-green-400"/> Live Preview
                    </div>
                    
                    {/* The magical iframe */}
                    <iframe 
                        srcDoc={srcDoc}
                        title="Live Preview"
                        sandbox="allow-scripts"
                        className="w-full h-full border-none bg-white"
                    />
                </div>

            </div>
        </div>

        {/* --- SEO ARTICLE & CONTENT --- */}
        <article className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200 mt-16 prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Your Ultimate Browser-Based Code Playground</h2>
            <p className="text-slate-600 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-12">
                Whether you're a frontend developer prototyping a new UI component, or a beginner learning HTML, our <strong>Live Code Editor</strong> provides an instant, zero-setup environment. Write code and see the results update instantly without ever hitting refresh.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition duration-300">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4"><Zap size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Real-Time Compilation</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Our advanced debounce engine compiles your HTML, CSS, and JS milliseconds after you stop typing, creating a seamless live preview experience.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition duration-300">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-4"><Shield size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Safe Sandbox</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Your code runs securely inside an isolated sandbox iframe. Feel free to test experimental JavaScript logic safely inside your browser.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition duration-300">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4"><Download size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">1-Click Export</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Done building your project? Click the Export button to instantly download your entire project bundled neatly into a single <code>index.html</code> file.</p>
                </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 not-prose">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Blocks className="text-blue-600"/> Pro Tips for Developers
                </h3>
                <ul className="space-y-4 text-slate-700">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Tab Indentation:</strong> The editor supports full <code>Tab</code> key indentation. Pressing tab inserts 2 spaces, keeping your code clean.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>External Libraries:</strong> You can include external CDN libraries (like Tailwind CSS, Bootstrap, or jQuery) directly within the HTML editor's <code>&lt;head&gt;</code> tag.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Console Testing:</strong> Need to see JS errors? Open your browser's native Developer Tools (F12) to inspect the preview frame's console output.</div>
                    </li>
                </ul>
            </div>
        </article>

      </div>
      
      {/* Scrollbar CSS for Code Editor */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #475569; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}