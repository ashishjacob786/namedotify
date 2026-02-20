import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Calendar, User, Tag, ArrowLeft, ChevronRight, Clock, LayoutGrid, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import 'react-quill-new/dist/quill.snow.css';

// 🚀 AUTO-SEO GENERATOR
export async function generateMetadata(props) {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Post Not Found | NameDotify' };
  return {
    title: `${post.title} | NameDotify Blog`,
    description: post.excerpt || `Read ${post.title} on NameDotify.`,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.createdAt, authors: [post.author], images: post.featuredImg ? [post.featuredImg] : [], }
  };
}

export default async function SingleBlogPost(props) {
  const params = await props.params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: 'published' }
  });
  if (!post) notFound();

  // Read Time Calculation (Rough estimate)
  const readTime = Math.ceil(post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200);

  const categoriesData = await prisma.blogPost.groupBy({
    by: ['category'], _count: { id: true }, where: { status: 'published' }
  });
  const activeCategories = categoriesData.filter(c => c._count.id > 0);

  const recentPosts = await prisma.blogPost.findMany({
    where: { status: 'published', id: { not: post.id } },
    orderBy: { createdAt: 'desc' }, take: 5,
    select: { title: true, slug: true, featuredImg: true, createdAt: true }
  });

  const schemaMarkup = {
    "@context": "https://schema.org", "@type": "BlogPosting", "mainEntityOfPage": { "@type": "WebPage", "@id": `https://namedotify.com/blog/${post.slug}` },
    "headline": post.title, "image": post.featuredImg ? [post.featuredImg] : [],
    "datePublished": post.createdAt, "dateModified": post.updatedAt, "author": { "@type": "Person", "name": post.author }, "description": post.excerpt
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-sans selection:bg-blue-100 selection:text-blue-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 mt-8">
        
        {/* ================= MAIN ARTICLE BODY (LEFT SIDE) ================= */}
        <main className="w-full lg:w-[68%]">
          <article>
            {/* Breadcrumb & Category */}
            <div className="flex items-center gap-3 text-sm font-bold mb-6">
              <Link href="/blog" className="text-slate-400 hover:text-blue-600 transition">Blog</Link>
              <span className="text-slate-300">/</span>
              <span className="text-blue-600 uppercase tracking-widest text-xs">{post.category}</span>
            </div>

            {/* Title (Huge SEJ Style) */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
              {post.title}
            </h1>
            
            {/* Author Meta Info */}
            <div className="flex items-center gap-4 py-6 border-y border-slate-100 mb-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-black text-lg border border-blue-200">
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

            {/* Featured Image (Full bleed in column) */}
            {post.featuredImg && (
              <figure className="mb-12">
                <img src={post.featuredImg} alt={post.imageAlt || post.title} className="w-full h-auto rounded-3xl object-cover shadow-sm border border-slate-100" />
                {post.imageAlt && <figcaption className="text-center text-xs text-slate-400 mt-3 font-medium">{post.imageAlt}</figcaption>}
              </figure>
            )}

            {/* 📝 THE CONTENT (Fixed: Removed ql-editor class so Tailwind Prose works perfectly) */}
            <div 
              className="prose prose-lg md:prose-xl max-w-none prose-slate text-slate-800 prose-headings:text-slate-900 prose-headings:font-extrabold prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-sm prose-img:border prose-img:border-slate-100"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags (Bottom) */}
            {post.tags && (
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-slate-900 mr-2">Tags:</span>
                {post.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-4 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition cursor-pointer">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </article>
        </main>

        {/* ================= RIGHT SIDEBAR (Sticky, Pro Style) ================= */}
        <aside className="w-full lg:w-[32%] flex-shrink-0">
          <div className="sticky top-28 space-y-10">
            
            {/* Widget 1: Categories (Clean look) */}
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

            {/* Widget 2: Recent Posts */}
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

            {/* Widget 3: CTA Box */}
            <div className="bg-slate-900 rounded-3xl p-8 text-center shadow-xl border border-slate-800">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-white font-black text-xl mb-3">Free SEO Tools</h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-3">Boost your website traffic with NameDotify's suite of 20+ free webmaster tools.</p>
              <Link href="/" className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition">
                Explore Tools
              </Link>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}