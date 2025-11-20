'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/db';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link href={`/product/${product.id}`} className="group block">
            <motion.div
                className="relative overflow-hidden bg-gray-100 aspect-[3/4]"
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
            </motion.div>

            <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-base font-semibold text-gray-900 mt-2">
                    ₹{product.price.toLocaleString('en-IN')}
                </p>
            </div>
        </Link>
    );
};
