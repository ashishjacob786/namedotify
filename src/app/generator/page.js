import React from 'react';
import NameGeneratorClient from './NameGeneratorClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free AI Business Name Generator 2026 | Brand Name Ideas | NameDotify.com',
  description: 'Generate 1000+ catchy business name ideas instantly with our AI Name Generator. Check domain availability for .com, .io, and more. 100% Free.',
  keywords: ['business name generator', 'brand name generator', 'startup names', 'domain name generator', 'ai company names'],
  openGraph: {
    title: 'AI Business Name Generator | NameDotify.com',
    description: 'Find the perfect name for your startup. Free AI-powered generator.',
    type: 'website',
    url: 'https://namedotify.com/generator',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp & Breadcrumbs)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Business Name Generator",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "url": "https://namedotify.com/generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Generate creative, catchy, and available business name ideas instantly with AI."
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
          "name": "Business Name Generator",
          "item": "https://namedotify.com/generator"
        }
      ]
    }
  ]
};

export default function NameGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NameGeneratorClient />
    </>
  );
}