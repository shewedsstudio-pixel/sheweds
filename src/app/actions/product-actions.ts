'use server';

import { createProduct as dbCreateProduct, updateProduct as dbUpdateProduct, deleteProduct, Product, getProductById } from '@/lib/db';
import { uploadFile } from '@/lib/upload';
import { revalidatePath } from 'next/cache';

export async function fetchProductById(id: string) {
    return await getProductById(id);
}

export async function fetchRelatedProducts(category: string, currentId: string) {
    const { getProducts } = await import('@/lib/db');
    const allProducts = await getProducts();
    return allProducts
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
}

export async function createProduct(formData: FormData) {
    console.log('createProduct called');
    const images: string[] = [];
    const videos: string[] = [];

    // Handle Images
    const imageFiles = formData.getAll('images') as File[];
    console.log('Image files received:', imageFiles.length);
    for (const file of imageFiles) {
        console.log('Processing image:', file.name, file.size);
        if (file.size > 0) {
            const path = await uploadFile(file);
            console.log('Image uploaded:', path);
            images.push(path);
        }
    }

    // Handle Videos
    const videoFiles = formData.getAll('videos') as File[];
    for (const file of videoFiles) {
        if (file.size > 0) {
            const path = await uploadFile(file);
            videos.push(path);
        }
    }

    // Fallback if no new images but image URL provided (legacy support)
    if (images.length === 0 && formData.get('image_url')) {
        images.push(formData.get('image_url') as string);
    }

    const productData = {
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
        category: formData.get('category') as string,
        image: images[0] || '', // Legacy field
        images: images,
        videos: videos,
        description: formData.get('description') as string,
        sizes: (formData.get('sizes') as string || '').split(',').map(s => s.trim()).filter(Boolean),
        material: formData.get('material') as string,
        work: formData.get('work') as string,
        washCare: formData.get('washCare') as string,
        sku: formData.get('sku') as string,
    };

    await dbCreateProduct(productData);
    revalidatePath('/shop');
    revalidatePath('/admin/dashboard');
}

export async function updateProduct(id: string, formData: FormData) {
    const existingProduct = await getProductById(id);
    if (!existingProduct) return;

    // Get the existing images/videos that weren't removed
    const existingImagesJson = formData.get('existingImages') as string;
    const existingVideosJson = formData.get('existingVideos') as string;

    const images: string[] = existingImagesJson ? JSON.parse(existingImagesJson) : [];
    const videos: string[] = existingVideosJson ? JSON.parse(existingVideosJson) : [];

    // Handle New Images
    const imageFiles = formData.getAll('images') as File[];
    for (const file of imageFiles) {
        if (file.size > 0) {
            const path = await uploadFile(file);
            images.push(path);
        }
    }

    // Handle New Videos
    const videoFiles = formData.getAll('videos') as File[];
    for (const file of videoFiles) {
        if (file.size > 0) {
            const path = await uploadFile(file);
            videos.push(path);
        }
    }

    const updates: Partial<Product> = {
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
        category: formData.get('category') as string,
        images: images,
        videos: videos,
        description: formData.get('description') as string,
        sizes: (formData.get('sizes') as string || '').split(',').map(s => s.trim()).filter(Boolean),
        material: formData.get('material') as string,
        work: formData.get('work') as string,
        washCare: formData.get('washCare') as string,
        sku: formData.get('sku') as string,
    };

    await dbUpdateProduct(id, updates);
    revalidatePath('/shop');
    revalidatePath(`/product/${id}`);
    revalidatePath('/admin/dashboard');
}

export async function removeProduct(id: string) {
    await deleteProduct(id);
    revalidatePath('/shop');
    revalidatePath('/admin/dashboard');
}
