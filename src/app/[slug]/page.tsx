import { getProducts, getPageConfig } from '@/lib/db';
import { PageRenderer } from '@/components/builder/PageRenderer';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const pageConfig = await getPageConfig(slug);
    const products = await getProducts();

    if (!pageConfig) {
        notFound();
    }

    return (
        <PageRenderer sections={pageConfig.sections} products={products} />
    );
}
