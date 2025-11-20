import fs from 'fs/promises';
import path from 'path';
import { TypographyConfig } from '@/lib/typography';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');
const HOMEPAGE_FILE = path.join(process.cwd(), 'src/data/homepage.json');

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    images: string[];
    videos: string[];
    description: string;
    sizes: string[];
    colors?: string[]; // Hex codes or color names
    material?: string;
    work?: string;
    fabric?: string;
    washCare?: string;
    sku?: string;
}

export interface HeroSlide {
    id: string;
    type: 'image' | 'video';
    url: string;
    title: string;
    titleStyle?: TypographyConfig;
    subtitle: string;
    subtitleStyle?: TypographyConfig;
    ctaText: string;
    ctaLink: string;
}

export interface HomePageData {
    heroSlides: HeroSlide[];
    featuredCategories: {
        title: string;
        image: string;
        link: string;
    }[];
    bridalJourney: {
        title: string;
        image: string;
        link: string;
    }[];
}

export async function getProducts(): Promise<Product[]> {
    try {
        const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
        const products = JSON.parse(data);

        // Migration: Ensure all products have images and videos arrays
        return products.map((p: any) => ({
            ...p,
            images: p.images || (p.image ? [p.image] : []),
            videos: p.videos || [],
            colors: p.colors || [],
            material: p.material || '',
            work: p.work || '',
            fabric: p.fabric || '',
            washCare: p.washCare || '',
            sku: p.sku || `SKU-${p.id}`
        }));
    } catch (error) {
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((product) => product.id === id);
}

// Helper for atomic writes to prevent corruption
async function writeJsonAtomic(filePath: string, data: any) {
    const tempPath = `${filePath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2));
    await fs.rename(tempPath, filePath);
}

export async function saveProducts(products: Product[]): Promise<void> {
    await writeJsonAtomic(PRODUCTS_FILE, products);
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<void> {
    const products = await getProducts();
    const newProduct = { ...product, id: Date.now().toString() };
    products.push(newProduct);
    await saveProducts(products);
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        await saveProducts(products);
    }
}

export async function deleteProduct(id: string): Promise<void> {
    const products = await getProducts();
    const filtered = products.filter(p => p.id !== id);
    await saveProducts(filtered);
}

export async function getHomePageData(): Promise<HomePageData> {
    try {
        const data = await fs.readFile(HOMEPAGE_FILE, 'utf-8');
        const parsed = JSON.parse(data);

        // Migration for old format if needed
        if (!parsed.heroSlides && parsed.heroVideoUrl) {
            parsed.heroSlides = [{
                id: '1',
                type: 'video',
                url: parsed.heroVideoUrl,
                title: parsed.heroTitle,
                subtitle: parsed.heroSubtitle,
                ctaText: 'DISCOVER COLLECTION',
                ctaLink: '/shop'
            }];
        }

        return parsed;
    } catch (error) {
        // Default data if file doesn't exist
        return {
            heroSlides: [
                {
                    id: '1',
                    type: 'video',
                    url: 'https://videos.pexels.com/video-files/3926946/3926946-uhd_2560_1440_25fps.mp4',
                    title: 'Mohey Rang Do\nBurnt Caramel',
                    subtitle: 'Because beige is never just beige',
                    ctaText: 'DISCOVER 250+ SHADES',
                    ctaLink: '/shop'
                }
            ],
            featuredCategories: [],
            bridalJourney: []
        };
    }
}

export async function saveHomePageData(data: HomePageData): Promise<void> {
    await writeJsonAtomic(HOMEPAGE_FILE, data);
}

// --- Dynamic Page Builder ---

const PAGES_FILE = path.join(process.cwd(), 'src/data/pages.json');

export interface Section {
    id: string;
    type: string;
    content: Record<string, any>;
    settings: Record<string, any>;
}

export interface PageConfig {
    id: string;
    slug: string;
    name: string;
    sections: Section[];
}

export async function getAllPages(): Promise<PageConfig[]> {
    try {
        const data = await fs.readFile(PAGES_FILE, 'utf-8');
        const pages = JSON.parse(data);
        return Object.values(pages);
    } catch (error) {
        return [];
    }
}

export async function getPageConfig(slug: string): Promise<PageConfig | null> {
    try {
        const data = await fs.readFile(PAGES_FILE, 'utf-8');
        const pages = JSON.parse(data);
        return Object.values(pages).find((p: any) => p.slug === slug) as PageConfig || null;
    } catch (error) {
        return null;
    }
}

export async function savePageConfig(slug: string, config: PageConfig): Promise<void> {
    try {
        let pages: Record<string, PageConfig> = {};
        try {
            const data = await fs.readFile(PAGES_FILE, 'utf-8');
            pages = JSON.parse(data);
        } catch (e) {
            // File might not exist or be empty
        }

        pages[config.id] = config;
        await writeJsonAtomic(PAGES_FILE, pages);
    } catch (error) {
        console.error('Error saving page config:', error);
        throw error;
    }
}

export async function createPage(name: string, slug: string): Promise<PageConfig> {
    const id = slug.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newPage: PageConfig = {
        id,
        slug,
        name,
        sections: []
    };
    await savePageConfig(slug, newPage);
    return newPage;
}

export async function deletePage(id: string): Promise<void> {
    try {
        const data = await fs.readFile(PAGES_FILE, 'utf-8');
        const pages = JSON.parse(data);
        delete pages[id];
        await writeJsonAtomic(PAGES_FILE, pages);
    } catch (error) {
        // Ignore
    }
}
