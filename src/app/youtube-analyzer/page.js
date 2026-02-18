import React from 'react';
import YoutubeClient from './YoutubeClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'YouTube SEO Analyzer & Tag Extractor | NameDotify Tools',
  description: 'Extract hidden YouTube video tags, analyze SEO performance, download HD thumbnails, and calculate engagement rates. The ultimate free tool for YouTubers.',
  keywords: ['youtube tag extractor', 'youtube seo analyzer', 'youtube thumbnail downloader', 'extract video tags', 'youtube engagement calculator', 'youtube keyword tool'],
  openGraph: {
    title: 'Advanced YouTube SEO Analyzer & Tag Extractor | NameDotify',
    description: 'Spy on your competitors. Extract hidden tags and analyze the SEO of any YouTube video instantly.',
    url: 'https://namedotify.com/youtube-analyzer',
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
      "name": "NameDotify YouTube SEO Analyzer",
      "operatingSystem": "Web",
      "applicationCategory": "MarketingApplication",
      "url": "https://namedotify.com/youtube-analyzer",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Analyze YouTube videos to extract hidden tags, view engagement metrics, and download high-resolution thumbnails."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I find hidden tags on a YouTube video?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply paste the YouTube video URL into our Tag Extractor tool. It uses the official YouTube Data API to securely fetch and display all the hidden keywords the creator used."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good YouTube engagement rate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good YouTube engagement rate (Likes + Comments divided by Views) is generally between 2% and 5%. Anything above 5% is considered excellent and highly optimized."
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
          "name": "YouTube Analyzer",
          "item": "https://namedotify.com/youtube-analyzer"
        }
      ]
    }
  ]
};

export default function YoutubeAnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <YoutubeClient />
    </>
  );
}