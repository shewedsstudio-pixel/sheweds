import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const HERO_FILE = path.join(process.cwd(), 'src/data/hero-slides.json');

export async function GET() {
    try {
        const data = JSON.parse(readFileSync(HERO_FILE, 'utf-8'));
        return NextResponse.json(data);
    } catch (error) {
        // If file doesn't exist, return default
        return NextResponse.json({ slides: [] });
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    writeFileSync(HERO_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
}
