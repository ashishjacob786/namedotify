import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // ✅ नया कोड: अगर कोई सिर्फ /admin लिखे, तो उसे सीधा Login पर भेज दो
  if (url.pathname === '/admin' || url.pathname === '/admin/') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // 1. Dashboard को सिक्योर करने के लिए
  if (url.pathname.startsWith('/admin/dashboard')) {
    const authCookie = req.cookies.get('adminAuth');

    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  // 2. Login पेज को गूगल से छुपाने के लिए
  if (url.pathname.startsWith('/admin/login')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // ✅ यहाँ '/admin' ऐड किया ताकि मिडलवेयर इसे भी मॉनिटर करे
  matcher: ['/admin', '/admin/:path*'],
};