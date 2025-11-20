'use client';

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Menu, X, Search, Heart, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

    const navLinks = [
        { name: 'LAHENGA', href: '/shop?category=lahenga' },
        { name: 'WEDDING WEAR', href: '/shop?category=wedding-wear' },
        { name: 'FESTIVAL WEAR', href: '/shop?category=festival-wear' },
        { name: 'CHANIYA CHOLI', href: '/shop?category=chaniya-choli' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-[#FEF8E6] shadow-sm border-b border-[#D6C0B3]">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 md:gap-0">

                    {/* Top Left: Logo & Categories */}
                    <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Placeholder for Shield Icon */}
                            <div className="w-8 h-8 bg-orange-500 rounded-b-full flex items-center justify-center text-white font-serif font-bold">S</div>
                            <span className="text-2xl font-serif font-bold text-[#3C1E10] tracking-wide">SHEWEDS</span>
                        </Link>

                        <div className="hidden xl:flex items-center gap-6 text-xs font-bold tracking-wider text-[#3C1E10]">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} className="hover:text-[#E86A33] transition-colors whitespace-nowrap">
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="xl:hidden text-[#3C1E10]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Right Side: Search & Actions */}
                    <div className="hidden md:flex items-center gap-6 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative hidden lg:block">
                            <input
                                type="text"
                                placeholder="Search for Sheweds"
                                className="bg-white border border-[#D6C0B3] rounded-sm py-2 pl-4 pr-10 text-sm w-[200px] xl:w-[250px] focus:outline-none focus:border-[#E86A33]"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-6 text-sm font-medium text-[#3C1E10]">
                            <button className="flex items-center gap-2 hover:text-[#E86A33]">
                                <User size={20} />
                                <span className="hidden xl:inline">MY ACCOUNT</span>
                            </button>
                            <button className="hover:text-[#E86A33]">
                                <Heart size={20} />
                            </button>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#E86A33]">
                                <MessageCircle size={20} />
                                <span className="hidden xl:inline">WHATSAPP</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-[#FEF8E6] border-t border-[#D6C0B3] overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4 text-[#3C1E10] font-medium">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-[#D6C0B3]" />
                            <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>MY ACCOUNT</Link>
                            <a href={whatsappLink} className="flex items-center gap-2 text-[#E86A33]">
                                <MessageCircle size={18} /> WhatsApp Us
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
