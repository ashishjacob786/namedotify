import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // जहाँ फोटो सेव करनी है, उस फोल्डर का रास्ता
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // 🚀 MAGIC FIX: अगर 'uploads' फोल्डर नहीं है, तो उसे अपने आप बना दो
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (dirError) {
      // अगर फोल्डर पहले से है, तो इग्नोर करो
      console.log("Directory exists or error:", dirError);
    }

    // फोटो का यूनिक नाम बनाना
    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueName);

    // फोटो को सेव करना
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/uploads/${uniqueName}` });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ success: false, error: 'File upload failed on server' }, { status: 500 });
  }
}