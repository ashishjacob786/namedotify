import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // .env फाइल से असली आईडी/पासवर्ड मैच करना
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // ✅ BANK LEVEL LOCK: HttpOnly Cookie (इसे हैकर की Javascript चोरी नहीं कर सकती)
      response.cookies.set({
        name: 'adminAuthToken',
        value: process.env.ADMIN_SECURE_TOKEN || 'secure_token_fallback',
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 घंटे
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'ACCESS DENIED: Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}