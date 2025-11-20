import { ProductForm } from '@/components/admin/ProductForm';
import { Container } from '@/components/ui/Container';
import { createProduct } from '@/app/actions/product-actions';

export default function AddProductPage() {
    return (
        <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
            <Container>
                <h1 className="text-3xl font-serif font-bold mb-8 text-center">Add New Product</h1>
                <ProductForm action={createProduct} />
            </Container>
        </div>
    );
}
