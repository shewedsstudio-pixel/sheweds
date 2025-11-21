'use client';

import { Product } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface FeaturedCollectionProps {
    products: Product[];
    title?: string;
    titleStyle?: TypographyConfig;
    description?: string;
    layout?: 'grid' | 'carousel';
    columns?: string;
    mobileColumns?: string;
    productCardStyle?: 'standard' | 'minimal';
    cardShape?: 'square' | 'portrait' | 'landscape';
    showPrice?: boolean;
    showAddToCart?: boolean;
    itemCount?: number;
    spacingTop?: string;
    spacingBottom?: string;
}

export const FeaturedCollection = ({
    products,
    title = "Curated Masterpieces",
    titleStyle,
    description = "Handpicked selections that define luxury and tradition. Each piece tells a story of heritage and craftsmanship.",
    layout = 'grid',
    columns = '4',
    mobileColumns = '1',
    productCardStyle = 'standard',
    cardShape = 'portrait',
    showPrice = true,
    showAddToCart = true,
    itemCount = 8,
    spacingTop = '6rem',
    spacingBottom = '6rem'
}: FeaturedCollectionProps) => {
    const featuredProducts = products.slice(0, itemCount);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white overflow-hidden" style={{ paddingTop: spacingTop, paddingBottom: spacingBottom }}>
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
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
                        <p className="text-stone-600 text-lg font-light">
                            {description}
                        </p>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-4">
                        {layout === 'carousel' && (
                            <div className="flex gap-2 mr-4">
                                <button onClick={() => scroll('left')} className="p-3 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={() => scroll('right')} className="p-3 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                        <Link href="/shop">
                            <Button variant="outline" className="gap-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-500">
                                View All Collection <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>

                {layout === 'carousel' ? (
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="min-w-[280px] md:min-w-[350px] snap-start"
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className={`grid ${mobileColumns === '2' ? 'grid-cols-2' : 'grid-cols-1'} ${columns === '2' ? 'md:grid-cols-2' : columns === '3' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-x-8 gap-y-16`}>
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center md:hidden">
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
