import React from 'react';
import EditorClient from './EditorClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Live HTML, CSS & JS Editor | NameDotify Code Studio',
  description: 'Write, test, and preview HTML, CSS, and JavaScript code in real-time. A free, fast, and advanced online code editor like CodePen for developers.',
  keywords: ['live html editor', 'online code editor', 'html css js viewer', 'codepen alternative', 'realtime web compiler', 'test javascript online', 'free web ide'],
  openGraph: {
    title: 'Advanced Live Code Editor & Previewer | NameDotify',
    description: 'Instantly write and preview HTML, CSS, and JS. The ultimate playground for frontend developers.',
    url: 'https://namedotify.com/live-editor',
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
      "name": "NameDotify Live Code Studio",
      "operatingSystem": "Web",
      "applicationCategory": "DeveloperApplication",
      "url": "https://namedotify.com/live-editor",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An advanced, browser-based integrated development environment (IDE) for real-time HTML, CSS, and JavaScript editing and previewing."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this online code editor free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our Live Code Editor is 100% free to use. There are no limitations on the code you can write and test."
          }
        },
        {
          "@type": "Question",
          "name": "Can I save my HTML code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can click the 'Download .html' button to instantly save your combined HTML, CSS, and JavaScript project locally to your computer."
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
          "name": "Live Code Editor",
          "item": "https://namedotify.com/live-editor"
        }
      ]
    }
  ]
};

export default function LiveEditorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EditorClient />
    </>
  );
}