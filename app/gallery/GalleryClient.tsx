'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import styles from './gallery.module.css';

// Using high-quality placeholder abstracts from Unsplash
const photos = [
    { id: 1, src: "/images/gallery/abstract-01.jpg", width: 800, height: 1200, alt: "Abstract 01" },
    { id: 2, src: "/images/gallery/abstract-02.JPG", width: 800, height: 800, alt: "Abstract 02" },
    { id: 3, src: "/images/gallery/abstract-03.JPG", width: 800, height: 1000, alt: "Abstract 03" },
    { id: 4, src: "/images/gallery/abstract-04.jpeg", width: 800, height: 900, alt: "Abstract 04" },
    { id: 5, src: "/images/gallery/abstract-05.jpg", width: 800, height: 1200, alt: "Abstract 05" },
    { id: 6, src: "/images/gallery/abstract-06.JPG", width: 800, height: 800, alt: "Abstract 06" },
    { id: 7, src: "/images/gallery/abstract-07.JPG", width: 800, height: 1100, alt: "Abstract 07" },
    { id: 8, src: "/images/gallery/abstract-08.JPG", width: 800, height: 1000, alt: "Abstract 08" },
    { id: 9, src: "/images/gallery/abstract-09.JPG", width: 800, height: 900, alt: "Abstract 09" },
    { id: 10, src: "/images/gallery/abstract-10.JPG", width: 800, height: 1200, alt: "Abstract 10" },
    { id: 11, src: "/images/gallery/abstract-11.JPG", width: 800, height: 800, alt: "Abstract 11" },
    { id: 12, src: "/images/gallery/abstract-12.JPG", width: 800, height: 1000, alt: "Abstract 12" },
    { id: 13, src: "/images/gallery/abstract-13.JPG", width: 800, height: 1200, alt: "Abstract 13" },
    { id: 14, src: "/images/gallery/abstract-14.JPG", width: 800, height: 800, alt: "Abstract 14" },
    { id: 15, src: "/images/gallery/abstract-15.JPG", width: 800, height: 1000, alt: "Abstract 15" },
    { id: 16, src: "/images/gallery/abstract-16.JPG", width: 800, height: 900, alt: "Abstract 16" },
    { id: 17, src: "/images/gallery/abstract-17.JPG", width: 800, height: 1200, alt: "Abstract 17" },
    { id: 18, src: "/images/gallery/abstract-18.JPG", width: 800, height: 800, alt: "Abstract 18" },
];

