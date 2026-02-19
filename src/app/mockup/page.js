import React from 'react';
import MockupClient from './MockupClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free 3D Mockup Generator & Screenshot Beautifier | NameDotify',
  description: 'Turn boring screenshots into viral 3D mockups. Add iPhone 15, macOS, and Windows frames instantly. Free, no watermark, browser-based tool.',
  keywords: ['screenshot mockup', '3d device generator', 'macbook mockup free', 'iphone frame generator', 'twitter image maker'],
  openGraph: {
    title: 'NameDotify Mockup Studio - Free Screenshot Beautifier',
    description: 'Create stunning device mockups for your social media and landing pages in seconds.',
    url: 'https://namedotify.com/mockup',
    siteName: 'NameDotify',
    type: 'website',
  },
};

// ✅ 2. Advanced JSON-LD Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NameDotify Mockup Studio',
  url: 'https://namedotify.com/mockup',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web Browser',
  description: 'Free online screenshot beautifier and 3D mockup generator. Create iPhone, macOS, and Windows mockups instantly.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: '3D Tilt, High Resolution Export, Custom Backgrounds, iPhone 15 Frames'
};

export default function MockupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MockupClient />
    </>
  );
}