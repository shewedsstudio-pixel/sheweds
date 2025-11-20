'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ChevronDown, ChevronUp, Heart, Share2, Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/db';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPage() {
    const params = useParams();
    return <ProductPageClient id={params.id as string} />;
}

// --- Client Component ---

function ProductPageClient({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', url: string } | null>(null);

    // Selection State
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    // Pincode State
    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState<{ valid: boolean; message: string } | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            const { fetchProductById, fetchRelatedProducts } = await import('@/app/actions/product-actions');
            const p = await fetchProductById(id);
            if (p) {
                setProduct(p);
                setSelectedMedia({ type: 'image', url: p.images[0] || p.image });

                // Set default selection if available
                if (p.sizes && p.sizes.length > 0) setSelectedSize(p.sizes[0]);
                if (p.colors && p.colors.length > 0) setSelectedColor(p.colors[0]);

                // Fetch related
                const related = await fetchRelatedProducts(p.category, p.id);
                setRelatedProducts(related);
            }
            setLoading(false);
        };
        loadProduct();
    }, [id]);

    const checkPincode = () => {
        if (!pincode || pincode.length !== 6) {
            setDeliveryStatus({ valid: false, message: 'Please enter a valid 6-digit pincode.' });
            return;
        }
        // Mock Logic: Allow all for now, or restrict specific ones
        setDeliveryStatus({ valid: true, message: `Delivery to ${pincode} available within 3-5 days.` });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    const whatsappMessage = `Hi, I'm interested in ${product.name} (Size: ${selectedSize}, Color: ${selectedColor || 'Default'}). Is it available?`;
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    const addToCartMessage = `Hi, I want to add ${product.name} (Size: ${selectedSize}) to my cart.`;
    const addToCartLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(addToCartMessage)}`;

    return (
        <div className="bg-[#FEF8E6] min-h-screen pb-24 md:pb-0">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8 pt-8">

                    {/* Left: Gallery */}
                    <div className="w-full lg:w-[60%]">
                        {/* Mobile: Swipeable Carousel */}
                        <div className="md:hidden relative">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                                <AnimatePresence mode="wait">
                                    {selectedMedia && (
                                        <motion.div
                                            key={selectedMedia.url}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0"
                                        >
                                            {selectedMedia.type === 'image' ? (
                                                <Image src={selectedMedia.url} alt={product.name} fill className="object-cover" />
                                            ) : (
                                                <video src={selectedMedia.url} controls className="w-full h-full object-cover" />
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedMedia({ type: 'image', url: img })}
                                        className={`flex-shrink-0 w-16 h-20 rounded border-2 overflow-hidden ${selectedMedia?.url === img ? 'border-[#E86A33]' : 'border-gray-200'}`}
                                    >
                                        <Image src={img} alt={`Thumb ${idx}`} width={64} height={80} className="object-cover w-full h-full" />
                                    </button>
                                ))}
                                {product.videos.map((vid, idx) => (
                                    <button
                                        key={`vid-${idx}`}
                                        onClick={() => setSelectedMedia({ type: 'video', url: vid })}
                                        className={`flex-shrink-0 w-16 h-20 rounded border-2 overflow-hidden ${selectedMedia?.url === vid ? 'border-[#E86A33]' : 'border-gray-200'} relative`}
                                    >
                                        <video src={vid} className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                                                <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-0.5"></div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop: Grid */}
                        <div className="hidden md:grid grid-cols-2 gap-4">
                            {product.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-[3/4] w-full">
                                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover rounded-sm" />
                                </div>
                            ))}
                            {product.videos.map((vid, idx) => (
                                <div key={`vid-${idx}`} className="relative aspect-[3/4] w-full">
                                    <video src={vid} controls className="w-full h-full object-cover rounded-sm" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="w-full lg:w-[40%] lg:sticky lg:top-24 h-fit">
                        <div className="bg-white p-6 rounded-sm shadow-sm border border-[#F4EBD9]">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-2xl font-serif text-[#3C1E10] mb-2">{product.name}</h1>
                                    <p className="text-sm text-gray-500">SKU ID: {product.sku || `SHE-${product.id}`}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-full"><Share2 size={20} className="text-[#3C1E10]" /></button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full"><Heart size={20} className="text-[#3C1E10]" /></button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <span className="text-2xl font-bold text-[#3C1E10]">₹ {product.price.toLocaleString('en-IN')}</span>
                                <span className="text-sm text-gray-500 ml-2">MRP (Inclusive of all taxes)</span>
                            </div>

                            {/* Select Colour */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-[#3C1E10]">SELECT COLOUR</h3>
                                    <div className="flex gap-3">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full border border-gray-300 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#3C1E10]' : ''}`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Select Size */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#3C1E10]">SELECT SIZE</h3>
                                    <button className="text-xs text-[#E86A33] underline">Size Chart</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.length > 0 ? product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`border px-6 py-2 text-sm transition-colors ${selectedSize === size ? 'border-[#3C1E10] bg-[#FEF8E6] font-bold' : 'border-gray-300 hover:border-[#3C1E10]'}`}
                                        >
                                            {size}
                                        </button>
                                    )) : (
                                        <button className="border border-[#3C1E10] px-6 py-2 text-sm bg-[#FEF8E6]">Free Size</button>
                                    )}
                                </div>
                            </div>

                            {/* Pincode Check */}
                            <div className="mb-8">
                                <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                                    <input
                                        type="text"
                                        placeholder="Enter pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="flex-1 px-4 py-3 text-sm focus:outline-none"
                                        maxLength={6}
                                    />
                                    <button onClick={checkPincode} className="px-6 py-3 text-sm font-bold text-[#3C1E10] hover:bg-gray-50">CHECK</button>
                                </div>
                                {deliveryStatus && (
                                    <p className={`text-xs mt-2 flex items-center gap-1 ${deliveryStatus.valid ? 'text-green-600' : 'text-red-500'}`}>
                                        {deliveryStatus.valid ? <Truck size={14} /> : <ShieldCheck size={14} />} {deliveryStatus.message}
                                    </p>
                                )}
                                {!deliveryStatus && <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Truck size={14} /> Free delivery within 2-3 days</p>}
                            </div>

                            {/* Offers Banner */}
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-sm mb-8 flex items-center gap-3">
                                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">SBI card</div>
                                <div className="text-xs text-blue-800">
                                    <span className="font-bold">5% EXTRA CASHBACK</span> WITH SBI CREDIT CARD
                                </div>
                            </div>

                            {/* Accordions */}
                            <div className="border-t border-gray-200">
                                <AccordionItem title="PRODUCT DETAILS" isOpen={true}>
                                    <div className="grid grid-cols-2 gap-y-4 text-sm text-[#3C1E10]">
                                        <div>
                                            <span className="font-bold block">Colour</span>
                                            <span>{selectedColor || 'As shown'}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold block">Material</span>
                                            <span>{product.material || 'Chinon'}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold block">Work</span>
                                            <span>{product.work || 'Stone Work, Zari'}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold block">Items Included</span>
                                            <span>Saree, Unstitched Blouse</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="font-bold block mb-1">Description</span>
                                            <p className="leading-relaxed text-gray-600">{product.description}</p>
                                        </div>
                                    </div>
                                </AccordionItem>
                                <AccordionItem title="PRODUCT DECLARATION">
                                    <p className="text-sm text-gray-600">Product color may slightly vary due to photographic lighting sources or your monitor settings.</p>
                                </AccordionItem>
                                <AccordionItem title="SHIPPING & RETURNS">
                                    <div className="text-sm text-gray-600 space-y-2">
                                        <p className="flex items-center gap-2"><Truck size={16} /> Free shipping on all orders.</p>
                                        <p className="flex items-center gap-2"><RotateCcw size={16} /> Easy 10 days returns & exchange.</p>
                                    </div>
                                </AccordionItem>
                            </div>
                        </div>
                    </div>
                </div>

                {/* You May Also Like */}
                {relatedProducts.length > 0 && (
                    <div className="py-16">
                        <h2 className="text-2xl font-serif text-[#3C1E10] mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((related) => (
                                <a href={`/product/${related.id}`} key={related.id} className="group cursor-pointer block">
                                    <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-sm">
                                        <Image
                                            src={related.images[0] || related.image}
                                            alt={related.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="text-sm font-medium text-[#3C1E10] truncate">{related.name}</h3>
                                    <p className="text-sm font-bold text-[#3C1E10]">₹ {related.price.toLocaleString('en-IN')}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </Container>

            {/* Sticky Footer for Mobile & Desktop Actions */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <Container>
                    <div className="flex gap-4 max-w-4xl mx-auto">
                        <a href={addToCartLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <button className="w-full py-4 text-sm font-bold tracking-widest uppercase border border-[#E86A33] text-[#E86A33] hover:bg-orange-50 transition-colors">
                                ADD TO CART
                            </button>
                        </a>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <button className="w-full py-4 text-sm font-bold tracking-widest uppercase bg-[#E86A33] text-white hover:bg-[#D05A28] transition-colors">
                                BUY NOW
                            </button>
                        </a>
                    </div>
                </Container>
            </div>
        </div>
    );
}

function AccordionItem({ title, children, isOpen: initialOpen = false }: { title: string, children: React.ReactNode, isOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left"
            >
                <span className="font-bold text-sm text-[#3C1E10] uppercase tracking-wide">{title}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
