import { NextResponse } from 'next/server';
import whois from 'whois-json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  try {
    const results = await whois(domain);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Whois data' }, { status: 500 });
  }
}