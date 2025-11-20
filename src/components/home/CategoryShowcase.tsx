'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

const categories = [
    {
        id: 'lehengas',
        name: 'Bridal Lehengas',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
        size: 'large' // spans 2 columns
    },
    {
        id: 'sarees',
        name: 'Royal Sarees',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
        size: 'small'
    },
    {
        id: 'gowns',
        name: 'Evening Gowns',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        size: 'small'
    },
];

export const CategoryShowcase = () => {
    return (
        <section className="py-20 bg-stone-50">
            <Container>
                <div className="text-center mb-16">
                    <span className="text-amber-600 tracking-widest uppercase text-sm font-medium">The Collection</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-stone-900">Curated for Royalty</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {categories.map((category, index) => (
                        <Link
                            href={`/shop?category=${category.id}`}
                            key={category.id}
                            className={`relative group overflow-hidden rounded-lg ${category.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                                className="h-full w-full relative"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-3xl font-serif italic mb-2">{category.name}</h3>
                                        <span className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};
