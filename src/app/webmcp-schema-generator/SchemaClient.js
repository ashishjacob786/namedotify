"use client";
import React, { useState, useEffect } from 'react';
import { Code2, Copy, CheckCircle, Plus, Trash2, Globe, FileJson, Sparkles, Bot, TerminalSquare } from 'lucide-react';

export default function SchemaClient() {
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tools, setTools] = useState([
    { name: 'search_products', description: 'Search for products on the store.', url: '/api/search' }
  ]);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);

  // 🤖 WEBMCP REGISTRATION FOR AI AGENTS
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator && 'modelContext' in window.navigator) {
      try {
        window.navigator.modelContext.registerTool({
          name: "generate_webmcp_schema",
          description: "Generates a WebMCP compliant JSON manifest based on website details.",
          parameters: {
            type: "object",
            properties: {
              siteName: { type: "string" },
              siteUrl: { type: "string" },
              description: { type: "string" }
            },
            required: ["siteName", "siteUrl", "description"]
          },
          handler: async (params) => {
            setSiteName(params.siteName);
            setSiteUrl(params.siteUrl);
            setDescription(params.description);
            return { status: "success", message: "Schema generated in the UI." };
          }
        });
      } catch (err) { console.error("WebMCP Auth failed"); }
    }
  }, []);

  const addTool = () => {
    setTools([...tools, { name: '', description: '', url: '' }]);
  };

  const updateTool = (index, field, value) => {
    const newTools = [...tools];
    newTools[index][field] = value;
    setTools(newTools);
  };

  const removeTool = (index) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  // --- LIVE CODE GENERATION ---
  const generatedJSON = {
    "schema_version": "1.0",
    "agent_access": "allowed",
    "website": {
      "name": siteName || "Your Website Name",
      "url": siteUrl || "https://yourwebsite.com",
      "description": description || "Description of what your website does."
    },
    "imperative_api": {
      "supported": tools.length > 0,
      "registered_tools": tools.filter(t => t.name).map(t => ({
        "name": t.name,
        "description": t.description,
        "endpoint_hint": t.url
      }))
    }
  };

  const generatedMeta = `<meta name="agent-mode" content="ready" />
<meta name="webmcp" content="allow" />
<meta name="webmcp-manifest" content="${siteUrl || 'https://yourwebsite.com'}/.well-known/webmcp.json" />
<link rel="agent-manifest" href="/.well-known/webmcp.json" />`;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'json') { setCopiedManifest(true); setTimeout(() => setCopiedManifest(false), 2000); }
    else { setCopiedMeta(true); setTimeout(() => setCopiedMeta(false), 2000); }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      
      {/* LEFT PANEL: INPUT FORM */}
      <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
          <div className="bg-violet-100 p-3 rounded-xl text-violet-600"><Bot size={24} /></div>
          <h2 className="text-2xl font-black text-gray-900">Site Configuration</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Website Name</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="e.g. NameDotify" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Website URL</label>
            <input type="url" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="https://namedotify.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">AI Description <span className="text-xs text-gray-400 font-normal">(Tell AI what your site does)</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="An advanced suite of SEO and developer tools..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition resize-none"></textarea>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-bold text-gray-900">AI Agent Tools (Imperative APIs)</label>
              <button onClick={addTool} className="text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-violet-100 transition"><Plus size={14}/> Add Tool</button>
            </div>
            
            <div className="space-y-4">
              {tools.map((tool, index) => (
                <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative group">
                  <button onClick={() => removeTool(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input type="text" placeholder="Tool Name (e.g. check_seo)" value={tool.name} onChange={(e) => updateTool(index, 'name', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-500" />
                    <input type="text" placeholder="Endpoint (e.g. /api/seo)" value={tool.url} onChange={(e) => updateTool(index, 'url', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-500" />
                  </div>
                  <input type="text" placeholder="Description of what this tool does..." value={tool.description} onChange={(e) => updateTool(index, 'description', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-500" />
                </div>
              ))}
              {tools.length === 0 && <p className="text-sm text-gray-400 text-center py-2">No tools added. AI will only have read-access.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: LIVE CODE OUTPUT */}
      <div className="w-full lg:w-1/2 space-y-6">
        
        {/* JSON Manifest Block */}
        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
              <FileJson size={18} /> /.well-known/webmcp.json
            </div>
            <button onClick={() => handleCopy(JSON.stringify(generatedJSON, null, 2), 'json')} className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg transition">
              {copiedManifest ? <CheckCircle size={14} className="text-emerald-400"/> : <Copy size={14}/>} {copiedManifest ? 'Copied!' : 'Copy JSON'}
            </button>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
              <span className="text-pink-400">{"{"}</span>{`
  `}
              <span className="text-blue-400">"schema_version"</span>: <span className="text-emerald-400">"1.0"</span>,{`
  `}
              <span className="text-blue-400">"agent_access"</span>: <span className="text-emerald-400">"allowed"</span>,{`
  `}
              <span className="text-blue-400">"website"</span>: <span className="text-pink-400">{"{"}</span>{`
    `}
              <span className="text-blue-400">"name"</span>: <span className="text-emerald-400">"{generatedJSON.website.name}"</span>,{`
    `}
              <span className="text-blue-400">"url"</span>: <span className="text-emerald-400">"{generatedJSON.website.url}"</span>,{`
    `}
              <span className="text-blue-400">"description"</span>: <span className="text-emerald-400">"{generatedJSON.website.description}"</span>{`
  `}
              <span className="text-pink-400">{"}"}</span>,{`
  `}
              <span className="text-blue-400">"imperative_api"</span>: <span className="text-pink-400">{"{"}</span>{`
    `}
              <span className="text-blue-400">"supported"</span>: <span className="text-orange-400">{generatedJSON.imperative_api.supported.toString()}</span>,{`
    `}
              <span className="text-blue-400">"registered_tools"</span>: <span className="text-yellow-400">{"["}</span>
              {generatedJSON.imperative_api.registered_tools.map((t, i) => `\n      {
        "name": "${t.name}",
        "description": "${t.description}",
        "endpoint_hint": "${t.endpoint_hint}"
      }${i === generatedJSON.imperative_api.registered_tools.length - 1 ? '' : ','}`)}
{`    `}
              <span className="text-yellow-400">{"]"}</span>{`
  `}
              <span className="text-pink-400">{"}"}</span>{`
`}<span className="text-pink-400">{"}"}</span>
            </pre>
          </div>
        </div>

        {/* HTML Meta Tags Block */}
        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-sm font-bold">
              <TerminalSquare size={18} /> HTML &lt;head&gt; Tags
            </div>
            <button onClick={() => handleCopy(generatedMeta, 'meta')} className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg transition">
              {copiedMeta ? <CheckCircle size={14} className="text-emerald-400"/> : <Copy size={14}/>} {copiedMeta ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
              <span className="text-slate-500">&lt;!-- WebMCP Declarative Meta Tags --&gt;</span><br/>
              <span className="text-pink-400">&lt;meta</span> <span className="text-blue-300">name</span>=<span className="text-emerald-400">"agent-mode"</span> <span className="text-blue-300">content</span>=<span className="text-emerald-400">"ready"</span> <span className="text-pink-400">/&gt;</span><br/>
              <span className="text-pink-400">&lt;meta</span> <span className="text-blue-300">name</span>=<span className="text-emerald-400">"webmcp"</span> <span className="text-blue-300">content</span>=<span className="text-emerald-400">"allow"</span> <span className="text-pink-400">/&gt;</span><br/>
              <span className="text-pink-400">&lt;meta</span> <span className="text-blue-300">name</span>=<span className="text-emerald-400">"webmcp-manifest"</span> <span className="text-blue-300">content</span>=<span className="text-emerald-400">"{siteUrl || 'https://yourwebsite.com'}/.well-known/webmcp.json"</span> <span className="text-pink-400">/&gt;</span><br/>
              <span className="text-pink-400">&lt;link</span> <span className="text-blue-300">rel</span>=<span className="text-emerald-400">"agent-manifest"</span> <span className="text-blue-300">href</span>=<span className="text-emerald-400">"/.well-known/webmcp.json"</span> <span className="text-pink-400">/&gt;</span>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}