'use client';

import { useState, useEffect } from 'react';
import { fetchHomePageData, updateHomePageData } from '@/app/actions/home-actions';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminHomePage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const d = await fetchHomePageData();
            setData(d);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        // Serialize all data
        formData.set('heroSlides', JSON.stringify(data.heroSlides));
        formData.set('featuredCategories', JSON.stringify(data.featuredCategories));
        formData.set('bridalJourney', JSON.stringify(data.bridalJourney));

        await updateHomePageData(formData);
        alert('Home page updated successfully!');
        router.refresh();
    };

    const addHeroSlide = () => {
        setData({
            ...data,
            heroSlides: [
                ...(data.heroSlides || []),
                {
                    id: Date.now().toString(),
                    type: 'image',
                    url: '',
                    title: 'New Slide',
                    subtitle: 'Subtitle',
                    ctaText: 'SHOP NOW',
                    ctaLink: '/shop'
                }
            ]
        });
    };

    const removeHeroSlide = (index: number) => {
        const newSlides = [...data.heroSlides];
        newSlides.splice(index, 1);
        setData({ ...data, heroSlides: newSlides });
    };

    const updateHeroSlide = (index: number, field: string, value: string) => {
        const newSlides = [...data.heroSlides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setData({ ...data, heroSlides: newSlides });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container>
            <div className="py-8">
                <h1 className="text-3xl font-serif text-[#3C1E10] mb-8">Edit Home Page</h1>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                    {/* Hero Slides Section */}
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Hero Carousel Slides</h2>
                            <button
                                type="button"
                                onClick={addHeroSlide}
                                className="flex items-center gap-2 text-sm font-bold text-[#E86A33] hover:underline"
                            >
                                <Plus size={16} /> ADD SLIDE
                            </button>
                        </div>

                        <div className="space-y-6">
                            {data.heroSlides?.map((slide: any, index: number) => (
                                <div key={slide.id} className="border border-gray-200 p-4 rounded relative bg-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => removeHeroSlide(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold mb-1">Type</label>
                                            <select
                                                value={slide.type}
                                                onChange={(e) => updateHeroSlide(index, 'type', e.target.value)}
                                                className="w-full border p-2 rounded text-sm"
                                            >
                                                <option value="image">Image</option>
                                                <option value="video">Video</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold mb-1">Media URL</label>
                                            <input
                                                value={slide.url}
                                                onChange={(e) => updateHeroSlide(index, 'url', e.target.value)}
                                                className="w-full border p-2 rounded text-sm"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold mb-1">Title</label>
                                            <input
                                                value={slide.title}
                                                onChange={(e) => updateHeroSlide(index, 'title', e.target.value)}
                                                className="w-full border p-2 rounded text-sm"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold mb-1">Subtitle</label>
                                            <input
                                                value={slide.subtitle}
                                                onChange={(e) => updateHeroSlide(index, 'subtitle', e.target.value)}
                                                className="w-full border p-2 rounded text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold mb-1">CTA Text</label>
                                            <input
                                                value={slide.ctaText}
                                                onChange={(e) => updateHeroSlide(index, 'ctaText', e.target.value)}
                                                className="w-full border p-2 rounded text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold mb-1">CTA Link</label>
                                            <input
                                                value={slide.ctaLink}
                                                onChange={(e) => updateHeroSlide(index, 'ctaLink', e.target.value)}
                                                className="w-full border p-2 rounded text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bridal Journey Section - JSON Editor */}
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Bridal Journey Items</h2>
                        <p className="text-sm text-gray-500 mb-2">Edit the JSON below to update items.</p>
                        <textarea
                            value={JSON.stringify(data.bridalJourney, null, 2)}
                            onChange={(e) => {
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    setData({ ...data, bridalJourney: parsed });
                                } catch (err) {
                                    // Ignore parse errors while typing
                                }
                            }}
                            className="w-full border p-2 rounded h-64 font-mono text-sm"
                        />
                    </div>

                    <Button type="submit" className="bg-[#E86A33] text-white w-full py-4">
                        Save Changes
                    </Button>
                </form>
            </div>
        </Container>
    );
}
