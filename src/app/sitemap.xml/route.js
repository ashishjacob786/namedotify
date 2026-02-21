import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// ✅ Force dynamic rendering so it always fetches fresh data from Database
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://namedotify.com';

  try {
    // 1. डेटाबेस से सारे 'Published' पोस्ट निकालो
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true, featuredImg: true, title: true },
      orderBy: { updatedAt: 'desc' },
    });

    // 2. सिर्फ एक्टिव कैटेगरी निकालो (जिनमें कम से कम 1 पोस्ट हो)
    const categoriesData = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: { id: true },
      where: { status: 'published' }
    });
    const activeCategories = categoriesData.filter(c => c._count.id > 0);

    // 3. आपके सारे फिक्स पेजेस और टूल्स की लिस्ट
    const staticPages = [
      '', '/about', '/contact', '/privacy', '/terms', '/blog',
      '/dns', '/fonts-generator', '/generator', '/hosting', '/ip', '/live-editor',
      '/malware-scanner', '/mockup', '/password', '/qrcode', '/reverse-ip', 
      '/schema-generator', '/seo-auditor', '/signature', '/speed-test', '/ssl', 
      '/status', '/utm-builder', '/webmcp-schema-generator', '/webmcp-validate', 
      '/website-speed', '/whois', '/youtube-analyzer'
    ];

    // 🚀 XML बनाना शुरू करें (Google Image Sitemap Format के साथ)
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // 👉 (A) फिक्स पेजेस और टूल्स ऐड करें
    staticPages.forEach((page) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // 👉 (B) सिर्फ 'भरी हुई' कैटेगरी ऐड करें
    activeCategories.forEach((cat) => {
      // URL में स्पेस को %20 बनाने के लिए encodeURIComponent यूज़ किया है
      const catUrl = `${baseUrl}/blog?category=${encodeURIComponent(cat.category)}`;
      xml += `  <url>\n`;
      xml += `    <loc>${catUrl}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    // 👉 (C) सारे ब्लॉग पोस्ट और उनकी इमेजेज ऐड करें
    posts.forEach((post) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      
      // 🖼️ अगर पोस्ट में फोटो है, तो उसे XML में डालो
      if (post.featuredImg) {
        // अगर फोटो का लिंक '/' से शुरू होता है, तो आगे डोमेन लगा दो
        const imgUrl = post.featuredImg.startsWith('http') 
          ? post.featuredImg 
          : `${baseUrl}${post.featuredImg}`;
          
        // Title में से स्पेशल कैरेक्टर्स हटा दो ताकि XML क्रैश ना हो
        const cleanTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${imgUrl}</image:loc>\n`;
        xml += `      <image:title>${cleanTitle}</image:title>\n`;
        xml += `    </image:image>\n`;
      }
      
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    // ब्राउज़र और गूगल को बताओ कि ये HTML नहीं, XML फाइल है
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}