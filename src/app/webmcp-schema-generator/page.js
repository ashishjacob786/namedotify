import React from 'react';
import SchemaClient from './SchemaClient';

export const metadata = {
  title: 'WebMCP Schema Generator | Create AI Agent Manifest | NameDotify',
  description: 'Generate WebMCP (Web Model Context Protocol) compliant JSON manifests and Declarative Meta Tags to make your website instantly discoverable by AI Agents like Claude, Gemini, and ChatGPT.',
  keywords: ['WebMCP Schema Generator', 'AI Agent Manifest', 'webmcp.json generator', 'modelContext API schema', 'Declarative AI tags', 'Agentic SEO', 'NameDotify'],
  openGraph: {
    title: 'WebMCP Schema & Manifest Generator | NameDotify',
    description: 'Instantly generate WebMCP code for your website. Prepare your site for the AI Agent revolution.',
    url: 'https://namedotify.com/webmcp-schema-generator',
    type: 'website',
  },
};

export default function WebMCPSchemaPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NameDotify WebMCP Schema Generator",
    "url": "https://namedotify.com/webmcp-schema-generator",
    "applicationCategory": "DeveloperTool",
    "description": "The first advanced tool to generate webmcp.json manifests and declarative HTML meta tags for AI Agent website integration.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-black uppercase tracking-widest mb-4 border border-violet-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Advanced Agent Protocol Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
            WebMCP Schema <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Generator</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Generate the perfect <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-600">.well-known/webmcp.json</code> manifest and Declarative Meta Tags to let AI Agents seamlessly interact with your website.
          </p>
        </div>

        {/* Client Generator Tool */}
        <SchemaClient />

        {/* SEO Content Section */}
        <div className="mt-24 max-w-4xl mx-auto prose prose-violet">
          <h2 className="text-3xl font-black text-gray-900 border-b pb-4">How to Use the WebMCP Manifest?</h2>
          <p className="text-gray-600 mt-4 text-lg">
            Once you generate your WebMCP schema using our advanced tool, you need to implement it correctly so AI Agents can find it. Follow these two simple steps to make your site Agent-Ready:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. The Manifest File</h3>
              <p className="text-gray-600 text-sm mb-4">
                Create a folder named <strong>.well-known</strong> in the root of your domain. Save the generated JSON code as <code>webmcp.json</code> inside this folder.
              </p>
              <code className="text-xs bg-slate-900 text-green-400 p-3 rounded-xl block font-mono">
                https://yourdomain.com/.well-known/webmcp.json
              </code>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Declarative Tags</h3>
              <p className="text-gray-600 text-sm mb-4">
                Copy the generated HTML Meta Tags and paste them inside the <code>&lt;head&gt;</code> section of your website's main layout or index file.
              </p>
              <code className="text-xs bg-slate-900 text-blue-400 p-3 rounded-xl block font-mono">
                &lt;meta name="webmcp" content="allow" /&gt;
              </code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}