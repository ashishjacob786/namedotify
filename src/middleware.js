import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === 'Ashish@2026') {
        const response = NextResponse.next();
        
        // ✅ TRIPLE LOCK: HTTP Header for ALL Search Engines
        response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
        return response;
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'X-Robots-Tag': 'noindex, nofollow', // लॉगिन पॉपअप को भी इंडेक्स होने से रोकेगा
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};