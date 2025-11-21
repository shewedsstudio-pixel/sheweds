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
            { name: 'videoUrl', type: 'image', label: 'Video Source (Upload/URL)' },
            { name: 'title', type: 'textarea', label: 'Main Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'subtitle', type: 'text', label: 'Subtitle' },
            { name: 'subtitleStyle', type: 'typography', label: 'Subtitle Style' },
            { name: 'ctaText', type: 'text', label: 'Button Text' },
            { name: 'ctaLink', type: 'text', label: 'Button Link' },
            { name: 'overlayOpacity', type: 'slider', min: 0, max: 1, step: 0.1, label: 'Overlay Opacity' },
        ],
        styles: [
            {
                group: 'Layout',
                fields: [
                    { name: 'height', type: 'select', options: ['screen', 'large', 'medium'], label: 'Height' },
                    { name: 'paddingTop', type: 'spacing', label: 'Top Padding' },
                    { name: 'paddingBottom', type: 'spacing', label: 'Bottom Padding' },
                ]
            },
            {
                group: 'Typography',
                fields: [
                    { name: 'textColor', type: 'color', label: 'Text Color' },
                    { name: 'textAlign', type: 'select', options: ['left', 'center', 'right'], label: 'Alignment' },
                ]
            }
        ]
    },
    'BentoGrid': {
        name: 'Bento Grid (Premium)',
        icon: 'LayoutDashboard',
        fields: [
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'gridCols', type: 'select', options: ['2', '3', '4', '5', '6'], label: 'Grid Columns (Desktop)' },
            { name: 'mobileGridCols', type: 'select', options: ['1', '2'], label: 'Grid Columns (Mobile)' },
            {
                name: 'items', type: 'array', label: 'Grid Items', itemSchema: {
                    fields: [
                        { name: 'title', type: 'text', label: 'Title' },
                        { name: 'subtitle', type: 'text', label: 'Subtitle' },
                        { name: 'image', type: 'image', label: 'Image' },
                        { name: 'imagePosition', type: 'select', options: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'], label: 'Image Position' },
                        { name: 'link', type: 'text', label: 'Link' },
                        { name: 'size', type: 'select', options: ['auto', 'small', 'medium', 'large', 'tall', 'wide'], label: 'Preset Size' },
                        { name: 'colSpan', type: 'number', label: 'Desktop Col Span (1-4)' },
                        { name: 'rowSpan', type: 'number', label: 'Desktop Row Span (1-4)' },
                        { name: 'mobileColSpan', type: 'number', label: 'Mobile Col Span (1-2)' },
                        { name: 'mobileRowSpan', type: 'number', label: 'Mobile Row Span (1-2)' },
                    ]
                }
            }
        ],
        styles: [
            {
                group: 'Layout',
                fields: [
                    { name: 'paddingTop', type: 'spacing', label: 'Top Padding' },
                    { name: 'paddingBottom', type: 'spacing', label: 'Bottom Padding' },
                    { name: 'gap', type: 'select', options: ['small', 'medium', 'large'], label: 'Grid Gap' },
                ]
            },
            {
                group: 'Shapes',
                fields: [
                    { name: 'borderRadius', type: 'select', options: ['none', 'small', 'medium', 'large', 'full'], label: 'Corner Radius' },
                ]
            },
            {
                group: 'Background',
                fields: [
                    { name: 'backgroundColor', type: 'color', label: 'Background Color' },
                ]
            }
        ]
    },
    'ModernMarquee': {
        name: 'Infinite Marquee',
        icon: 'MoveHorizontal',
        fields: [
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
            { name: 'image', type: 'image', label: 'Image' },
            { name: 'title', type: 'text', label: 'Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'subtitle', type: 'text', label: 'Subtitle' },
            { name: 'subtitleStyle', type: 'typography', label: 'Subtitle Style' },
            { name: 'ctaText', type: 'text', label: 'Button Text' },
            { name: 'ctaLink', type: 'text', label: 'Button Link' },
            { name: 'align', type: 'select', options: ['left', 'center', 'right'], label: 'Alignment' },
            { name: 'height', type: 'select', options: ['small', 'medium', 'large'], label: 'Height' },
        ]
    },
    'FeaturedCollection': {
        name: 'Featured Collection',
        icon: 'LayoutGrid',
        fields: [
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'layout', type: 'select', options: ['grid', 'carousel'], label: 'Layout Mode' },
            { name: 'itemCount', type: 'select', options: ['4', '8', '12'], label: 'Number of Products' },
            { name: 'productCardStyle', type: 'select', options: ['standard', 'minimal'], label: 'Card Style' },
            { name: 'showPrice', type: 'select', options: ['true', 'false'], label: 'Show Price' },
            { name: 'showAddToCart', type: 'select', options: ['true', 'false'], label: 'Show Add to Cart' },
        ],
        styles: [
            {
                group: 'Layout',
                fields: [
                    { name: 'paddingTop', type: 'spacing', label: 'Top Padding' },
                    { name: 'paddingBottom', type: 'spacing', label: 'Bottom Padding' },
                ]
            },
            {
                group: 'Shapes',
                fields: [
                    { name: 'borderRadius', type: 'select', options: ['none', 'small', 'medium', 'large', 'full'], label: 'Card Corner Radius' },
                ]
            },
            {
                group: 'Background',
                fields: [
                    { name: 'backgroundColor', type: 'color', label: 'Background Color' },
                ]
            }
        ]
    },
    'RichText': {
        name: 'Rich Text',
        icon: 'Type',
        fields: [
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
            { name: 'title', type: 'text', label: 'Heading' },
            { name: 'titleStyle', type: 'typography', label: 'Heading Style' },
            { name: 'description1', type: 'textarea', label: 'Paragraph 1' },
            { name: 'description2', type: 'textarea', label: 'Paragraph 2' },
            { name: 'image', type: 'image', label: 'Image' },
            { name: 'buttonText', type: 'text', label: 'Button Text' },
            { name: 'buttonLink', type: 'text', label: 'Button Link' },
        ]
    },
    'BridalJourney': {
        name: 'Bridal Journey',
        icon: 'Heart',
        fields: [
            { name: 'title', type: 'text', label: 'Main Title' },
            { name: 'titleStyle', type: 'typography', label: 'Title Style' },
            { name: 'subtitle', type: 'text', label: 'Subtitle' },
            { name: 'subtitleStyle', type: 'typography', label: 'Subtitle Style' },
            { name: 'cardHeight', type: 'select', options: ['small', 'medium', 'large'], label: 'Card Height' },
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
