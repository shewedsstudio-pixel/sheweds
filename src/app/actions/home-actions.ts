'use server';

import { getHomePageData, saveHomePageData, HomePageData } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function fetchHomePageData() {
    return await getHomePageData();
}

export async function updateHomePageData(formData: FormData) {
    const currentData = await getHomePageData();

    const heroSlidesJson = formData.get('heroSlides') as string;
    const featuredCategoriesJson = formData.get('featuredCategories') as string;
    const bridalJourneyJson = formData.get('bridalJourney') as string;

    const newData: HomePageData = {
        ...currentData,
        heroSlides: heroSlidesJson ? JSON.parse(heroSlidesJson) : currentData.heroSlides,
        featuredCategories: featuredCategoriesJson ? JSON.parse(featuredCategoriesJson) : currentData.featuredCategories,
        bridalJourney: bridalJourneyJson ? JSON.parse(bridalJourneyJson) : currentData.bridalJourney,
    };

    await saveHomePageData(newData);
    revalidatePath('/');
    return { success: true };
}
