import { Hero } from '@/components/home/Hero';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { AboutSection } from '@/components/home/AboutSection';
import { BridalJourney } from '@/components/home/BridalJourney';
import { TestimonialSlider } from '@/components/home/TestimonialSlider';
import { RichText } from '@/components/sections/RichText';
import { ImageBanner } from '@/components/sections/ImageBanner';

// Registry of all available sections
export const SECTION_REGISTRY: Record<string, any> = {
    'Hero': Hero,
    'FeaturedCollection': FeaturedCollection,
    'AboutSection': AboutSection,
    'BridalJourney': BridalJourney,
    'TestimonialSlider': TestimonialSlider,
    'RichText': RichText,
    'ImageBanner': ImageBanner,
};

// Schema for Admin Editor
// Defines what fields are editable for each section
export const SECTION_SCHEMAS: Record<string, any> = {
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
