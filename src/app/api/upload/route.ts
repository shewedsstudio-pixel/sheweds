import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/upload';

export async function POST(request: NextRequest) {
    try {
        console.log('Upload API called');
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            console.error('No file found in formData');
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        console.log('File received:', file.name, file.size, file.type);
        const path = await uploadFile(file);
        console.log('File uploaded to:', path);
        return NextResponse.json({ path, success: true });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