export default function GalleryClient() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNext = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % photos.length);
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
        }
    };

    // Escape Key, Arrow Keys & Body Scroll Lock for Modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex]);

    // Parallax Scroll logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'] // Begin when top of container hits bottom of viewport, end when bottom hits top
    });

    // The left column moves up a bit faster (negative Y)
    const yLeft = useTransform(scrollYProgress, [0, 1], [100, -300]);
    // The right column slightly slower or opposite
    const yRight = useTransform(scrollYProgress, [0, 1], [250, -100]);

    // Split photos into two columns
    const leftColumnPhotos = photos.filter((_, i) => i % 2 === 0);
    const rightColumnPhotos = photos.filter((_, i) => i % 2 !== 0);

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.noiseOverlay}></div>
            <Header />

            <main>
                <div className={styles.headerSection}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className={styles.galleryTitle}>THE<br />GALLERY</h1>
                        <p className={styles.artistStatement}>
                            I use Intentional Camera Movement (ICM) to find the <strong>WONDER</strong> in the ordinary, painting with light to capture how a moment actually feels.
                        </p>
                    </motion.div>
                </div>

                <div className={styles.parallaxContainer} ref={containerRef}>
                    {/* Left Column */}
                    <motion.div className={styles.column} style={{ y: yLeft }}>
                        {leftColumnPhotos.map((photo) => (
                            <motion.div 
                                key={photo.id} 
                                className={styles.imageWrapper}
                                layoutId={`gallery-image-${photo.id}`}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                onClick={() => setSelectedIndex(photos.findIndex(p => p.id === photo.id))}
                            >
                                <Image 
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    className={styles.photo}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Column */}
                    <motion.div className={styles.column} style={{ y: yRight }}>
                        {rightColumnPhotos.map((photo) => (
                            <motion.div 
                                key={photo.id} 
                                className={styles.imageWrapper}
                                layoutId={`gallery-image-${photo.id}`}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                onClick={() => setSelectedIndex(photos.findIndex(p => p.id === photo.id))}
                            >
                                <Image 
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    className={styles.photo}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>

            {/* Image Expansion Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex flex-col items-center justify-between p-6 bg-black/95 backdrop-blur-xl cursor-pointer select-none"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Lightbox Header: Counter & Close */}
                        <div className="w-full flex justify-between items-center z-10 max-w-7xl px-4 pt-4 text-white font-sans text-xs uppercase tracking-[0.2em] opacity-80 pointer-events-auto">
                            <div>
                                {String(selectedIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                            </div>
                            <button
                                className="hover:text-[#e1ff00] transition-colors duration-300"
                                onClick={() => setSelectedIndex(null)}
                            >
                                CLOSE [✕]
                            </button>
                        </div>

                        {/* Lightbox Body: Left Arrow, Image, Right Arrow */}
                        <div className="relative w-full max-w-6xl h-[65vh] flex items-center justify-between my-auto px-4 gap-4">
                            {/* Prev Button */}
                            <button
                                className="hidden md:flex text-white/50 hover:text-white transition-all duration-300 w-12 h-12 items-center justify-center border border-white/10 hover:border-white/30 rounded-full hover:scale-105 active:scale-95 bg-black/40 backdrop-blur-sm pointer-events-auto z-10"
                                onClick={handlePrev}
                                aria-label="Previous image"
                            >
                                ←
                            </button>

                            {/* Image Container with AnimatePresence for slide effect */}
                            <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden pointer-events-none">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.img
                                        key={selectedIndex}
                                        src={photos[selectedIndex].src}
                                        alt={photos[selectedIndex].alt}
                                        initial={{ opacity: 0, x: 60 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -60 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="object-contain max-w-full max-h-full drop-shadow-2xl"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Next Button */}
                            <button
                                className="hidden md:flex text-white/50 hover:text-white transition-all duration-300 w-12 h-12 items-center justify-center border border-white/10 hover:border-white/30 rounded-full hover:scale-105 active:scale-95 bg-black/40 backdrop-blur-sm pointer-events-auto z-10"
                                onClick={handleNext}
                                aria-label="Next image"
                            >
                                →
                            </button>
                        </div>

                        {/* Mobile Swipe / Tap Navigation & Title Footer */}
                        <div className="w-full text-center pb-6 z-10 max-w-lg px-4 flex flex-col gap-2 pointer-events-auto">
                            <div className="text-white text-sm font-sans font-medium tracking-widest uppercase opacity-90">
                                {photos[selectedIndex].alt}
                            </div>
                            <div className="text-white/40 text-[10px] font-sans tracking-[0.2em] uppercase md:hidden mt-2">
                                Tap side buttons below to navigate
                            </div>
                            {/* Mobile arrow controls */}
                            <div className="flex justify-center gap-6 mt-4 md:hidden">
                                <button
                                    className="px-6 py-2 border border-white/10 text-white/60 hover:text-white rounded-full bg-black/30 text-xs tracking-widest uppercase active:scale-95"
                                    onClick={handlePrev}
                                >
                                    PREV
                                </button>
                                <button
                                    className="px-6 py-2 border border-white/10 text-white/60 hover:text-white rounded-full bg-black/30 text-xs tracking-widest uppercase active:scale-95"
                                    onClick={handleNext}
                                >
                                    NEXT
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Navigation />
        </div>
    );
}
