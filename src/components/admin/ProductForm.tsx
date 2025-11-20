'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/db';
import { X, Upload, Image as ImageIcon, Film } from 'lucide-react';

interface ProductFormProps {
    initialData?: Product;
    action: (formData: FormData) => Promise<void>;
}

export const ProductForm = ({ initialData, action }: ProductFormProps) => {
    const [loading, setLoading] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
    const [existingVideos, setExistingVideos] = useState<string[]>(initialData?.videos || []);

    // State for new files
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newVideos, setNewVideos] = useState<File[]>([]);

    // Refs for file inputs to clear them after selection
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // Append existing images/videos metadata
        formData.append('existingImages', JSON.stringify(existingImages));
        formData.append('existingVideos', JSON.stringify(existingVideos));

        // Append new files manually
        newImages.forEach(file => formData.append('images', file));
        newVideos.forEach(file => formData.append('videos', file));

        await action(formData);
        setLoading(false);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewImages(prev => [...prev, ...Array.from(e.target.files!)]);
            // Reset input so same file can be selected again if needed
            if (imageInputRef.current) imageInputRef.current.value = '';
        }
    };

    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewVideos(prev => [...prev, ...Array.from(e.target.files!)]);
            if (videoInputRef.current) videoInputRef.current.value = '';
        }
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingVideo = (index: number) => {
        setExistingVideos(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewVideo = (index: number) => {
        setNewVideos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Basic Info */}
                <div className="col-span-2 space-y-6">
                    <h3 className="text-lg font-serif font-bold text-stone-800 border-b pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Product Name</label>
                            <input name="name" defaultValue={initialData?.name} required className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Price (₹)</label>
                            <input name="price" type="number" defaultValue={initialData?.price} required className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Category</label>
                            <select name="category" defaultValue={initialData?.category} className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33] bg-white">
                                <option value="lehenga">Lehenga</option>
                                <option value="saree">Saree</option>
                                <option value="gown">Gown</option>
                                <option value="suit">Suit</option>
                                <option value="wedding-wear">Wedding Wear</option>
                                <option value="festival-wear">Festival Wear</option>
                                <option value="chaniya-choli">Chaniya Choli</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Media Upload */}
                <div className="col-span-2 space-y-6">
                    <h3 className="text-lg font-serif font-bold text-stone-800 border-b pb-2">Media Gallery</h3>

                    {/* Images */}
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Product Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {/* Existing Images */}
                            {existingImages.map((img, i) => (
                                <div key={`existing-${i}`} className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-stone-200">
                                    <img src={img} alt={`Existing ${i}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(i)}
                                        className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                                    >
                                        <X size={14} />
                                    </button>
                                    <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">Saved</span>
                                </div>
                            ))}

                            {/* New Images */}
                            {newImages.map((file, i) => (
                                <div key={`new-${i}`} className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-stone-200 ring-2 ring-blue-500/20">
                                    <img src={URL.createObjectURL(file)} alt={`New ${i}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(i)}
                                        className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                                    >
                                        <X size={14} />
                                    </button>
                                    <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-1 rounded shadow-sm">New</span>
                                </div>
                            ))}

                            {/* Upload Button */}
                            <label className="aspect-[3/4] border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#E86A33] hover:bg-[#E86A33]/5 transition-colors group">
                                <div className="p-3 bg-stone-100 rounded-full text-stone-400 group-hover:text-[#E86A33] group-hover:bg-[#E86A33]/10 transition-colors mb-2">
                                    <Upload size={24} />
                                </div>
                                <span className="text-xs font-medium text-stone-500 group-hover:text-[#E86A33]">Add Images</span>
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Videos */}
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Product Videos</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Existing Videos */}
                            {existingVideos.map((video, i) => (
                                <div key={`existing-vid-${i}`} className="relative group aspect-video rounded-lg overflow-hidden border border-stone-200 bg-black">
                                    <video src={video} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Film className="text-white/50" size={24} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeExistingVideo(i)}
                                        className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                                    >
                                        <X size={14} />
                                    </button>
                                    <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">Saved</span>
                                </div>
                            ))}

                            {/* New Videos */}
                            {newVideos.map((file, i) => (
                                <div key={`new-vid-${i}`} className="relative group aspect-video rounded-lg overflow-hidden border border-stone-200 bg-black ring-2 ring-blue-500/20">
                                    <video src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Film className="text-white/50" size={24} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeNewVideo(i)}
                                        className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                                    >
                                        <X size={14} />
                                    </button>
                                    <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-1 rounded shadow-sm">New</span>
                                </div>
                            ))}

                            {/* Upload Button */}
                            <label className="aspect-video border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#E86A33] hover:bg-[#E86A33]/5 transition-colors group">
                                <div className="p-3 bg-stone-100 rounded-full text-stone-400 group-hover:text-[#E86A33] group-hover:bg-[#E86A33]/10 transition-colors mb-2">
                                    <Film size={24} />
                                </div>
                                <span className="text-xs font-medium text-stone-500 group-hover:text-[#E86A33]">Add Videos</span>
                                <input
                                    ref={videoInputRef}
                                    type="file"
                                    multiple
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleVideoSelect}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="col-span-2 space-y-6">
                    <h3 className="text-lg font-serif font-bold text-stone-800 border-b pb-2">Product Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Material</label>
                            <input name="material" defaultValue={initialData?.material} placeholder="e.g. Silk, Chinon" className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Work</label>
                            <input name="work" defaultValue={initialData?.work} placeholder="e.g. Zari, Stone Work" className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Wash Care</label>
                            <input name="washCare" defaultValue={initialData?.washCare} placeholder="e.g. Dry Clean Only" className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">SKU</label>
                            <input name="sku" defaultValue={initialData?.sku} placeholder="Optional" className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]" />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Sizes</label>
                            <SizeSelector initialSizes={initialData?.sizes || []} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-stone-200">
                <Button type="submit" disabled={loading} className="w-full bg-[#E86A33] hover:bg-[#D05A28] text-white py-4 font-bold tracking-wider text-sm uppercase rounded-lg shadow-md transition-all transform hover:scale-[1.01]">
                    {loading ? 'SAVING PRODUCT...' : 'SAVE PRODUCT'}
                </Button>
            </div>
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
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${selected.includes(size)
                            ? 'bg-[#3C1E10] text-white border-[#3C1E10] shadow-sm'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-[#3C1E10] hover:bg-stone-50'
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <p className="text-xs text-stone-500">Selected: {selected.join(', ') || 'None'}</p>
        </div>
    );
}
