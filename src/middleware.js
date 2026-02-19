import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // अगर कोई /admin या उसके अंदर का कोई पेज खोलता है
  if (url.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      // atob से डिकोड करके ID और Password निकालना
      const [user, pwd] = atob(authValue).split(':');

      // ✅ यहाँ अपना ID और Password सेट करें
      if (user === 'ashishjacob@gmail.com' && pwd === 'Ashish@jacoB123') {
        return NextResponse.next(); // सही है तो पेज खुलने दो
      }
    }

    // अगर पासवर्ड गलत है या नहीं डाला है, तो Popup दिखाओ
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// यह Middleware सिर्फ /admin वाले रास्तों पर काम करेगा
export const config = {
  matcher: ['/admin/:path*'],
};