import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#3C1E10] text-[#D6C0B3] py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Column 1: Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Categories</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/shop?category=kurta" className="hover:text-white transition-colors">Kurta Pajama</Link></li>
                            <li><Link href="/shop?category=sherwani" className="hover:text-white transition-colors">Sherwani</Link></li>
                            <li><Link href="/shop?category=lehenga" className="hover:text-white transition-colors">Lehenga</Link></li>
                            <li><Link href="/shop?category=saree" className="hover:text-white transition-colors">Saree</Link></li>
                            <li><Link href="/shop?category=indo-western" className="hover:text-white transition-colors">Indo Western</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Details</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Brand Story</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blogs</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Social */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Contact</h4>
                        <div className="text-sm space-y-4 mb-8">
                            <p>care@sheweds.com</p>
                            <p>+91 98765 43210 (India)</p>
                            <p>10 am - 7 pm, Monday - Saturday</p>
                        </div>

                        <h4 className="text-white font-bold mb-4 tracking-widest text-sm uppercase">Keep in Touch</h4>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#5D2E1A] mt-16 pt-8 text-center text-xs tracking-wider">
                    <p>&copy; {new Date().getFullYear()} SHEWEDS. All Rights Reserved. v1.3 SAFE MODE</p>
                </div>
            </Container>
        </footer>
    );
};
