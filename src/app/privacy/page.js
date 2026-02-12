"use client";
import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle, Info, Mail } from 'lucide-react';

export default function PrivacyPage() {
  
  // ✅ Advanced JSON-LD Schema (Legal Page)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | NameDotify',
    url: 'https://namedotify.com/privacy',
    description: 'Privacy Policy for NameDotify (A unit of SNERIC PACIFIC LLP). Learn how we collect data and use affiliate links.',
    publisher: {
      '@type': 'Organization',
      name: 'SNERIC PACIFIC LLP',
      subOrganization: {
        '@type': 'Organization',
        name: 'NameDotify'
      },
      logo: {
        '@type': 'ImageObject',
        url: 'https://namedotify.com/logo.png'
      }
    }
  };

  return (
    // ✅ UI: Consistent Padding (pt-28)
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ SEO Meta Tags */}
      <title>Privacy Policy & Affiliate Disclosure | NameDotify</title>
      <meta name="description" content="Privacy Policy for NameDotify. Details on data collection, Google AdSense, and Affiliate links. NameDotify is a property of SNERIC PACIFIC LLP." />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200">
                <Shield size={14} className="mr-2" /> Legal Document
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                Privacy Policy
            </h1>
            <p className="text-gray-500 text-lg">
                Last Updated: <span className="font-bold text-gray-900">February 2026</span>
            </p>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none leading-relaxed">
            
            <p className="lead text-lg text-gray-600">
                Welcome to <strong>NameDotify</strong>, a digital property owned and operated by <strong>SNERIC PACIFIC LLP</strong>. 
                Accessible from <a href="https://namedotify.com">https://namedotify.com</a>, one of our main priorities is the privacy of our visitors. 
                This Privacy Policy document contains types of information that is collected and recorded by NameDotify and how we use it.
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 my-8 not-prose">
                <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-2">
                    <Lock size={20}/> Consent & Acceptance
                </h3>
                <p className="text-blue-800 text-sm">
                    By using our website, tools, or services, you hereby consent to our Privacy Policy and agree to its terms.
                </p>
            </div>

            <h3>1. Information We Collect</h3>
            <p>
                NameDotify is a free tool provider. We generally <strong>do not require you to create an account</strong> to use our services (such as DNS Checker, Whois, or Font Generator).
            </p>
            <ul>
                <li><strong>Log Files:</strong> Like many other websites, we use log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</li>
                <li><strong>Search Data:</strong> When you use our Domain Generator or Whois tool, the keywords or domains you search for are processed to provide results but are generally not permanently stored linked to your personal identity.</li>
            </ul>

            <h3>2. Advertising & Affiliate Disclosure</h3>
            <p>
                To keep our tools 100% free for users, <strong>SNERIC PACIFIC LLP</strong> (via NameDotify) engages in monetization partnerships.
            </p>
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 not-prose mb-6">
                <h4 className="font-bold text-yellow-900 flex items-center gap-2 mb-2">
                    <Info size={18}/> Monetization Methods
                </h4>
                <ul className="text-sm text-yellow-800 space-y-2 list-disc pl-5">
                    <li><strong>Google AdSense:</strong> We display third-party advertisements provided by Google. Google uses cookies (DART cookies) to serve ads based on your visit to this site and other sites on the internet.</li>
                    <li><strong>Affiliate Links:</strong> We participate in affiliate programs (e.g., Hostinger, Namecheap). If you click on a "Buy Domain" or "Hosting" link and make a purchase, we may earn a referral commission at <strong>no extra cost to you</strong>.</li>
                    <li><strong>Sponsored Content:</strong> Occasionally, we may feature sponsored tools or links. These will be clearly identified as such.</li>
                </ul>
            </div>

            <h3>3. How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
                <li>Provide, operate, and maintain our website tools.</li>
                <li>Improve, personalize, and expand our website content.</li>
                <li>Analyze and understand how you use our website (e.g., Google Analytics).</li>
                <li>Detect and prevent fraud or abuse of our APIs.</li>
            </ul>

            <h3>4. Cookies and Web Beacons</h3>
            <p>
                NameDotify uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. 
                The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h3>5. Third Party Privacy Policies</h3>
            <p>
                NameDotify's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers (like Google) for more detailed information. 
                It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <h3>6. GDPR Data Protection Rights</h3>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> The right to access</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> The right to rectification</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> The right to erasure</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> The right to restrict processing</li>
            </ul>

            <h3>7. Children's Information</h3>
            <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                NameDotify does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
                <p className="text-gray-600 mb-4">
                    If you have any questions about our Privacy Policy, the practices of this site, or your dealings with <strong>SNERIC PACIFIC LLP</strong>, please contact us at:
                </p>
                <a href="mailto:contact@namedotify.com" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition">
                    <Mail size={18} /> contact@namedotify.com
                </a>
            </div>

        </div>
      </div>
    </div>
  );
}