import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Calendar, User, ArrowRight, LayoutGrid } from 'lucide-react';

export const metadata = {
  title: 'Blog & Updates | NameDotify',
  description: 'Read the latest articles on SEO, domain names, and web development to grow your online business.',
};

export default async function BlogArchive(props) {
  // ✅ Next.js 15+ safe params handling
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams?.page) || 1;
  const postsPerPage = 10;

  // 1. Database से टोटल पोस्ट्स गिनना (Pagination के लिए)
  const totalPosts = await prisma.blogPost.count({ where: { status: 'published' } });
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 2. Database से सिर्फ इस पेज के 10 पोस्ट्स मंगाना (Super Fast)
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' }, // सबसे नया सबसे ऊपर
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-4">
            <LayoutGrid size={14} /> NameDotify Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Updates</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Discover advanced SEO strategies, web tools tutorials, and the latest in digital growth.
          </p>
        </div>

        {/* BLOG GRID */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-400">No posts published yet.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-100 transition-all duration-300 overflow-hidden hover:-translate-y-1">
                {/* Image */}
                <div className="aspect-[16/10] w-full bg-slate-100 relative overflow-hidden">
                  {post.featuredImg ? (
                    <img src={post.featuredImg} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-200">
                      <LayoutGrid size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><User size={14}/> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt || 'Read this amazing article on NameDotify...'}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 🚀 AUTO PAGINATION (अगर 10 से ज़्यादा पोस्ट हुए तो ये खुद चालू हो जाएगा) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link 
                key={page} 
                href={`/blog?page=${page}`}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === page ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-blue-600'}`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}