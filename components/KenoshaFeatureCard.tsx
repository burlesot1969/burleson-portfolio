'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function KenoshaFeatureCard() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-20 md:bottom-24 right-4 sm:right-8 z-30 max-w-[340px] sm:max-w-[400px] w-full pointer-events-auto"
            >
                <div className="relative group p-4 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/15 hover:border-[#d4a359]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden">
                    {/* Top Warm Mid-Century Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a359] to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

                    {/* Subtle Corner Glow */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#b34728]/20 blur-xl pointer-events-none group-hover:bg-[#d4a359]/30 transition-colors" />

                    {/* Close / Dismiss Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-3 right-3 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                        aria-label="Dismiss spotlight card"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>

                    <Link href="/greetings-from-kenosha" className="flex items-center gap-4">
                        {/* Poster Thumbnail with subtle vintage border & hover tilt */}
                        <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-white/20 shadow-md bg-neutral-900 group-hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/images/kenosha/poster-00-mural.jpg"
                                alt="Greetings from Kenosha Poster"
                                fill
                                sizes="96px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-w-0 pr-4">
                            {/* Eyebrow badge */}
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4a359] mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] animate-pulse" />
                                <span>Featured Exhibit</span>
                            </div>

                            {/* Headline */}
                            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#d4a359] transition-colors truncate">
                                Greetings from Kenosha
                            </h3>

                            {/* Description snippet */}
                            <p className="text-xs text-neutral-400 line-clamp-2 mt-0.5 leading-relaxed">
                                A love letter to downtown Kenosha, blending vintage postcard art, deep human stories, and interactive cartography.
                            </p>

                            {/* CTA Link */}
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#d4a359] mt-2.5 transition-colors">
                                <span className="tracking-wide uppercase text-[11px]">Explore Project</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
