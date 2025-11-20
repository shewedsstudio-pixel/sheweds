'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/db';
import { motion } from 'framer-motion';
import { cn } from '@/components/ui/Button';

interface ProductCardProps {
    product: Product;
    variant?: 'standard' | 'minimal';
    showPrice?: boolean;
    showAddToCart?: boolean;
}

export const ProductCard = ({ product, variant = 'standard', showPrice = true }: ProductCardProps) => {
    return (
        <Link href={`/product/${product.id}`} className="group block h-full">
            <motion.div
                className={cn(
                    "relative overflow-hidden bg-gray-100",
                    variant === 'standard' ? "aspect-[3/4]" : "aspect-[4/5] rounded-lg"
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Primary Image */}
                <Image
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />

                {/* Secondary Image (Reveal on Hover) */}
                {product.images?.[1] && (
                    <Image
                        src={product.images[1]}
                        alt={product.name}
                        fill
                        className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                {variant === 'minimal' && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-medium truncate">{product.name}</p>
                        {showPrice && <p className="text-sm opacity-90">₹{product.price.toLocaleString('en-IN')}</p>}
                    </div>
                )}
            </motion.div>

            {variant === 'standard' && (
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    {showPrice && (
                        <p className="text-base font-semibold text-gray-900 mt-2">
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>
                    )}
                </div>
            )}
        </Link>
    );
};
