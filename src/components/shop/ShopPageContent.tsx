'use client';

import { Product } from '@/lib/db';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Container } from '@/components/ui/Container';
import { motion } from 'framer-motion';

interface ShopPageProps {
    products: Product[];
}

export default function ShopPageContent({ products }: ShopPageProps) {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-white">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-600 tracking-widest uppercase text-sm font-medium">The Collection</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mt-4 mb-6">
                        All Products
                    </h1>
                    <p className="text-stone-500 max-w-xl mx-auto font-light text-lg">
                        Explore our complete range of handcrafted luxury wear, designed for the modern royalty.
                    </p>
                </motion.div>

                <ProductGrid products={products} />
            </Container>
        </div>
    );
}
