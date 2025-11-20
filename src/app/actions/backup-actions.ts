'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PAGES_FILE = path.join(DATA_DIR, 'pages.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

export async function exportData() {
    try {
        const pages = await fs.readFile(PAGES_FILE, 'utf-8');
        const products = await fs.readFile(PRODUCTS_FILE, 'utf-8');
        return {
            pages: JSON.parse(pages),
            products: JSON.parse(products),
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Export failed:', error);
        throw new Error('Failed to export data');
    }
}

export async function importData(data: { pages: any, products: any }) {
    try {
        // Ensure directory exists
        await fs.mkdir(DATA_DIR, { recursive: true });

        if (data.pages) {
            await fs.writeFile(PAGES_FILE, JSON.stringify(data.pages, null, 2));
        }
        if (data.products) {
            await fs.writeFile(PRODUCTS_FILE, JSON.stringify(data.products, null, 2));
        }

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Import failed:', error);
        throw new Error('Failed to import data');
    }
}
