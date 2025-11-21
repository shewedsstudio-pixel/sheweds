'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface BentoItem {
    title: string;
    subtitle: string;
    image: string;
    link: string;
    size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
    focalPoint?: string;
}

interface BentoGridProps {
    title?: string;
    columns?: string;
    mobileColumns?: string;
    items?: BentoItem[];
    spacingTop?: string;
    spacingBottom?: string;
}

const DEFAULT_ITEMS: BentoItem[] = [
    {
        title: 'New Arrivals',
        subtitle: 'Fresh for the season',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
        link: '/shop/new',
        size: 'large',
        focalPoint: 'center'
    },
    // ... other default items can remain as is or be updated
];

export const BentoGrid = ({
    title = 'CURATED COLLECTIONS',
    columns = '4',
    mobileColumns = '1',
    items,
    spacingTop = '6rem',
    spacingBottom = '6rem'
}: BentoGridProps) => {
    // Ensure items is an array to prevent hydration errors
    const gridItems = Array.isArray(items) && items.length > 0 ? items : DEFAULT_ITEMS;

    // Map columns to grid class
    const gridColsClass = {
        '2': 'md:grid-cols-2',
        '3': 'md:grid-cols-3',
        '4': 'md:grid-cols-4',
    }[columns] || 'md:grid-cols-4';

    const mobileColsClass = {
        '1': 'grid-cols-1',
        '2': 'grid-cols-2',
    }[mobileColumns] || 'grid-cols-1';

    return (
        <section className="px-4 bg-white" style={{ paddingTop: spacingTop, paddingBottom: spacingBottom }}>
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-12 text-center tracking-tight"
                >
                    {title}
                </motion.h2>

                <div className={`grid ${mobileColsClass} ${gridColsClass} auto-rows-[300px] gap-4`}>
                    {gridItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                item.size === 'tall' ? 'md:col-span-1 md:row-span-2' :
                                    item.size === 'wide' ? 'md:col-span-2 md:row-span-1' :
                                        'md:col-span-1 md:row-span-1'
                                }`}
                        >
                            <Link href={item.link} className="block h-full w-full">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ objectPosition: item.focalPoint || 'center' }}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-2xl font-bold">{item.title}</h3>
                                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
