import { ProductForm } from '@/components/admin/ProductForm';
import { Container } from '@/components/ui/Container';
import { getProductById } from '@/lib/db';
import { updateProduct } from '@/app/actions/product-actions';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const updateAction = updateProduct.bind(null, product.id);

    return (
        <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
            <Container>
                <h1 className="text-3xl font-serif font-bold mb-8 text-center">Edit Product</h1>
                <ProductForm initialData={product} action={updateAction} />
            </Container>
        </div>
    );
}
