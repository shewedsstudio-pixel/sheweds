'use client';

import { motion } from 'framer-motion';

interface ModernMarqueeProps {
    text?: string;
    speed?: number;
    direction?: 'left' | 'right';
    backgroundColor?: string;
    textColor?: string;
}

export const ModernMarquee = ({
    text = 'NEW COLLECTION DROPPING SOON • EXCLUSIVE ACCESS • LIMITED EDITION • ',
    speed = 20,
    direction = 'left',
    backgroundColor = '#000000',
    textColor = '#FFFFFF'
}: ModernMarqueeProps) => {
    return (
        <section
            className="py-12 overflow-hidden whitespace-nowrap flex"
            style={{ backgroundColor, color: textColor }}
        >
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === 'left' ? [0, -1000] : [-1000, 0],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-bold tracking-tighter mx-4 uppercase opacity-90">
                        {text}
                    </span>
                ))}
            </motion.div>
        </section>
    );
};
