'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface CinematicHeroProps {
    videoUrl?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    overlayOpacity?: number;
    mobileHeight?: string;
    desktopHeight?: string;
    spacingTop?: string;
    spacingBottom?: string;
    layoutMode?: string;
}

export const CinematicHero = ({
    videoUrl = 'https://videos.pexels.com/video-files/3926946/3926946-uhd_2560_1440_25fps.mp4',
    title = 'ELEGANCE\nREDEFINED',
    subtitle = 'Experience the future of fashion.',
    ctaText = 'EXPLORE COLLECTION',
    ctaLink = '/shop',
    overlayOpacity = 0.4,
    mobileHeight = '70vh',
    desktopHeight = '100vh',
    spacingTop = '0',
    spacingBottom = '0',
    layoutMode = 'full-screen'
}: CinematicHeroProps) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-black"
            style={{
                height: desktopHeight,
                paddingTop: spacingTop,
                paddingBottom: spacingBottom
            }}
        >
            <style jsx>{`
                @media (max-width: 768px) {
                    div {
                        height: ${mobileHeight} !important;
                    }
                }
                @media (min-width: 769px) {
                    div {
                        height: ${desktopHeight} !important;
                    }
                }
            `}</style>
            {/* Parallax Video Background */}
            <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4"
            >
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 whitespace-pre-line bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl md:text-2xl font-light tracking-widest mb-10 text-white/80"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link href={ctaLink}>
                        <Button
                            size="lg"
                            className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg tracking-widest rounded-none border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
                        >
                            {ctaText}
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </div>
    );
};
