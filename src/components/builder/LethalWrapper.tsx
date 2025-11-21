'use client';

import { UniversalStyleProps } from '@/lib/lethal-schema';
import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import { ANIMATION_PRESETS, HOVER_EFFECTS } from '@/lib/animation-presets';

interface LethalWrapperProps {
    children: ReactNode;
    settings?: UniversalStyleProps;
    className?: string;
    id?: string;
}

export const LethalWrapper = ({ children, settings = {}, className = '', id }: LethalWrapperProps) => {

    // Construct CSS styles from settings
    const style: React.CSSProperties = {
        // Layout
        display: settings.display,
        flexDirection: settings.flexDirection,
        justifyContent: settings.justifyContent,
        alignItems: settings.alignItems,
        gap: settings.gap ? `${settings.gap}px` : undefined,

        // Dimensions
        height: settings.height === 'screen' ? '100vh' : settings.height === 'large' ? '800px' : settings.height === 'medium' ? '500px' : settings.height,
        width: settings.width,

        // Typography
        color: settings.textColor,
        textAlign: settings.textAlign,

        // Background
        backgroundColor: settings.backgroundColor,
        backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : undefined,
        backgroundSize: settings.backgroundSize,
        backgroundPosition: settings.backgroundPosition,
        backgroundRepeat: settings.backgroundRepeat,
        opacity: settings.opacity,

        // Effects
        filter: settings.blur ? `blur(${settings.blur}px) grayscale(${settings.grayscale || 0}%)` : undefined,

        // Transforms
        transform: [
            settings.scale ? `scale(${settings.scale})` : '',
            settings.rotate ? `rotate(${settings.rotate}deg)` : '',
            settings.translateX ? `translateX(${settings.translateX}px)` : '',
            settings.translateY ? `translateY(${settings.translateY}px)` : '',
        ].filter(Boolean).join(' ') || undefined,
    };

    // Handle Spacing (Padding) - Support both object and individual keys
    if (settings.padding) {
        style.paddingTop = settings.padding.top;
        style.paddingRight = settings.padding.right;
        style.paddingBottom = settings.padding.bottom;
        style.paddingLeft = settings.padding.left;
    }
    if (settings.paddingTop) style.paddingTop = settings.paddingTop;
    if (settings.paddingRight) style.paddingRight = settings.paddingRight;
    if (settings.paddingBottom) style.paddingBottom = settings.paddingBottom;
    if (settings.paddingLeft) style.paddingLeft = settings.paddingLeft;

    // Handle Spacing (Margin) - Support both object and individual keys
    if (settings.margin) {
        style.marginTop = settings.margin.top;
        style.marginRight = settings.margin.right;
        style.marginBottom = settings.margin.bottom;
        style.marginLeft = settings.margin.left;
    }
    if (settings.marginTop) style.marginTop = settings.marginTop;
    if (settings.marginRight) style.marginRight = settings.marginRight;
    if (settings.marginBottom) style.marginBottom = settings.marginBottom;
    if (settings.marginLeft) style.marginLeft = settings.marginLeft;

    // Handle Borders
    if (settings.border) {
        style.borderWidth = `${settings.border.width}px`;
        style.borderStyle = settings.border.style;
        style.borderColor = settings.border.color;
        if (settings.border.radius) {
            style.borderTopLeftRadius = `${settings.border.radius.tl}px`;
            style.borderTopRightRadius = `${settings.border.radius.tr}px`;
            style.borderBottomRightRadius = `${settings.border.radius.br}px`;
            style.borderBottomLeftRadius = `${settings.border.radius.bl}px`;
        }
    }

    // Handle Shadows
    if (settings.boxShadow && settings.boxShadow.length > 0) {
        style.boxShadow = settings.boxShadow.map(s =>
            `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
        ).join(', ');
    }

    // Editor mode detection
    const [isEditor, setIsEditor] = useState(false);

    useEffect(() => {
        setIsEditor(window.parent !== window);
    }, []);

    // Select Animation Variant
    const animationVariant = settings.animationName && ANIMATION_PRESETS[settings.animationName]
        ? ANIMATION_PRESETS[settings.animationName]
        : ANIMATION_PRESETS['fade-up']; // Default

    // Select Hover Variant
    const hoverVariant = settings.hoverEffect && HOVER_EFFECTS[settings.hoverEffect as keyof typeof HOVER_EFFECTS]
        ? HOVER_EFFECTS[settings.hoverEffect as keyof typeof HOVER_EFFECTS] as any
        : undefined;

    return (
        <motion.div
            id={id}
            style={style}
            className={`${className} ${isEditor ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 hover:z-50 relative transition-all' : ''}`}
            initial="hidden"
            whileInView="visible"
            whileHover={hoverVariant}
            viewport={{ once: true, margin: "-100px" }}
            variants={animationVariant}
            onClick={(e) => {
                if (isEditor && id) {
                    e.stopPropagation();
                    window.parent.postMessage({
                        type: 'SELECT_SECTION',
                        payload: { id }
                    }, '*');
                }
            }}
        >
            {children}
        </motion.div>
    );
};
