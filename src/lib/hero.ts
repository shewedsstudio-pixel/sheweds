import { readFileSync } from 'fs';
import path from 'path';

const HERO_FILE = path.join(process.cwd(), 'src/data/hero-slides.json');

export async function getHeroSlides() {
    try {
        const data = JSON.parse(readFileSync(HERO_FILE, 'utf-8'));
        return data.slides || [];
    } catch (error) {
        return [];
    }
}
