import { NextResponse } from 'next/server';
import lookup from 'whois-json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  // Clean domain input
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].toLowerCase();

  try {
    // ✅ Direct Server-to-Server Lookup (No External API Limit)
    const result = await lookup(cleanDomain);

    // If result is empty or error
    if (!result || Object.keys(result).length === 0) {
      return NextResponse.json({ error: 'Domain not found or registry connection failed.' }, { status: 404 });
    }

    // 🔄 DATA NORMALIZATION (हर TLD अलग key देता है, हम उसे यहाँ फिक्स करेंगे)
    // .com uses 'creationDate', .org uses 'creationDate', others use 'created'
    const created = result.creationDate || result.created || result.creation_date || result.registered || null;
    const expires = result.registryExpiryDate || result.expiryDate || result.expires || result.expiration_date || null;
    const registrar = result.registrar || result.registrarName || result.sponsoringRegistrar || 'Unknown';
    
    // Nameservers can be an array or a string, fix it
    let ns = [];
    if (Array.isArray(result.nameServer)) {
        ns = result.nameServer;
    } else if (typeof result.nameServer === 'string') {
        ns = result.nameServer.split(' ').filter(n => n);
    } else if (result.nserver) {
        ns = [result.nserver]; // Some TLDs use 'nserver'
    }

    return NextResponse.json({
      domain: cleanDomain,
      registrar: registrar,
      creationDate: created,
      expiryDate: expires,
      nameServer: ns.map(n => n.toLowerCase()), // Lowercase for consistency
      raw: result // Full raw object for the "View Raw" section
    });

  } catch (error) {
    console.error("Whois Lookup Error:", error);
    return NextResponse.json({ error: 'Internal Server Error: Could not connect to Whois server.' }, { status: 500 });
  }
}