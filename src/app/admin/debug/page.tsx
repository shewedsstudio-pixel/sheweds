import fs from 'fs/promises';
import path from 'path';
import { getPageConfig } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    const env = process.env.NODE_ENV;
    const cwd = process.cwd();

    let pagesJsonContent = 'Error reading file';
    let footerStats = 'Error reading file';
    let dbImportResult = 'Not attempted';

    try {
        const pagesPath = path.join(cwd, 'src/data/pages.json');
        pagesJsonContent = await fs.readFile(pagesPath, 'utf-8');
    } catch (e: any) {
        pagesJsonContent = e.message;
    }

    try {
        // Check if Footer.tsx exists and get stats
        // Note: In Vercel, source files might not be present in the same structure, 
        // but we can check the data directory.
        const footerPath = path.join(cwd, '.next/server/app/page.js'); // Check build output
        const stats = await fs.stat(footerPath);
        footerStats = JSON.stringify(stats, null, 2);
    } catch (e: any) {
        footerStats = e.message;
    }

    try {
        const config = await getPageConfig('home');
        dbImportResult = JSON.stringify(config, null, 2);
    } catch (e: any) {
        dbImportResult = e.message;
    }

    return (
        <div className="p-8 font-mono text-sm whitespace-pre-wrap">
            <h1 className="text-2xl font-bold mb-4">Debug Info</h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold bg-gray-200 p-2">Environment</h2>
                <p>NODE_ENV: {env}</p>
                <p>CWD: {cwd}</p>
                <p>Timestamp: {new Date().toISOString()}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold bg-gray-200 p-2">DB Import Result (Home Page Config)</h2>
                <div className="bg-gray-100 p-4 overflow-auto max-h-96">
                    {dbImportResult}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold bg-gray-200 p-2">src/data/pages.json (Raw FS Read)</h2>
                <div className="bg-gray-100 p-4 overflow-auto max-h-96">
                    {pagesJsonContent}
                </div>
            </div>
        </div>
    );
}
