'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '@/lib/db';
import { getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface HeroProps {
    slides?: HeroSlide[];
    mobileHeight?: string;
    desktopHeight?: string;
    spacingTop?: string;
    spacingBottom?: string;
    layoutMode?: string;
}

export const Hero = ({
    slides = [],
    mobileHeight = '85vh',
    desktopHeight = '85vh',
    spacingTop = '0',
    spacingBottom = '0',
    layoutMode = 'full-width'
}: HeroProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Debug logging
    console.log('Hero Component - slides received:', slides);
    console.log('Hero Component - slides length:', slides.length);

    // Default slides if none provided
    const heroSlides: HeroSlide[] = slides.length > 0 ? slides : [
        {
            id: 'default',
            type: 'video',
            url: 'https://videos.pexels.com/video-files/3926946/3926946-uhd_2560_1440_25fps.mp4',
            title: 'Mohey Rang Do\nBurnt Caramel',
            subtitle: 'Because beige is never just beige',
            ctaText: 'DISCOVER 250+ SHADES',
            ctaLink: '/shop'
        }
    ];

    console.log('Hero Component - using heroSlides:', heroSlides);

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <section
            className="relative w-full overflow-hidden bg-[#FEF8E6]"
            style={{
                height: `var(--hero-height, ${desktopHeight})`,
                paddingTop: spacingTop,
                paddingBottom: spacingBottom
            }}
        >
            <style jsx>{`
                @media (max-width: 768px) {
                    section {
                        height: ${mobileHeight} !important;
                    }
                }
                @media (min-width: 769px) {
                    section {
                        height: ${desktopHeight} !important;
                    }
                }
            `}</style>
            <AnimatePresence mode="wait">
                {heroSlides.map((slide, index) => (
                    index === currentSlide && (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* Background */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-black/20 z-10" />
                                {slide.type === 'video' ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover object-center"
                                    >
                                        <source src={slide.url} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={slide.url}
                                        alt={slide.title}
                                        className="w-full h-full object-cover object-center"
                                        style={{
                                            imageRendering: 'crisp-edges',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'translateZ(0)',
                                        }}
                                        loading="eager"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto mt-20">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className={cn(
                                        "font-serif font-bold mb-4 leading-tight drop-shadow-lg whitespace-pre-line",
                                        getTypographyClasses(slide.titleStyle) || "text-5xl md:text-7xl"
                                    )}
                                    style={getTypographyStyles(slide.titleStyle)}
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className={cn(
                                        "mb-8 font-light drop-shadow-md",
                                        getTypographyClasses(slide.subtitleStyle) || "text-xl md:text-2xl text-white/90"
                                    )}
                                    style={getTypographyStyles(slide.subtitleStyle)}
                                >
                                    {slide.subtitle}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.1 }}
                                >
                                    <Link href={slide.ctaLink || '#'}>
                                        <Button size="lg" className="bg-white text-[#3C1E10] hover:bg-[#FEF8E6] border-none px-12 py-4 text-lg tracking-widest font-bold uppercase">
                                            {slide.ctaText}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Navigation Arrows */}
            {heroSlides.length > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors">
                        <ChevronRight size={32} />
                    </button>
                </>
            )}
        </section>
    );
};
