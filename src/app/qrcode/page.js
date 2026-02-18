import React from 'react';
import QrClient from './QrClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Custom QR Code Generator with Logo | NameDotify.com',
  description: 'Create professional QR codes with your logo, colors, and frames. Perfect for WiFi, URLs, and Business Cards. Download high-quality PNGs for free.',
  keywords: ['qr code generator', 'custom qr code', 'qr code with logo', 'wifi qr code', 'free qr code maker', 'hd qr code'],
  openGraph: {
    title: 'Pro QR Code Studio | NameDotify.com',
    description: 'Design custom QR codes with logos and colors instantly.',
    url: 'https://namedotify.com/qrcode',
    siteName: 'NameDotify',
    type: 'website',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Pro QR Studio",
      "operatingSystem": "Web",
      "applicationCategory": "DesignApplication",
      "url": "https://namedotify.com/qrcode",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Create professional custom QR codes with logos, colors, and frames. Supports URL, WiFi, and Text. Download in HD PNG."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I add a logo to my QR code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our tool allows you to upload a custom logo which is placed in the center of the QR code without affecting scannability."
          }
        },
        {
          "@type": "Question",
          "name": "Do these QR codes expire?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, the QR codes generated here are static and will work forever as long as the link or content remains valid."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://namedotify.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "QR Code Generator",
          "item": "https://namedotify.com/qrcode"
        }
      ]
    }
  ]
};

export default function QrPage() {
  return (
    <>
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Client Component Load (UI & Logic) */}
      <QrClient />
    </>
  );
}