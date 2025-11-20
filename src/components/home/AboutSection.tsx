'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface AboutSectionProps {
    title?: string;
    titleStyle?: TypographyConfig;
    description1?: string;
    description2?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
}

export const AboutSection = ({
    title = "Weaving Dreams into Reality",
    titleStyle,
    description1 = "At SHEWEDS, we believe that every stitch tells a story. Born from a passion for Indian heritage and modern aesthetics, our brand represents the pinnacle of bridal luxury.",
    description2 = "Our collections are handcrafted by master artisans who have inherited their skills through generations. From the intricate Zardosi of Lucknow to the vibrant Bandhani of Gujarat, we bring you the finest traditions of India.",
    image = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e28?q=80&w=2888&auto=format&fit=crop",
    buttonText = "Read Our Story",
    buttonLink = "/about"
}: AboutSectionProps) => {
    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Side */}
                    <motion.div
                        className="w-full md:w-1/2 relative aspect-[4/5]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-amber-100 transform -translate-x-4 translate-y-4 rounded-lg" />
                        <div className="relative h-full w-full rounded-lg overflow-hidden">
                            {/* Placeholder for brand story image */}
                            <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
                                <Image
                                    src={image}
                                    alt="Brand Story"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2
                            className={cn(
                                "font-serif font-bold mb-6",
                                getTypographyClasses(titleStyle) || "text-3xl md:text-4xl text-stone-900"
                            )}
                            style={getTypographyStyles(titleStyle)}
                        >
                            {title}
                        </h2>
                        <p className="text-stone-600 mb-6 leading-relaxed">
                            {description1}
                        </p>
                        <p className="text-stone-600 mb-8 leading-relaxed">
                            {description2}
                        </p>
                        <Link href={buttonLink}>
                            <Button variant="outline">{buttonText}</Button>
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
