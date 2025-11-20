'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/db';
import { X } from 'lucide-react';

interface ProductFormProps {
    initialData?: Product;
    action: (formData: FormData) => Promise<void>;
}

export const ProductForm = ({ initialData, action }: ProductFormProps) => {
    const [loading, setLoading] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
    const [existingVideos, setExistingVideos] = useState<string[]>(initialData?.videos || []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // Add existing images/videos that weren't removed
        formData.append('existingImages', JSON.stringify(existingImages));
        formData.append('existingVideos', JSON.stringify(existingVideos));

        await action(formData);
        setLoading(false);
    };

    const removeImage = (index: number) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const removeVideo = (index: number) => {
        setExistingVideos(existingVideos.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input name="name" defaultValue={initialData?.name} required className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                    <input name="price" type="number" defaultValue={initialData?.price} required className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select name="category" defaultValue={initialData?.category} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]">
                        <option value="lehenga">Lehenga</option>
                        <option value="saree">Saree</option>
                        <option value="gown">Gown</option>
                        <option value="suit">Suit</option>
                        <option value="wedding-wear">Wedding Wear</option>
                        <option value="festival-wear">Festival Wear</option>
                        <option value="chaniya-choli">Chaniya Choli</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Images (Select multiple)</label>
                    <input type="file" name="images" multiple accept="image/*" className="w-full border border-gray-300 p-3 rounded" />
                    {existingImages.length > 0 && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                            <div className="flex gap-2 flex-wrap">
                                {existingImages.map((img, i) => (
                                    <div key={i} className="relative group">
                                        <img src={img} alt={`preview-${i}`} className="w-20 h-20 object-cover rounded border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Videos (Select multiple)</label>
                    <input type="file" name="videos" multiple accept="video/*" className="w-full border border-gray-300 p-3 rounded" />
                    {existingVideos.length > 0 && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">Existing Videos:</p>
                            <div className="flex gap-2 flex-wrap">
                                {existingVideos.map((video, i) => (
                                    <div key={i} className="relative group">
                                        <video src={video} className="w-20 h-20 object-cover rounded border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => removeVideo(i)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                {/* New Details Fields */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Material</label>
                    <input name="material" defaultValue={initialData?.material} placeholder="e.g. Silk, Chinon" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Work</label>
                    <input name="work" defaultValue={initialData?.work} placeholder="e.g. Zari, Stone Work" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wash Care</label>
                    <input name="washCare" defaultValue={initialData?.washCare} placeholder="e.g. Dry Clean Only" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">SKU</label>
                    <input name="sku" defaultValue={initialData?.sku} placeholder="Optional" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#E86A33]" />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sizes</label>
                    <SizeSelector initialSizes={initialData?.sizes || []} />
                </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#E86A33] text-white py-4 font-bold tracking-wider">
                {loading ? 'SAVING...' : 'SAVE PRODUCT'}
            </Button>
        </form>
    );
};

function SizeSelector({ initialSizes }: { initialSizes: string[] }) {
    const [selected, setSelected] = useState<string[]>(initialSizes);
    const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

    const toggleSize = (size: string) => {
        if (selected.includes(size)) {
            setSelected(selected.filter(s => s !== size));
        } else {
            setSelected([...selected, size]);
        }
    };

    return (
        <div>
            <input type="hidden" name="sizes" value={selected.join(',')} />
            <div className="flex flex-wrap gap-2 mb-2">
                {commonSizes.map(size => (
                    <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${selected.includes(size)
                            ? 'bg-[#3C1E10] text-white border-[#3C1E10]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#3C1E10]'
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <p className="text-xs text-gray-500">Selected: {selected.join(', ') || 'None'}</p>
        </div>
    );
}
