import { CSSProperties } from 'react';

export interface TypographyConfig {
    size?: string;
    weight?: string;
    align?: string;
    color?: string;
}

export function getTypographyClasses(config?: TypographyConfig): string {
    if (!config) return '';
    const { size, weight, align } = config;
    return [size, weight, align].filter(Boolean).join(' ');
}

export function getTypographyStyles(config?: TypographyConfig): CSSProperties {
    if (!config?.color) return {};
    return { color: config.color };
}
