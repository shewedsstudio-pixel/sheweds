'use client';

import { Product } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface FeaturedCollectionProps {
    products: Product[];
    title?: string;
    titleStyle?: TypographyConfig;
    description?: string;
}

export const FeaturedCollection = ({
    products,
    title = "Curated Masterpieces",
    titleStyle,
    description = "Handpicked selections that define luxury and tradition. Each piece tells a story of heritage and craftsmanship."
}: FeaturedCollectionProps) => {
    const featuredProducts = products.slice(0, 3);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2
                            className={cn(
                                "font-serif font-bold text-stone-900 mb-6",
                                getTypographyClasses(titleStyle) || "text-4xl md:text-6xl"
                            )}
                            style={getTypographyStyles(titleStyle)}
                        >
                            {title}
                        </h2>
                        <p className="text-stone-600 max-w-lg text-lg font-light">
                            {description}
                        </p>
                    </motion.div>
                    <Link href="/shop" className="hidden md:block">
                        <Button variant="outline" className="gap-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-500">
                            View All Collection <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <Link href="/shop">
                        <Button variant="outline" className="gap-2">
                            View All Collection <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
};
