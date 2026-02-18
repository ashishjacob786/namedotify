import React from 'react';
import SpeedTestClient from './SpeedTestClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Internet Speed Test - Check WiFi & Mobile Data Speed | NameDotify',
  description: 'Test your internet connection bandwidth to locations around the world with this interactive broadband speed test. Check Download, Upload, and Ping instantly.',
  keywords: ['internet speed test', 'wifi speed test', 'broadband speed checker', 'ping test', 'download speed', 'upload speed checker', 'free speed test'],
  openGraph: {
    title: 'Live Internet Speed Test | NameDotify',
    description: 'Check your true internet speed in seconds. Accurate Ping, Download, and Upload metrics.',
    url: 'https://namedotify.com/speed-test',
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
      "name": "NameDotify Speed Test",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "url": "https://namedotify.com/speed-test",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Accurately measure your internet performance including download speed, upload speed, and ping latency."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good internet speed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good internet speed depends on your usage. For basic web browsing, 10-25 Mbps is sufficient. For 4K video streaming and online gaming, 50-100 Mbps or higher is recommended."
          }
        },
        {
          "@type": "Question",
          "name": "What is Ping or Latency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ping (Latency) is the reaction time of your connection. It is how fast you get a response after you've sent out a request. A lower ping (under 50ms) is better, especially for online gaming."
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
          "name": "Internet Speed Test",
          "item": "https://namedotify.com/speed-test"
        }
      ]
    }
  ]
};

export default function SpeedTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SpeedTestClient />
    </>
  );
}