import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">namedotify.com</h3>
                <p className="text-gray-500 text-sm">
                    Professional domain tools for webmasters, developers, and business owners.
                </p>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Tools</h3>
                <ul className="space-y-3">
                    <li><Link href="/" className="text-base text-gray-500 hover:text-blue-600">Domain Search</Link></li>
                    <li><Link href="/whois" className="text-base text-gray-500 hover:text-blue-600">Whois Lookup</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Legal</h3>
                <ul className="space-y-3">
                    <li><a href="#" className="text-base text-gray-500 hover:text-blue-600">Privacy Policy</a></li>
                    <li><a href="#" className="text-base text-gray-500 hover:text-blue-600">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex justify-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Namedotify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}