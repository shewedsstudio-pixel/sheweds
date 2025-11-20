import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.name);
    const filename = file.name.replace(ext, '') + '-' + uniqueSuffix + ext;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    return `/uploads/${filename}`;
}
