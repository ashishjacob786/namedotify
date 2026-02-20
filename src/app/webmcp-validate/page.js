import React from 'react';
import WebMCPClient from './WebMCPClient';

export const metadata = {
  title: 'WebMCP Validator & AI Agent Readiness Checker | NameDotify',
  description: 'First on the internet! Check if your website is WebMCP (Web Model Context Protocol) compliant. Validate Imperative and Declarative APIs for AI Agents like Claude & ChatGPT.',
  keywords: ['WebMCP Validator', 'Web Model Context Protocol', 'AI Agent Readiness Checker', 'SEO for AI', 'modelContext API', 'Agentic Web', 'NameDotify'],
  openGraph: {
    title: 'WebMCP Validator | Make Your Website AI-Ready',
    description: 'Scan your website for WebMCP compliance and get actionable insights to make it AI Agent friendly.',
    url: 'https://namedotify.com/webmcp-validator',
    type: 'website',
  },
};

export default function WebMCPValidatorPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NameDotify WebMCP Validator",
    "url": "https://namedotify.com/webmcp-validator",
    "applicationCategory": "DeveloperApplication",
    "description": "The internet's first advanced tool to scan and validate websites for Web Model Context Protocol (WebMCP) and AI Agent readiness.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            World's First WebMCP Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
            WebMCP <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Validator</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            The era of AI Agents is here. Scan your website to see if it supports the Web Model Context Protocol and is ready for AI-driven interactions.
          </p>
        </div>

        {/* Client Application */}
        <WebMCPClient />

        {/* Content & SEO Section */}
        <div className="mt-24 max-w-4xl mx-auto prose prose-indigo">
          <h2 className="text-3xl font-black text-gray-900 border-b pb-4">What is WebMCP? (The Future of SEO)</h2>
          <p className="text-gray-600 mt-4 text-lg">
            <strong>Web Model Context Protocol (WebMCP)</strong> is a revolutionary standard that allows websites to directly communicate their functions, buttons, and APIs to AI Agents (like Claude, Gemini, and ChatGPT). 
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            Instead of an AI "reading" your website like a human, WebMCP provides a direct <strong>Declarative API</strong> and <strong>Imperative API</strong> (`navigator.modelContext`), saving computational tokens and making actions instant. If your site isn't WebMCP compliant, AI agents will struggle to recommend your products or services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Declarative API</h3>
              <p className="text-gray-600">Handles static HTML functions, meta tags, and semantic structures so AI can read your content perfectly.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Imperative API</h3>
              <p className="text-gray-600">Utilizes JavaScript (`navigator.modelContext`) for dynamic actions like adding to cart, filtering products, and live pricing.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}