'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/components/ui/Button';

interface ProductGalleryProps {
    images: string[];
    videos: string[];
}

export const ProductGallery = ({ images, videos }: ProductGalleryProps) => {
    const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video'; src: string }>(
        images.length > 0 ? { type: 'image', src: images[0] } : { type: 'video', src: videos[0] }
    );

    return (
        <div className="space-y-4">
            {/* Main Display */}
            <div className="relative aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden">
                {activeMedia.type === 'image' ? (
                    <Image
                        src={activeMedia.src}
                        alt="Product Image"
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <video src={activeMedia.src} className="w-full h-full object-cover" controls autoPlay loop muted />
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                    <button
                        key={`img-${idx}`}
                        onClick={() => setActiveMedia({ type: 'image', src: img })}
                        className={cn(
                            "relative h-20 w-20 flex-shrink-0 rounded overflow-hidden border-2",
                            activeMedia.src === img ? "border-amber-600" : "border-transparent"
                        )}
                    >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                    </button>
                ))}
                {videos.map((vid, idx) => (
                    <button
                        key={`vid-${idx}`}
                        onClick={() => setActiveMedia({ type: 'video', src: vid })}
                        className={cn(
                            "relative h-20 w-20 flex-shrink-0 rounded overflow-hidden border-2 bg-black flex items-center justify-center",
                            activeMedia.src === vid ? "border-amber-600" : "border-transparent"
                        )}
                    >
                        <span className="text-white text-xs">Video</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
