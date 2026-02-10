"use client";
import React from 'react';
import { ScrollText, Shield, AlertCircle, FileText, CheckCircle, Scale } from 'lucide-react';

export default function TermsPage() {
  
  // ✅ JSON-LD Schema (Terms of Service)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    url: 'https://namedotify.com/terms',
    description: 'Terms and Conditions for using NameDotify services.',
    publisher: {
      '@type': 'Organization',
      name: 'NameDotify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://namedotify.com/logo.png'
      }
    }
  };

  return (
    // ✅ FIX: 'pt-24' added to prevent black strip
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Scale size={12} className="mr-1" /> User Agreement
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Terms of Service
            </h1>
            <p className="text-gray-500 text-sm">
                Effective Date: <span className="font-semibold text-gray-900">February 1, 2026</span>
            </p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-indigo max-w-none">
            
            <p className="lead text-lg text-gray-600">
                Welcome to <strong>NameDotify</strong>! These terms and conditions outline the rules and regulations for the use of NameDotify's Website, located at https://namedotify.com.
            </p>

            <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 my-8 not-prose">
                <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-2">
                    <ScrollText size={20}/> Acceptance of Terms
                </h3>
                <p className="text-indigo-800 text-sm">
                    By accessing this website, we assume you accept these terms and conditions. Do not continue to use NameDotify if you do not agree to take all of the terms and conditions stated on this page.
                </p>
            </div>

            <h3>1. License to Use</h3>
            <p>
                Unless otherwise stated, NameDotify and/or its licensors own the intellectual property rights for all material on NameDotify. All intellectual property rights are reserved. You may access this from NameDotify for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
                <li>Republish material from NameDotify</li>
                <li>Sell, rent, or sub-license material from NameDotify</li>
                <li>Reproduce, duplicate or copy material from NameDotify</li>
                <li>Redistribute content from NameDotify (unless content is specifically made for redistribution like QR Codes).</li>
            </ul>

            <h3>2. User Representations</h3>
            <p>
                By using our Tools (Domain Generator, DNS Checker, etc.), you represent and warrant that:
            </p>
            <ul>
                <li>You will not use the tools for any illegal or unauthorized purpose.</li>
                <li>You will not use automated scripts to scrape or burden our servers ("DDoS" or "Spamming").</li>
                <li>Your use of the Service will not violate any applicable law or regulation.</li>
            </ul>

            <h3>3. Disclaimer</h3>
            <p>
                The materials on NameDotify's website are provided on an 'as is' basis. NameDotify makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3>4. Limitations</h3>
            <p>
                In no event shall NameDotify or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NameDotify's website.
            </p>

            <h3>5. Accuracy of Materials</h3>
            <p>
                The materials appearing on NameDotify's website could include technical, typographical, or photographic errors. NameDotify does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>

            <h3>6. Links to Other Websites</h3>
            <p>
                Our Service may contain links to third-party web sites or services (e.g., Domain Registrars, Hosting Providers) that are not owned or controlled by NameDotify.
                NameDotify has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
            </p>

            <h3>7. Modifications</h3>
            <p>
                NameDotify may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h3>8. Governing Law</h3>
            <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                    If you have any questions about these Terms, please contact us at <a href="mailto:support@namedotify.com" className="text-indigo-600 font-bold hover:underline">support@namedotify.com</a>.
                </p>
            </div>

        </div>

      </div>
    </div>
  );
}