import React from 'react';
import FontClient from './FontClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Fancy Font Generator (Copy & Paste) | NameDotify.com',
  description: 'Generate 10000+ stylish, cool, and fancy fonts for Instagram, Twitter, and TikTok bios. Instant copy & paste font changer tool.',
  keywords: ['font generator', 'fancy text generator', 'instagram font changer', 'cool fonts copy paste', 'stylish text maker', 'bio fonts'],
  openGraph: {
    title: 'Fancy Font Generator | NameDotify.com',
    description: 'Copy & paste stylish fonts for your Instagram Bio.',
    type: 'website',
    url: 'https://namedotify.com/fonts-generator',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Fancy Font Generator",
      "operatingSystem": "Web",
      "applicationCategory": "DesignApplication",
      "url": "https://namedotify.com/fonts-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Generate 100+ stylish, cool, and fancy fonts for Instagram, Twitter, and TikTok bios. Instant copy & paste font changer."
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
          "name": "Font Generator",
          "item": "https://namedotify.com/fonts-generator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to change fonts on Instagram Bio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply type your text in our generator, pick a style you like, click copy, and paste it into your Instagram profile bio."
          }
        },
        {
          "@type": "Question",
          "name": "Are these fonts free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all generated fonts are Unicode characters which are free to use on social media, games, and messaging apps."
          }
        }
      ]
    }
  ]
};

export default function FontGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FontClient />
    </>
  );
}