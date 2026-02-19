import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tracker from '../components/Tracker'; // ✅ 1. Tracker को इम्पोर्ट किया

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
      {/* bg-gray-50 को body पर सेट किया है ताकि पूरी स्क्रीन का बेस कलर एक जैसा रहे */}
      <body className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen">
        
        {/* ✅ 2. Tracker Component यहाँ लगा दिया (ये छुपकर बैकग्राउंड में काम करेगा) */}
        <Tracker /> 
        
        <Navbar />
        {/* flex-grow का इस्तेमाल किया है ताकि footer हमेशा नीचे रहे, और padding हटा दी है */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}