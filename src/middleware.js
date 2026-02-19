import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname === '/admin' || url.pathname === '/admin/') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // ✅ Dashboard Security
  if (url.pathname.startsWith('/admin/dashboard')) {
    const authCookie = req.cookies.get('adminAuthToken'); // नई Secure Cookie
    const expectedToken = process.env.ADMIN_SECURE_TOKEN || 'secure_token_fallback';

    // अगर टोकन नहीं है या मैच नहीं कर रहा है
    if (!authCookie || authCookie.value !== expectedToken) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  if (url.pathname.startsWith('/admin/login')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};