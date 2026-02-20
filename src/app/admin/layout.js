"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, LayoutList, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // लॉगिन पेज पर साइडबार नहीं दिखाना है
  if (pathname === '/admin/login') return children;

  return (
    <div className="flex min-h-screen bg-slate-50 pt-16">
      {/* 🚀 Left Sidebar (WordPress Style) */}
      <aside className="w-64 bg-slate-900 text-slate-300 fixed h-full z-40 border-r border-slate-800 shadow-2xl">
        <div className="p-6 mb-4">
          <h2 className="text-white text-xs font-black uppercase tracking-widest bg-slate-800 inline-block px-3 py-1 rounded-lg">Admin Panel</h2>
        </div>
        <nav className="space-y-2 px-4">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${pathname === '/admin/dashboard' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={18} /> Dashboard Stats
          </Link>
          <Link href="/admin/blog/manage" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${pathname === '/admin/blog/manage' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutList size={18} /> Manage Articles
          </Link>
          <Link href="/admin/blog/write" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${pathname === '/admin/blog/write' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <PenTool size={18} /> Write New Post
          </Link>
          
          <div className="mt-8 pt-8 border-t border-slate-800">
            <button onClick={() => { document.cookie = "adminAuthToken=; path=/; max-age=0"; window.location.href="/admin/login"; }} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold transition text-red-400 hover:bg-red-500/10 hover:text-red-300">
              <LogOut size={18} /> Secure Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area (जिसमें आपके पेजेस लोड होंगे) */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}