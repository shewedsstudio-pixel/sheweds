
export interface Spacing {
    top: string;
    right: string;
    bottom: string;
    left: string;
}

export interface Border {
    width: number;
    style: 'solid' | 'dashed' | 'dotted' | 'none';
    color: string;
    radius: {
        tl: number;
        tr: number;
        br: number;
        bl: number;
    };
}

export interface Shadow {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
}

export interface UniversalStyleProps {
    // Layout
    display?: 'block' | 'flex' | 'grid' | 'none';
    flexDirection?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    gap?: number;

    // Spacing
    margin?: Spacing;
    padding?: Spacing;

    // Typography (Global override for section)
    textColor?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';

    // Background
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundSize?: 'cover' | 'contain' | 'auto';
    backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    backgroundRepeat?: 'no-repeat' | 'repeat';
    opacity?: number;

    // Borders
    border?: Border;

    // Effects
    boxShadow?: Shadow[];
    blur?: number; // backdrop-filter or filter
    grayscale?: number;

    // Transforms
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;

    // Animations
    animationName?: string;
    animationDuration?: number;
    animationDelay?: number;
    hoverEffect?: string;
}

// Admin Panel Schema Definition
export const UNIVERSAL_STYLE_SCHEMA = [
    {
        group: 'Layout',
        fields: [
            { name: 'display', type: 'select', options: ['block', 'flex', 'grid', 'none'], label: 'Display' },
            { name: 'flexDirection', type: 'select', options: ['row', 'column'], label: 'Direction', condition: (s: any) => s.display === 'flex' },
            { name: 'justifyContent', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between'], label: 'Justify', condition: (s: any) => s.display === 'flex' },
            { name: 'alignItems', type: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch'], label: 'Align', condition: (s: any) => s.display === 'flex' },
            { name: 'gap', type: 'number', label: 'Gap (px)', condition: (s: any) => s.display === 'flex' || s.display === 'grid' },
        ]
    },
    {
        group: 'Spacing',
        fields: [
            { name: 'padding', type: 'spacing', label: 'Padding' },
            { name: 'margin', type: 'spacing', label: 'Margin' },
        ]
    },
    {
        group: 'Background',
        fields: [
            { name: 'backgroundColor', type: 'color', label: 'Color' },
            { name: 'backgroundImage', type: 'image', label: 'Image' },
            { name: 'backgroundSize', type: 'select', options: ['cover', 'contain', 'auto'], label: 'Size' },
            { name: 'opacity', type: 'slider', min: 0, max: 1, step: 0.1, label: 'Opacity' },
        ]
    },
    {
        group: 'Typography',
        fields: [
            { name: 'fontFamily', type: 'select', options: ['Inter', 'Roboto', 'Playfair Display', 'Montserrat'], label: 'Font Family' },
            { name: 'fontSize', type: 'select', options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'], label: 'Size' },
            { name: 'fontWeight', type: 'select', options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'], label: 'Weight' },
            { name: 'textColor', type: 'color', label: 'Color' },
            { name: 'textAlign', type: 'select', options: ['left', 'center', 'right', 'justify'], label: 'Align' },
            { name: 'letterSpacing', type: 'select', options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'], label: 'Spacing' },
            { name: 'lineHeight', type: 'select', options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'], label: 'Line Height' },
            { name: 'textTransform', type: 'select', options: ['none', 'uppercase', 'lowercase', 'capitalize'], label: 'Transform' },
        ]
    },
    {
        group: 'Borders',
        fields: [
            { name: 'border', type: 'border', label: 'Border' },
            { name: 'borderRadius', type: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'], label: 'Radius Preset' },
        ]
    },
    {
        group: 'Effects',
        fields: [
            { name: 'boxShadow', type: 'shadow', label: 'Shadow' },
            { name: 'opacity', type: 'slider', min: 0, max: 1, step: 0.1, label: 'Opacity' },
            { name: 'blur', type: 'slider', min: 0, max: 20, label: 'Blur (px)' },
            { name: 'grayscale', type: 'slider', min: 0, max: 100, label: 'Grayscale (%)' },
            { name: 'brightness', type: 'slider', min: 0, max: 200, label: 'Brightness (%)' },
            { name: 'contrast', type: 'slider', min: 0, max: 200, label: 'Contrast (%)' },
            { name: 'saturate', type: 'slider', min: 0, max: 200, label: 'Saturate (%)' },
            { name: 'sepia', type: 'slider', min: 0, max: 100, label: 'Sepia (%)' },
        ]
    },
    {
        group: 'Transforms',
        fields: [
            { name: 'scale', type: 'number', step: 0.1, label: 'Scale' },
            { name: 'rotate', type: 'number', label: 'Rotate (deg)' },
            { name: 'translateX', type: 'number', label: 'Translate X (px)' },
            { name: 'translateY', type: 'number', label: 'Translate Y (px)' },
            { name: 'skewX', type: 'number', label: 'Skew X (deg)' },
            { name: 'skewY', type: 'number', label: 'Skew Y (deg)' },
        ]
    },
    {
        group: 'Animations',
        fields: [
            {
                name: 'animationName',
                label: 'Entrance Animation',
                type: 'select',
                options: [
                    { label: 'None', value: '' },
                    { label: 'Fade Up', value: 'fade-up' },
                    { label: 'Cyberpunk Glitch', value: 'cyberpunk-glitch' },
                    { label: 'Vortex In', value: 'vortex-in' },
                    { label: 'Neon Pulse', value: 'neon-pulse' },
                    { label: 'Liquid Reveal', value: 'liquid-reveal' },
                    { label: 'Cinematic Zoom', value: 'cinematic-zoom' },
                    { label: '3D Flip', value: '3d-flip' },
                ]
            },
            {
                name: 'hoverEffect',
                label: 'Hover Effect',
                type: 'select',
                options: [
                    { label: 'None', value: '' },
                    { label: 'Glow', value: 'glow' },
                    { label: 'Lift', value: 'lift' },
                    { label: 'Shake', value: 'shake' },
                    { label: 'Neon Border', value: 'neon-border' },
                ]
            },
            { name: 'animationDuration', label: 'Duration (s)', type: 'number' },
            { name: 'animationDelay', label: 'Delay (s)', type: 'number' },
        ]
    }
];
