import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface ImageBannerProps {
    image?: string;
    title?: string;
    titleStyle?: TypographyConfig;
    subtitle?: string;
    subtitleStyle?: TypographyConfig;
    ctaText?: string;
    ctaLink?: string;
    align?: 'left' | 'center' | 'right';
    height?: 'small' | 'medium' | 'large';
}

export const ImageBanner = ({
    image = "https://images.unsplash.com/photo-1583391724648-5c1b6837bb46?q=80&w=2070&auto=format&fit=crop",
    title = "New Season Arrivals",
    titleStyle,
    subtitle = "Discover the latest trends for the upcoming wedding season.",
    subtitleStyle,
    ctaText = "SHOP NOW",
    ctaLink = "/shop",
    align = "center",
    height = "medium"
}: ImageBannerProps) => {
    const heightClass = height === 'small' ? 'h-[400px]' : height === 'large' ? 'h-[800px]' : 'h-[600px]';
    const alignClass = align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center';

    return (
        <div className={`relative w-full ${heightClass} overflow-hidden`}>
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className={`absolute inset-0 flex flex-col justify-center p-12 ${alignClass}`}>
                <div className="max-w-2xl text-white">
                    <h2
                        className={cn(
                            "font-serif mb-4",
                            getTypographyClasses(titleStyle) || "text-4xl md:text-6xl"
                        )}
                        style={getTypographyStyles(titleStyle)}
                    >
                        {title}
                    </h2>
                    <p
                        className={cn(
                            "mb-8 opacity-90",
                            getTypographyClasses(subtitleStyle) || "text-lg md:text-xl"
                        )}
                        style={getTypographyStyles(subtitleStyle)}
                    >
                        {subtitle}
                    </p>
                    {ctaText && (
                        <Link href={ctaLink}>
                            <Button className="bg-white text-black hover:bg-gray-100 border-none">
                                {ctaText}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
