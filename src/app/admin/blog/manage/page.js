"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Edit, ExternalLink, PenTool, LayoutList, Loader2, AlertCircle } from 'lucide-react';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setBlogs(data.posts);
      }
    } catch (err) {
      console.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    // ⚠️ डिलीट करने से पहले वॉर्निंग
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`);
    if (!confirmDelete) return;

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      
      if (data.success) {
        // UI से भी उस ब्लॉग को तुरंत हटा दो
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Failed to delete blog. Network error.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-blue-600"><Loader2 className="animate-spin" size={40} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <LayoutList className="text-blue-600" size={32} /> Manage Articles
          </h1>
          <p className="text-slate-500 mt-1">View, edit, or delete your published and drafted blog posts.</p>
        </div>
        <Link href="/admin/blog/write" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-md">
          <PenTool size={18} /> Write New Post
        </Link>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <AlertCircle size={48} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No blogs found</h3>
            <p className="text-slate-500 mt-2">You haven't written any articles yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-5">Title</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Date</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50 transition">
                    <td className="p-5">
                      <p className="font-bold text-slate-900 line-clamp-1">{blog.title}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1">/blog/{blog.slug}</p>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${blog.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-medium text-slate-600">{blog.category}</td>
                    <td className="p-5 text-sm text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Live */}
                        <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Live">
                          <ExternalLink size={18} />
                        </Link>
                        
                        {/* ✅ Edit Post Button (Fixed) */}
                        <Link href={`/admin/blog/edit/${blog.id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit Post">
                          <Edit size={18} />
                        </Link>
                        
                        {/* Delete */}
                        <button onClick={() => handleDelete(blog.id, blog.title)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Post">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}