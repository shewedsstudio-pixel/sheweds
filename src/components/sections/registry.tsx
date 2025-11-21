import { Hero } from '@/components/home/Hero';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { AboutSection } from '@/components/home/AboutSection';
import { BridalJourney } from '@/components/home/BridalJourney';
import { TestimonialSlider } from '@/components/home/TestimonialSlider';
import { RichText } from '@/components/sections/RichText';
import { ImageBanner } from '@/components/sections/ImageBanner';

import { CinematicHero } from '@/components/sections/premium/CinematicHero';
import { BentoGrid } from '@/components/sections/premium/BentoGrid';
import { ModernMarquee } from '@/components/sections/premium/ModernMarquee';

// Registry of all available sections
export const SECTION_REGISTRY: Record<string, any> = {
    'Hero': Hero,
    'FeaturedCollection': FeaturedCollection,
    'AboutSection': AboutSection,
    'BridalJourney': BridalJourney,
    'TestimonialSlider': TestimonialSlider,
    'RichText': RichText,
    'ImageBanner': ImageBanner,
    // Premium Sections
    'CinematicHero': CinematicHero,
    'BentoGrid': BentoGrid,
    'ModernMarquee': ModernMarquee,
};

// Schema for Admin Editor
// Defines what fields are editable for each section
export const SECTION_SCHEMAS: Record<string, any> = {
    'CinematicHero': {
        name: 'Cinematic Hero (VFX)',
        icon: 'Film',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'videoUrl', type: 'image', label: 'Video Source (Upload/URL)' },
            { name: 'title', type: 'textarea', label: 'Main Title' },
            { name: 'subtitle', type: 'text', label: 'Subtitle' },
            { name: 'ctaText', type: 'text', label: 'Button Text' },
            { name: 'ctaLink', type: 'text', label: 'Button Link' },
            { name: 'overlayOpacity', type: 'slider', min: 0, max: 1, step: 0.1, label: 'Overlay Opacity' },
            { name: 'mobileHeight', type: 'select', options: ['50vh', '60vh', '70vh', '80vh', '90vh', '100vh'], label: 'Mobile Height' },
            { name: 'desktopHeight', type: 'select', options: ['80vh', '90vh', '100vh'], label: 'Desktop Height' },
            { name: 'layoutMode', type: 'select', options: ['full-screen', 'centered', 'split'], label: 'Layout Mode' },
        ]
    },
    'BentoGrid': {
        name: 'Bento Grid (Premium)',
        icon: 'LayoutDashboard',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'columns', type: 'select', options: ['2', '3', '4'], label: 'Desktop Columns' },
            { name: 'mobileColumns', type: 'select', options: ['1', '2'], label: 'Mobile Columns' },
            {
                name: 'items', type: 'array', label: 'Grid Items', itemSchema: {
                    fields: [
                        { name: 'title', type: 'text', label: 'Title' },
                        { name: 'subtitle', type: 'text', label: 'Subtitle' },
                        { name: 'image', type: 'image', label: 'Image' },
                        { name: 'focalPoint', type: 'select', options: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'], label: 'Image Focal Point' },
                        { name: 'link', type: 'text', label: 'Link' },
                        { name: 'size', type: 'select', options: ['small', 'medium', 'large', 'tall', 'wide'], label: 'Card Size' },
                    ]
                }
            }
        ]
    },
    'ModernMarquee': {
        name: 'Infinite Marquee',
        icon: 'MoveHorizontal',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'text', type: 'text', label: 'Scrolling Text' },
            { name: 'speed', type: 'number', label: 'Speed (sec)' },
            { name: 'direction', type: 'select', options: ['left', 'right'], label: 'Direction' },
            { name: 'backgroundColor', type: 'color', label: 'Background Color' },
            { name: 'textColor', type: 'color', label: 'Text Color' },
        ]
    },
    'Hero': {
        name: 'Hero Slider',
        icon: 'GalleryHorizontal',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'mobileHeight', type: 'select', options: ['50vh', '60vh', '70vh', '80vh', '90vh', '100vh'], label: 'Mobile Height' },
            { name: 'desktopHeight', type: 'select', options: ['80vh', '90vh', '100vh'], label: 'Desktop Height' },
            { name: 'layoutMode', type: 'select', options: ['full-width', 'contained', 'split-screen'], label: 'Layout Mode' },
            {
                name: 'slides', type: 'array', label: 'Slides', itemSchema: {
                    fields: [
                        { name: 'type', type: 'select', options: ['image', 'video'], label: 'Type' },
                        { name: 'url', type: 'image', label: 'Media (Image/Video)' },
                        { name: 'title', type: 'text', label: 'Title' },
                        { name: 'titleStyle', type: 'typography', label: 'Title Style' },
                        { name: 'subtitle', type: 'text', label: 'Subtitle' },
                        { name: 'subtitleStyle', type: 'typography', label: 'Subtitle Style' },
                        { name: 'ctaText', type: 'text', label: 'Button Text' },
                        { name: 'ctaLink', type: 'text', label: 'Button Link' },
                    ]
                }
            }
        ]
    },
    'ImageBanner': {
        name: 'Image Banner',
        icon: 'Image',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'image', type: 'image', label: 'Image' },
            { name: 'title', type: 'text', label: 'Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'subtitle', type: 'text', label: 'Subtitle' },
            { name: 'subtitleStyle', type: 'typography', label: 'Subtitle Style' },
            { name: 'ctaText', type: 'text', label: 'Button Text' },
            { name: 'ctaLink', type: 'text', label: 'Button Link' },
            { name: 'align', type: 'select', options: ['left', 'center', 'right'], label: 'Alignment' },
            { name: 'height', type: 'select', options: ['small', 'medium', 'large'], label: 'Height' },
            { name: 'layoutMode', type: 'select', options: ['full-width', 'overlay', 'side-by-side'], label: 'Layout Mode' },
        ]
    },
    'FeaturedCollection': {
        name: 'Featured Collection',
        icon: 'LayoutGrid',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'layout', type: 'select', options: ['grid', 'carousel'], label: 'Layout Mode' },
            { name: 'columns', type: 'select', options: ['2', '3', '4'], label: 'Desktop Columns' },
            { name: 'mobileColumns', type: 'select', options: ['1', '2'], label: 'Mobile Columns' },
            { name: 'itemCount', type: 'select', options: ['4', '8', '12'], label: 'Number of Products' },
            { name: 'productCardStyle', type: 'select', options: ['standard', 'minimal'], label: 'Card Style' },
            { name: 'cardShape', type: 'select', options: ['square', 'portrait', 'landscape'], label: 'Image Aspect Ratio' },
            { name: 'showPrice', type: 'select', options: ['true', 'false'], label: 'Show Price' },
            { name: 'showAddToCart', type: 'select', options: ['true', 'false'], label: 'Show Add to Cart' },
        ]
    },
    'RichText': {
        name: 'Rich Text',
        icon: 'Type',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'title', type: 'text', label: 'Heading' },
            { name: 'titleStyle', type: 'typography', label: 'Heading Style' },
            { name: 'content', type: 'textarea', label: 'Content' },
            { name: 'align', type: 'select', options: ['left', 'center', 'right'], label: 'Alignment' },
            { name: 'backgroundColor', type: 'select', options: ['white', 'cream'], label: 'Background' },
        ]
    },
    'AboutSection': {
        name: 'About Brand',
        icon: 'Info',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'title', type: 'text', label: 'Heading' },
            { name: 'titleStyle', type: 'typography', label: 'Heading Style' },
            { name: 'description1', type: 'textarea', label: 'Paragraph 1' },
            { name: 'description2', type: 'textarea', label: 'Paragraph 2' },
            { name: 'image', type: 'image', label: 'Image' },
            { name: 'buttonText', type: 'text', label: 'Button Text' },
            { name: 'buttonLink', type: 'text', label: 'Button Link' },
            { name: 'layoutMode', type: 'select', options: ['image-left', 'image-right', 'image-top'], label: 'Layout Mode' },
        ]
    },
    'BridalJourney': {
        name: 'Bridal Journey',
        icon: 'Heart',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'title', type: 'text', label: 'Main Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'subtitle', type: 'text', label: 'Subtitle' },
            { name: 'subtitleStyle', type: 'typography', label: 'Subtitle Style' },
            { name: 'cardHeight', type: 'select', options: ['small', 'medium', 'large'], label: 'Card Height' },
            { name: 'columns', type: 'select', options: ['2', '3', '4'], label: 'Desktop Columns' },
            { name: 'mobileColumns', type: 'select', options: ['1', '2'], label: 'Mobile Columns' },
            {
                name: 'items', type: 'array', label: 'Journey Items', itemSchema: {
                    fields: [
                        { name: 'title', type: 'text', label: 'Title' },
                        { name: 'image', type: 'image', label: 'Image' },
                        { name: 'link', type: 'text', label: 'Link' },
                    ]
                }
            }
        ]
    },
    'TestimonialSlider': {
        name: 'Testimonials',
        icon: 'MessageSquareQuote',
        fields: [
            { name: 'spacingTop', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Top Spacing' },
            { name: 'spacingBottom', type: 'select', options: ['0', '1rem', '2rem', '3rem', '4rem', '6rem', '8rem', '12rem'], label: 'Bottom Spacing' },
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            {
                name: 'testimonials', type: 'array', label: 'Testimonials', itemSchema: {
                    fields: [
                        { name: 'text', type: 'textarea', label: 'Quote' },
                        { name: 'author', type: 'text', label: 'Author Name' },
                        { name: 'location', type: 'text', label: 'Location' },
                    ]
                }
            }
        ]
    }
};
