'use server';

import { getAllPages, getPageConfig, savePageConfig, PageConfig } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function fetchAllPages() {
    return await getAllPages();
}

export async function fetchPageConfig(slug: string) {
    return await getPageConfig(slug);
}

export async function updatePageConfig(slug: string, config: PageConfig) {
    console.log('updatePageConfig called for slug:', slug);
    await savePageConfig(slug, config);
    console.log('Page config saved');
    revalidatePath('/', 'layout');
    revalidatePath(`/${slug}`, 'layout');
    return { success: true };
}

export async function createPage(name: string, slug: string) {
    const { createPage: dbCreatePage } = await import('@/lib/db');
    await dbCreatePage(name, slug);
    revalidatePath('/admin/design');
    return { success: true };
}
