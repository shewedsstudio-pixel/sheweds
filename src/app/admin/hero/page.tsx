'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface HeroSlide {
    id: string;
    type: 'image' | 'video';
    url: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

export default function HeroAdmin() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    useEffect(() => {
        loadSlides();
    }, []);

    const loadSlides = async () => {
        const res = await fetch('/api/hero-slides');
        const data = await res.json();
        setSlides(data.slides || []);
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/hero-slides', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slides })
        });
        setSaving(false);
        alert('Hero slides saved successfully!');
    };

    const addSlide = () => {
        const newSlide: HeroSlide = {
            id: `slide-${Date.now()}`,
            type: 'image',
            url: '',
            title: 'New Slide Title',
            subtitle: 'subtitle text here',
            ctaText: 'SHOP NOW',
            ctaLink: '/shop'
        };
        setSlides([...slides, newSlide]);
    };

    const removeSlide = (id: string) => {
        setSlides(slides.filter(s => s.id !== id));
    };

    const moveSlide = (index: number, direction: 'up' | 'down') => {
        const newSlides = [...slides];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= slides.length) return;
        [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
        setSlides(newSlides);
    };

    const updateSlide = (id: string, field: keyof HeroSlide, value: any) => {
        setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleFileUpload = async (id: string, file: File) => {
        try {
            setUploadingId(id);
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }

            const data = await res.json();
            updateSlide(id, 'url', data.path);
            updateSlide(id, 'type', file.type.startsWith('video') ? 'video' : 'image');
        } catch (error) {
            alert('Upload failed. Please try again.');
            console.error('Upload error:', error);
        } finally {
            setUploadingId(null);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-stone-50">
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold">Manage Hero Slides</h1>
                    <div className="flex gap-4">
                        <Button onClick={handleSave} disabled={saving} className="bg-green-600 text-white hover:bg-green-700">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button onClick={addSlide} className="bg-[#E86A33] text-white">
                            <Plus size={20} className="mr-2" /> Add Slide
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Slide {index + 1}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => moveSlide(index, 'up')}
                                        disabled={index === 0}
                                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"
                                    >
                                        <ArrowUp size={18} />
                                    </button>
                                    <button
                                        onClick={() => moveSlide(index, 'down')}
                                        disabled={index === slides.length - 1}
                                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"
                                    >
                                        <ArrowDown size={18} />
                                    </button>
                                    <button
                                        onClick={() => removeSlide(slide.id)}
                                        className="p-2 hover:bg-red-50 text-red-600 rounded"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Media Upload */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Image/Video</label>
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleFileUpload(slide.id, file);
                                        }}
                                        disabled={uploadingId === slide.id}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    {uploadingId === slide.id && (
                                        <div className="mt-2 text-sm text-blue-600 font-medium">
                                            ⏳ Uploading... Please wait...
                                        </div>
                                    )}
                                    {slide.url && uploadingId !== slide.id && (
                                        <div className="mt-3 relative w-full h-48 bg-gray-100 rounded overflow-hidden">
                                            {slide.type === 'image' ? (
                                                <img src={slide.url} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <video src={slide.url} className="w-full h-full object-cover" controls />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Text Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={slide.title}
                                            onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                                            className="w-full border border-gray-300 p-3 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                                        <input
                                            type="text"
                                            value={slide.subtitle}
                                            onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                                            className="w-full border border-gray-300 p-3 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
                                        <input
                                            type="text"
                                            value={slide.ctaText}
                                            onChange={(e) => updateSlide(slide.id, 'ctaText', e.target.value)}
                                            className="w-full border border-gray-300 p-3 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Button Link</label>
                                        <input
                                            type="text"
                                            value={slide.ctaLink}
                                            onChange={(e) => updateSlide(slide.id, 'ctaLink', e.target.value)}
                                            className="w-full border border-gray-300 p-3 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {slides.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">No slides yet. Click "Add Slide" to get started.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
