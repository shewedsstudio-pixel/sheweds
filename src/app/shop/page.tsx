import { getProducts } from '@/lib/db';
import ShopPageContent from '@/components/shop/ShopPageContent';

export default async function ShopPage() {
    const products = await getProducts();

    return <ShopPageContent products={products} />;
}
