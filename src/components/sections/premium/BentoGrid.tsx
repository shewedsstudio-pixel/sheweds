'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface BentoItem {
    title: string;
    subtitle: string;
    image: string;
    link: string;
    size: 'auto' | 'small' | 'medium' | 'large' | 'tall' | 'wide';
    imagePosition?: string;
    colSpan?: number;
    rowSpan?: number;
    mobileColSpan?: number;
    mobileRowSpan?: number;
}

interface BentoGridProps {
    title?: string;
    titleStyle?: TypographyConfig;
    items?: BentoItem[];
    gridCols?: string;
    mobileGridCols?: string;
    styleSettings?: any;
}

const DEFAULT_ITEMS: BentoItem[] = [
    {
        title: 'New Arrivals',
        subtitle: 'Fresh for the season',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
        link: '/shop/new',
        size: 'large'
    },
    {
        title: 'Accessories',
        subtitle: 'Complete the look',
        image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000&auto=format&fit=crop',
        link: '/shop/accessories',
        size: 'tall'
    },
    {
        title: 'Bridal',
        subtitle: 'For your special day',
        image: 'https://images.unsplash.com/photo-1549416860-5c7946e22746?q=80&w=1000&auto=format&fit=crop',
        link: '/shop/bridal',
        size: 'medium'
    },
    {
        title: 'Sale',
        subtitle: 'Limited time offers',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
        link: '/shop/sale',
        size: 'wide'
    }
];

export const BentoGrid = ({ title = 'CURATED COLLECTIONS', titleStyle, items, gridCols = '4', mobileGridCols = '1', styleSettings }: BentoGridProps) => {
    // Ensure items is an array to prevent hydration errors
    const gridItems = Array.isArray(items) && items.length > 0 ? items : DEFAULT_ITEMS;

    // Dynamic grid columns class
    const getGridColsClass = (cols: string, mobileCols: string) => {
        const mobile = mobileCols === '2' ? 'grid-cols-2' : 'grid-cols-1';

        let desktop = 'md:grid-cols-4';
        switch (cols) {
            case '2': desktop = 'md:grid-cols-2'; break;
            case '3': desktop = 'md:grid-cols-3'; break;
            case '5': desktop = 'md:grid-cols-5'; break;
            case '6': desktop = 'md:grid-cols-6'; break;
        }

        return `${mobile} ${desktop}`;
    };

    const getSpanClass = (item: BentoItem) => {
        // Mobile Spans
        const mobileCol = item.mobileColSpan ? `col-span-${item.mobileColSpan}` : 'col-span-1';
        const mobileRow = item.mobileRowSpan ? `row-span-${item.mobileRowSpan}` : 'row-span-1';
        const mobileClasses = `${mobileCol} ${mobileRow}`;

        // Desktop Spans (Priority: Custom > Preset)
        if (item.colSpan || item.rowSpan) {
            const col = item.colSpan ? `md:col-span-${item.colSpan}` : '';
            const row = item.rowSpan ? `md:row-span-${item.rowSpan}` : '';
            return `${mobileClasses} ${col} ${row}`;
        }

        // Fallback to Presets for Desktop
        switch (item.size) {
            case 'large': return `${mobileClasses} md:col-span-2 md:row-span-2`;
            case 'tall': return `${mobileClasses} md:col-span-1 md:row-span-2`;
            case 'wide': return `${mobileClasses} md:col-span-2 md:row-span-1`;
            case 'medium': return `${mobileClasses} md:col-span-1 md:row-span-1`;
            case 'small': return `${mobileClasses} md:col-span-1 md:row-span-1`;
            default: return `${mobileClasses} md:col-span-1 md:row-span-1`;
        }
    };

    // Get border radius class
    const getBorderRadius = () => {
        const radius = styleSettings?.borderRadius;
        switch (radius) {
            case 'none': return 'rounded-none';
            case 'small': return 'rounded-md';
            case 'medium': return 'rounded-xl';
            case 'large': return 'rounded-3xl';
            case 'full': return 'rounded-full';
            default: return 'rounded-2xl'; // Default
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <section className="w-full h-full">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className={cn(
                        "text-4xl md:text-6xl font-bold mb-12 text-center tracking-tight",
                        getTypographyClasses(titleStyle)
                    )}
                    style={getTypographyStyles(titleStyle)}
                >
                    {title}
                </motion.h2>

                <motion.div
                    className={`grid ${getGridColsClass(gridCols, mobileGridCols)} auto-rows-[300px] gap-4`}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {gridItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative group overflow-hidden ${getBorderRadius()} cursor-pointer ${getSpanClass(item)}`}
                        >
                            <Link href={item.link || '#'} className="block h-full w-full">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        style={{ objectPosition: item.imagePosition || 'center' }}
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
                </motion.div>
            </div>
        </section>
    );
};
