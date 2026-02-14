'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'WONDERS', href: '/' },
    { label: 'THE SECRET WAR', href: '/secret-war' },
    { label: 'JOURNAL', href: 'https://whereimaginationtakesflight.substack.com/', external: true },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={`text-3xl font-bold tracking-tighter text-[#ededed] hover:text-white transition-colors ${pathname === item.href ? 'opacity-100' : 'opacity-60'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-end py-6 px-8 pointer-events-auto text-[#ededed] bg-black/40 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all duration-500 hover:opacity-100 opacity-0">
                {/* Left Title */}
                <h1 className="text-2xl md:text-3xl font-bold tracking-tighter pointer-events-auto z-50">
                    TODD BURLESON
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 pointer-events-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={`text-sm md:text-base font-medium tracking-wide transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden pointer-events-auto z-50 flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="w-full h-0.5 bg-white origin-center transition-transform"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-full h-0.5 bg-white transition-opacity"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        className="w-full h-0.5 bg-white origin-center transition-transform"
                    />
                </button>
            </div>
        </>
    );
}
