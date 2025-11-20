import { Container } from '@/components/ui/Container';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20 bg-white min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
                        Our Story
                    </h1>
                    <p className="text-xl text-stone-600 italic">
                        "Where Tradition Meets Contemporary Elegance"
                    </p>
                </div>

                <div className="relative w-full h-[400px] md:h-[600px] mb-16 rounded-xl overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop"
                        alt="SHEWEDS Atelier"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="max-w-3xl mx-auto prose prose-stone prose-lg">
                    <p>
                        SHEWEDS began with a simple vision: to make every woman feel like a queen on her special day.
                        What started as a small boutique has now grown into a beloved brand for brides across the country.
                    </p>
                    <p>
                        We specialize in:
                    </p>
                    <ul>
                        <li><strong>Bridal Lehengas:</strong> Intricately designed masterpieces.</li>
                        <li><strong>Festive Wear:</strong> Elegant outfits for every celebration.</li>
                        <li><strong>Custom Tailoring:</strong> Fits that flatter every silhouette.</li>
                    </ul>
                    <p>
                        Our commitment to quality is unwavering. We source the finest fabrics—pure silks, velvets, and organzas—and
                        work with skilled artisans who pour their heart and soul into every embroidery.
                    </p>
                    <p>
                        Thank you for choosing SHEWEDS to be a part of your journey.
                    </p>
                </div>
            </Container>
        </div>
    );
}
