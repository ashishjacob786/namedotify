import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { 
  Calendar, User, Tag, ArrowLeft, ChevronRight, Clock, 
  LayoutGrid, CheckCircle2, Share2, Facebook, Twitter, Linkedin 
} from 'lucide-react';
import Link from 'next/link';
import 'react-quill-new/dist/quill.snow.css';

// 🚀 AUTO-SEO & OG TAG GENERATOR
export async function generateMetadata(props) {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Post Not Found | NameDotify' };
  
  const siteUrl = "https://namedotify.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | NameDotify Blog`,
    description: post.excerpt || `Read ${post.title} on NameDotify.`,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'NameDotify',
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author],
      images: post.featuredImg ? [{ url: post.featuredImg, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImg ? [post.featuredImg] : [],
    }
  };
}

export default async function SingleBlogPost(props) {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: 'published' }
  });
  if (!post) notFound();

  // ✅ FIXED READ TIME: Strictly calculating based on visible text
  const contentForCounting = post.content || "";
  const words = contentForCounting.replace(/<[^>]*>/g, ' ').trim().split(/\s+/);
  const wordCount = words.filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const postUrl = `https://namedotify.com/blog/${post.slug}`;

  const categoriesData = await prisma.blogPost.groupBy({
    by: ['category'], _count: { id: true }, where: { status: 'published' }
  });
  const activeCategories = categoriesData.filter(c => c._count.id > 0);

  const recentPosts = await prisma.blogPost.findMany({
    where: { status: 'published', id: { not: post.id } },
    orderBy: { createdAt: 'desc' }, take: 5,
    select: { title: true, slug: true, featuredImg: true, createdAt: true }
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 mt-8">
        
        <main className="w-full lg:w-[68%] min-w-0">
          <article>
            <div className="flex items-center gap-3 text-sm font-bold mb-6">
              <Link href="/blog" className="text-slate-400 hover:text-blue-600 transition">Blog</Link>
              <span className="text-slate-300">/</span>
              <span className="text-blue-600 uppercase tracking-widest text-xs">{post.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-8 break-words">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{post.author}</p>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{readTime} MIN READ</span>
                  </div>
                </div>
              </div>

              {/* 🔗 SOCIAL SHARE BUTTONS */}
              <div className="flex items-center gap-2">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition shadow-sm border border-slate-100">
                  <Facebook size={18} />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-black hover:text-white transition shadow-sm border border-slate-100">
                  <Twitter size={18} />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-700 hover:text-white transition shadow-sm border border-slate-100">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {post.featuredImg && (
              <figure className="mb-12">
                <img src={post.featuredImg} alt={post.title} className="w-full h-auto rounded-3xl object-cover shadow-sm border border-slate-100" />
              </figure>
            )}

            <div 
              className="w-full max-w-none text-lg text-slate-800 break-words overflow-hidden
              [&_p]:mb-6 [&_p]:leading-relaxed 
              [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4 
              [&_h3]:text-2xl [&_h3]:font-extrabold [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-4 
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2 
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2 
              [&_strong]:font-black [&_strong]:text-black 
              [&_a]:text-blue-600 [&_a]:underline [&_a]:font-bold hover:[&_a]:text-blue-800
              [&_img]:rounded-3xl [&_img]:my-8 [&_img]:shadow-md border-[&_img]:border-slate-100"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>

        <aside className="w-full lg:w-[32%] flex-shrink-0">
          <div className="sticky top-28 space-y-10">
            {activeCategories.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 border-b border-slate-100 pb-3">Topics</h3>
                <ul className="space-y-3">
                  {activeCategories.map(cat => (
                    <li key={cat.category}>
                      <Link href={`/blog?category=${cat.category}`} className="flex items-center justify-between group">
                        <span className="font-bold text-slate-700 group-hover:text-blue-600 transition">{cat.category}</span>
                        <span className="bg-slate-50 text-slate-400 text-xs py-1 px-2.5 rounded-full font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition">{cat._count.id}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {recentPosts.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 border-b border-slate-100 pb-3">Recent Posts</h3>
                <div className="space-y-6">
                  {recentPosts.map(rp => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                      <h4 className="text-base font-extrabold text-slate-800 group-hover:text-blue-600 transition leading-snug mb-2">{rp.title}</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{new Date(rp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}