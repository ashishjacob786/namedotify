"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Save, Send, Image as ImageIcon, Link as LinkIcon, Tag, LayoutList, PenTool, Loader2, UploadCloud } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css'; 

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function WriteBlog() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false); // ✅ Added loading state

  // 🔒 SECURITY GUARD
  useEffect(() => {
    const checkSecurity = () => {
      const hasAccess = localStorage.getItem('token') || 
                        localStorage.getItem('adminToken') || 
                        localStorage.getItem('isLoggedIn') || 
                        document.cookie.includes('token');

      if (!hasAccess) {
        console.warn("🚨 Unauthorized Access! Redirecting to login...");
        router.replace('/admin/login');
      } else {
        setIsAuthorized(true); // ✅ Access granted!
      }
    };
    checkSecurity();
  }, [router]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '',
    category: 'SEO Tools', tags: '', author: 'Ashish Jacob',
    status: 'published', featuredImg: '', imageAlt: ''
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, featuredImg: data.url }); 
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      alert('Upload error. Check network.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e, customStatus = null) => {
    e.preventDefault();
    setLoading(true);
    const finalData = { ...formData };
    if (customStatus) finalData.status = customStatus;

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData)
      });
      const result = await res.json();
      if (result.success) {
        alert('🎉 Blog Post Saved!');
        router.push('/admin/blog/manage'); 
      } else alert('Error: ' + result.error);
    } catch (err) { alert('Network Error.'); } finally { setLoading(false); }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code-block'], ['clean']
    ],
  };

  // ✅ PREVENT CRASH: Show loading until auth is verified
  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40}/>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <PenTool className="text-blue-600" size={32} /> Write New Article
        </h1>
        <div className="flex gap-3">
          <button onClick={(e) => handleSubmit(e, 'draft')} disabled={loading} className="px-5 py-2.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition flex items-center gap-2">
            <Save size={18} /> Save Draft
          </button>
          <button onClick={(e) => handleSubmit(e, 'published')} disabled={loading} className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition flex items-center gap-2 disabled:opacity-70">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Publish Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <input type="text" required placeholder="Enter Blog Title Here..." value={formData.title} onChange={handleTitleChange} className="w-full text-3xl font-black text-slate-900 placeholder-slate-300 focus:outline-none mb-4 bg-transparent" />
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6 font-mono">
              <LinkIcon size={16} className="text-blue-500"/> <span>namedotify.com/blog/</span>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="bg-transparent focus:outline-none text-slate-900 font-bold w-full" />
            </div>
            <div className="min-h-[400px] text-slate-900">
              <ReactQuill theme="snow" value={formData.content} onChange={(content) => setFormData({...formData, content})} modules={modules} className="h-[350px] rounded-xl text-slate-900" placeholder="Start writing..." />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-2">SEO Excerpt (Meta Description)</label>
            <textarea rows="3" placeholder="A short summary for Google Search Results..." value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-slate-900 font-medium"></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><LayoutList size={18} className="text-indigo-500"/> Category & Tags</h3>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium text-slate-900">
                <option>SEO Tools</option> <option>Web Development</option> <option>Domain Names</option> <option>Security</option> <option>News & Updates</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                <input type="text" placeholder="seo, tools, domains" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm text-slate-900 font-medium" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-pink-500"/> Featured Image</h3>
            <div className="mb-4 relative group cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="w-full p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 group-hover:bg-slate-100 group-hover:border-blue-400 transition flex flex-col items-center justify-center gap-2 text-center">
                {uploading ? <Loader2 className="animate-spin text-blue-500" size={24} /> : <UploadCloud className="text-slate-400 group-hover:text-blue-500 transition" size={24} />}
                <span className="text-sm font-bold text-slate-600">{uploading ? 'Uploading...' : 'Click to Upload Image'}</span>
              </div>
            </div>
            {formData.featuredImg && (
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 mb-4">
                <img src={formData.featuredImg} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image SEO (Alt Text)</label>
            <input type="text" placeholder="Describe the image for Google..." value={formData.imageAlt} onChange={(e) => setFormData({...formData, imageAlt: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium text-slate-900" />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><PenTool size={18} className="text-orange-500"/> Author</h3>
            <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium text-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}