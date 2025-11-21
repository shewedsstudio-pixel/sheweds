'use client';

import { Section } from '@/lib/db';
import { SECTION_REGISTRY } from '@/components/sections/registry';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LethalWrapper } from '@/components/builder/LethalWrapper';

interface PageRendererProps {
    sections: Section[];
    products?: any[]; // Pass global data if needed
    heroSlides?: any[];
}

export const PageRenderer = ({ sections: initialSections, products = [], heroSlides = [] }: PageRendererProps) => {
    const [sections, setSections] = useState(initialSections);

    useEffect(() => {
        // Listen for live updates from the Admin Editor iframe
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'UPDATE_PAGE_CONFIG') {
                console.log('Live Preview Update:', event.data.payload);
                setSections(event.data.payload.sections);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    if (!sections || sections.length === 0) {
        return <div className="py-20 text-center">This page is empty. Add sections in the Admin Panel.</div>;
    }

    return (
        <div className="flex flex-col gap-0">
            {sections.map((section, index) => {
                const Component = SECTION_REGISTRY[section.type];

                if (!Component) {
                    return (
                        <div key={section.id} className="p-4 bg-red-50 border border-red-200 text-red-600 text-center">
                            Unknown Section Type: {section.type}
                        </div>
                    );
                }

                // Prepare props
                const props = {
                    ...section.content,
                    // Inject global data if the component needs it
                    products: section.type === 'FeaturedCollection' ? products : undefined,
                    // Prioritize slides from the section content (admin editor), fallback to server prop
                    slides: section.type === 'Hero'
                        ? (section.content.slides && section.content.slides.length > 0 ? section.content.slides : heroSlides)
                        : undefined,
                };

                // Wrapper for animations and settings
                const settings = section.settings || {};
                const paddingTop = settings.paddingTop === 'none' ? 'pt-0' : settings.paddingTop === 'large' ? 'pt-24' : 'pt-12';
                const paddingBottom = settings.paddingBottom === 'none' ? 'pb-0' : settings.paddingBottom === 'large' ? 'pb-24' : 'pb-12';

                return (
                    <LethalWrapper
                        key={section.id}
                        id={section.id}
                        settings={section.settings}
                        className={`${paddingTop} ${paddingBottom}`}
                    >
                        <Component {...props} />
                    </LethalWrapper>
                );
            })}
        </div>
    );
};
