'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Menu, X, Search, Heart, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';
import { cn } from '@/components/ui/Button';

interface HeaderProps {
    logoAlign?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    textColor?: string;
}

export const Header = ({
    logoAlign = 'left',
    backgroundColor = '#FEF8E6',
    textColor = '#3C1E10'
}: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

    const navLinks = [
        { name: 'LAHENGA', href: '/shop?category=lahenga' },
        { name: 'WEDDING WEAR', href: '/shop?category=wedding-wear' },
        { name: 'FESTIVAL WEAR', href: '/shop?category=festival-wear' },
        { name: 'CHANIYA CHOLI', href: '/shop?category=chaniya-choli' },
    ];

    const Logo = () => (
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-b-full flex items-center justify-center text-white font-serif font-bold">S</div>
            <span className="text-2xl font-serif font-bold tracking-wide" style={{ color: textColor }}>SHEWEDS</span>
        </Link>
    );

    const NavLinks = () => (
        <div className="hidden xl:flex items-center gap-6 text-xs font-bold tracking-wider" style={{ color: textColor }}>
            {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:opacity-70 transition-opacity whitespace-nowrap">
                    {link.name}
                </Link>
            ))}
        </div>
    );

    const Actions = () => (
        <div className="hidden md:flex items-center gap-6" style={{ color: textColor }}>
            <div className="relative hidden lg:block">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-white/50 border border-current/20 rounded-sm py-2 pl-4 pr-10 text-sm w-[200px] focus:outline-none"
                    style={{ color: textColor }}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" size={16} />
            </div>
            <button className="hover:opacity-70"><User size={20} /></button>
            <button className="hover:opacity-70"><Heart size={20} /></button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                <MessageCircle size={20} />
            </a>
        </div>
    );

    return (
        <nav className="sticky top-0 z-50 shadow-sm border-b border-black/5" style={{ backgroundColor }}>
            <Container>
                <div className="flex items-center justify-between py-4 relative min-h-[80px]">

                    {/* Mobile Toggle (Always Left) */}
                    <button
                        className="xl:hidden"
                        style={{ color: textColor }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Layouts */}
                    <div className="hidden xl:flex w-full items-center justify-between">
                        {logoAlign === 'left' && (
                            <>
                                <div className="flex items-center gap-12">
                                    <Logo />
                                    <NavLinks />
                                </div>
                                <Actions />
                            </>
                        )}

                        {logoAlign === 'center' && (
                            <>
                                <NavLinks />
                                <div className="absolute left-1/2 -translate-x-1/2">
                                    <Logo />
                                </div>
                                <Actions />
                            </>
                        )}

                        {logoAlign === 'right' && (
                            <>
                                <div className="flex items-center gap-12">
                                    <NavLinks />
                                    <Actions />
                                </div>
                                <Logo />
                            </>
                        )}
                    </div>

                    {/* Mobile Logo (Center if menu open, otherwise Left) */}
                    <div className="xl:hidden absolute left-1/2 -translate-x-1/2">
                        <Logo />
                    </div>

                    {/* Mobile Actions (Right) */}
                    <div className="xl:hidden flex items-center gap-4" style={{ color: textColor }}>
                        <Search size={20} />
                        <a href={whatsappLink}><MessageCircle size={20} /></a>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden border-t border-black/5 overflow-hidden"
                        style={{ backgroundColor }}
                    >
                        <div className="flex flex-col p-6 space-y-4 font-medium" style={{ color: textColor }}>
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
