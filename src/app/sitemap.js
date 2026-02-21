import prisma from '@/lib/prisma';

// 🚀 Next.js को बताओ कि यह हमेशा फ्रेश (Dynamic) डेटा लानी चाहिए
export const revalidate = 0; 

export default async function sitemap() {
  const baseUrl = 'https://namedotify.com';

  // 1. डेटाबेस से पब्लिश्ड पोस्ट्स लाओ
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true, featuredImg: true },
    orderBy: { updatedAt: 'desc' },
  });

  // 2. सिर्फ एक्टिव कैटेगरी लाओ (जिनमें पोस्ट हों)
  const categoriesData = await prisma.blogPost.groupBy({
    by: ['category'],
    _count: { id: true },
    where: { status: 'published' }
  });
  const activeCategories = categoriesData.filter(c => c._count.id > 0);

  // 3. फिक्स पेजेस और टूल्स
  const staticPages = [
    '', '/about', '/contact', '/privacy', '/terms', '/blog',
    '/dns', '/fonts-generator', '/generator', '/hosting', '/ip', '/live-editor',
    '/malware-scanner', '/mockup', '/password', '/qrcode', '/reverse-ip', 
    '/schema-generator', '/seo-auditor', '/signature', '/speed-test', '/ssl', 
    '/status', '/utm-builder', '/webmcp-schema-generator', '/webmcp-validate', 
    '/website-speed', '/whois', '/youtube-analyzer'
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = activeCategories.map((cat) => ({
    url: `${baseUrl}/blog?category=${encodeURIComponent(cat.category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const postRoutes = posts.map((post) => {
    const result = {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'daily',
      priority: 0.9,
    };

    // 🖼️ Next.js का ऑफिसियल तरीका फोटो (Images) ऐड करने का
    if (post.featuredImg) {
      const imgUrl = post.featuredImg.startsWith('http') 
        ? post.featuredImg 
        : `${baseUrl}${post.featuredImg}`;
      result.images = [imgUrl]; 
    }

    return result;
  });

  // सबको जोड़कर Next.js को दे दो, वो खुद XML बना लेगा
  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}