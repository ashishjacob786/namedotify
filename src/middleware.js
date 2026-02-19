import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // 1. अगर कोई सीधा Dashboard खोलने की कोशिश करे
  if (url.pathname.startsWith('/admin/dashboard')) {
    const authCookie = req.cookies.get('adminAuth');

    // अगर उसके पास लॉगिन की चाबी (Cookie) नहीं है, तो उसे Login पेज पर फेंक दो
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // अगर चाबी है, तो डैशबोर्ड खुलने दो और SEO लॉक लगा दो
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  // 2. लॉगिन पेज पर भी SEO लॉक लगा दो ताकि गूगल इसे सेव न करे
  if (url.pathname.startsWith('/admin/login')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};