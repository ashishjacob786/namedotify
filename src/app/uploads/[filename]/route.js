import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; 

export async function GET(req) {
  try {
    const urlPath = req.nextUrl.pathname; 
    const filename = urlPath.split('/').pop();
    
    if (!filename) {
      return new NextResponse('Not found', { status: 404 });
    }

    const isProd = process.env.NODE_ENV === 'production';
    const baseDir = isProd 
      ? '/var/www/namedotify/public/uploads' 
      : path.join(process.cwd(), 'public', 'uploads');
      
    const filePath = path.join(baseDir, filename);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    const ext = path.extname(filename).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.gif') mimeType = 'image/gif';
    else if (ext === '.svg') mimeType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("Image API Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}