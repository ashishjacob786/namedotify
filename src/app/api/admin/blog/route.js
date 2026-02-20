import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const checkAuth = (req) => {
  const authCookie = req.cookies.get('adminAuthToken');
  return authCookie && authCookie.value === (process.env.ADMIN_SECURE_TOKEN || 'secure_token_fallback');
};

// 1. CREATE POST
export async function POST(req) {
  try {
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    const data = await req.json();
    const newPost = await prisma.blogPost.create({
      data: {
        title: data.title, slug: data.slug, content: data.content,
        excerpt: data.excerpt || '', category: data.category || 'General',
        tags: data.tags || '', author: data.author || 'NameDotify Admin',
        status: data.status || 'published', featuredImg: data.featuredImg || null,
        imageAlt: data.imageAlt || ''
      },
    });
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    if (error.code === 'P2002') return NextResponse.json({ success: false, error: 'Slug already used.' }, { status: 400 });
    return NextResponse.json({ success: false, error: 'Failed to save blog post' }, { status: 500 });
  }
}

// 2. GET POST(S)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // अगर ID है, तो एडिटर के लिए पूरा ब्लॉग भेजो
      const post = await prisma.blogPost.findUnique({ where: { id } });
      return NextResponse.json({ success: true, post });
    }

    // वर्ना लिस्ट के लिए सारे ब्लॉग्स भेजो
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, status: true, category: true, createdAt: true }
    });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// 3. UPDATE POST (नया फीचर)
export async function PUT(req) {
  try {
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    const data = await req.json();
    
    const updatedPost = await prisma.blogPost.update({
      where: { id: data.id },
      data: {
        title: data.title, slug: data.slug, content: data.content,
        excerpt: data.excerpt, category: data.category, tags: data.tags,
        author: data.author, status: data.status, featuredImg: data.featuredImg,
        imageAlt: data.imageAlt
      },
    });
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

// 4. DELETE POST
export async function DELETE(req) {
  try {
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    const { id } = await req.json();
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}