"use client";
import React from 'react';
import { Mail, MessageSquare, LifeBuoy, ExternalLink, MapPin, HeartHandshake } from 'lucide-react';

export default function ContactPage() {
  
  // ✅ Advanced JSON-LD Schema (ContactPage)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NameDotify',
    url: 'https://namedotify.com/contact',
    description: 'Contact NameDotify support team for inquiries, bug reports, and partnerships.',
    mainEntity: {
      '@type': 'Organization',
      name: 'NameDotify',
      email: 'contact@namedotify.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@namedotify.com',
        contactType: 'customer support',
        availableLanguage: ['English', 'Hindi']
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                <MessageSquare size={12} className="mr-1" /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Contact Our Team
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Have a question, found a bug, or want to partner with us? 
                We'd love to hear from you.
            </p>
        </div>

        {/* Main Email Card (The Hero) */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-50 border border-blue-50 text-center mb-12 transform hover:scale-[1.01] transition duration-300">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Us Directly</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                The best way to reach us is via email. We typically respond within 24-48 hours.
            </p>
            
            <a 
                href="mailto:contact@namedotify.com" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 gap-2"
            >
                <Mail size={20} /> contact@namedotify.com
            </a>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Support Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-xl">
                    <LifeBuoy className="text-orange-600 w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Technical Support</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-3">
                        Found a bug in our Domain Generator or DNS tools? Let us know.
                    </p>
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        Subject: [Bug Report]
                    </span>
                </div>
            </div>

            {/* Partnership Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-xl">
                    <HeartHandshake className="text-green-600 w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Partnerships</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-3">
                        Interested in advertising or integrating our API?
                    </p>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        Subject: [Partnership]
                    </span>
                </div>
            </div>

        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                <MapPin size={14} /> Based in New Delhi, India
            </p>
        </div>

      </div>
    </div>
  );
}