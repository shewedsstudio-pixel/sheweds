'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface JourneyItem {
    title: string;
    image: string;
    link: string;
}

interface BridalJourneyProps {
    title?: string;
    titleStyle?: TypographyConfig;
    subtitle?: string;
    subtitleStyle?: TypographyConfig;
    items?: JourneyItem[];
    cardHeight?: 'small' | 'medium' | 'large';
    columns?: string;
    mobileColumns?: string;
    spacingTop?: string;
    spacingBottom?: string;
}

const DEFAULT_ITEMS = [
    {
        title: 'WEDDING',
        image: 'https://images.unsplash.com/photo-1512101176959-c557f3516787?q=80&w=800&auto=format&fit=crop',
        link: '/shop?category=wedding'
    },
    {
        title: 'RECEPTION',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        link: '/shop?category=reception'
    },
    {
        title: 'ENGAGEMENT',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        link: '/shop?category=engagement'
    },
    {
        title: 'MEHENDI',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
        link: '/shop?category=mehendi'
    }
];

export const BridalJourney = ({
    title = "CURATE A LOOK FOR THE",
    titleStyle,
    subtitle = "BRIDAL JOURNEY",
    subtitleStyle,
    items = DEFAULT_ITEMS,
    cardHeight = 'medium',
    columns = '4',
    mobileColumns = '2',
    spacingTop = '0.5rem',
    spacingBottom = '1rem'
}: BridalJourneyProps) => {
    // Map height settings to classes
    const heightClasses = {
        small: 'min-h-[300px] md:min-h-[400px]',
        medium: 'min-h-[400px] md:min-h-[500px]',
        large: 'min-h-[500px] md:min-h-[600px]'
    };

    const currentHeightClass = heightClasses[cardHeight] || heightClasses.medium;

    return (
        <section className="bg-[#FEF8E6]" style={{ paddingTop: spacingTop, paddingBottom: spacingBottom }}>
            <Container>
                <div className="text-center mb-4 md:mb-6">
                    <h2
                        className={cn("font-serif mb-2", getTypographyClasses(titleStyle) || "text-3xl md:text-4xl text-[#3C1E10]")}
                        style={getTypographyStyles(titleStyle)}
                    >
                        {title}
                    </h2>
                    <h2
                        className={cn("font-serif mb-4", getTypographyClasses(subtitleStyle) || "text-3xl md:text-4xl text-[#3C1E10]")}
                        style={getTypographyStyles(subtitleStyle)}
                    >
                        {subtitle}
                    </h2>
                </div>

                <div className={`grid ${mobileColumns === '1' ? 'grid-cols-1' : 'grid-cols-2'} ${columns === '2' ? 'md:grid-cols-2' : columns === '3' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 md:gap-6`}>
                    {items.map((item, index) => (
                        <div key={index} className="relative group cursor-pointer">
                            {/* Arched Image Container */}
                            <div className={`relative ${currentHeightClass} overflow-hidden rounded-t-[100px] border-4 border-[#F4EBD9]`}>
                                <Image
                                    src={item.image || 'https://via.placeholder.com/400x600'}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Button Overlay */}
                            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%]">
                                <Link href={item.link || '#'}>
                                    <Button className="w-full bg-[#E86A33] hover:bg-[#D05A28] text-white border-none font-medium tracking-wider uppercase py-3 md:py-6 text-xs md:text-sm">
                                        {item.title}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
