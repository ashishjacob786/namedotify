import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tracker from '../components/Tracker'; 
import Link from 'next/link'; // ✅ Link इम्पोर्ट किया
import { Lock } from 'lucide-react'; // ✅ Icon इम्पोर्ट किया

// ✅ GLOBAL SEO METADATA
export const metadata = {
  metadataBase: new URL('https://namedotify.com'),
  title: {
    default: 'NameDotify - Free Domain & SEO Tools',
    template: '%s | NameDotify',
  },
  description: 'NameDotify offers free tools for domain search, AI name generation, DNS lookup, Whois, IP checking, and QR code creation.',
  
  // ✅ GOOGLE SEARCH CONSOLE VERIFICATION
  verification: {
    google: 'ZLV90YEZ61_KAe8AiWyOiZjrhoRlv6QZgTEXz21jt-A',
  },
  
  icons: {
    icon: '/favicon.ico',
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://namedotify.com',
    siteName: 'NameDotify',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen">
        
        <Tracker /> 

        {/* ✅ SLEEK TOP-BAR FOR ADMIN LOGIN */}
        <div className="bg-slate-900 text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-medium flex justify-end tracking-wider relative z-50">
            <Link href="/admin/dashboard" className="flex items-center gap-1.5 hover:text-white transition duration-200">
                <Lock size={12} /> Admin Login
            </Link>
        </div>
        
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}