import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ✅ CHANGE HERE: Title & Description
export const metadata = {
  title: 'NameDotify - Free Domain & SEO Tools',
  description: 'NameDotify offers free tools for domain search, AI name generation, DNS lookup, Whois, IP checking, and QR code creation.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}