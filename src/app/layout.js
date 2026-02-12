import './globals.css';
import Navbar from '../components/Navbar'; // Path check kar lena agar '@/components/Navbar' ho
import Footer from '../components/Footer';

// ✅ GLOBAL SEO METADATA
export const metadata = {
  metadataBase: new URL('https://namedotify.com'), // Base URL set karna zaruri hai
  title: {
    default: 'NameDotify - Free Domain & SEO Tools',
    template: '%s | NameDotify', // Har page ke title ke piche "| NameDotify" apne aap lag jayega
  },
  description: 'NameDotify offers free tools for domain search, AI name generation, DNS lookup, Whois, IP checking, and QR code creation.',
  
  // ✅ GOOGLE SEARCH CONSOLE VERIFICATION CODE
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
        <Navbar />
        <main className="flex-grow pt-24 pb-10"> {/* Padding added for fixed navbar */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}