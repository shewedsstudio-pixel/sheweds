'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Quote } from 'lucide-react';

import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface Testimonial {
    id: number | string;
    text: string;
    author: string;
    location: string;
}

interface TestimonialSliderProps {
    testimonials?: Testimonial[];
    title?: string;
    titleStyle?: TypographyConfig;
}

const DEFAULT_TESTIMONIALS = [
    {
        id: 1,
        text: "The lehenga I bought for my wedding was nothing short of a masterpiece. The intricate embroidery and the fit were perfect. Felt like a queen!",
        author: "Priya Sharma",
        location: "Mumbai"
    },
    {
        id: 2,
        text: "SHEWEDS brings the Sabyasachi vibe at a much more accessible touchpoint without compromising on luxury. Truly exceptional service.",
        author: "Ananya Singh",
        location: "Delhi"
    },
    {
        id: 3,
        text: "From the packaging to the fabric quality, everything screams premium. I'm in love with my saree collection from here.",
        author: "Meera Patel",
        location: "London"
    }
];

export const TestimonialSlider = ({
    testimonials = DEFAULT_TESTIMONIALS,
    title,
    titleStyle
}: TestimonialSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (testimonials.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-stone-900 text-stone-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <Container>
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
                    {title && (
                        <h2
                            className={cn(
                                "font-serif mb-12 text-amber-500",
                                getTypographyClasses(titleStyle) || "text-3xl md:text-4xl"
                            )}
                            style={getTypographyStyles(titleStyle)}
                        >
                            {title}
                        </h2>
                    )}
                    <Quote size={48} className="text-amber-600 mb-8 opacity-50" />

                    <div className="h-[200px] flex items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <p className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-8">
                                    "{testimonials[currentIndex]?.text}"
                                </p>
                                <div>
                                    <h4 className="text-lg font-medium text-amber-500">{testimonials[currentIndex]?.author}</h4>
                                    <span className="text-sm text-stone-500">{testimonials[currentIndex]?.location}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex gap-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-amber-600' : 'bg-stone-700'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
