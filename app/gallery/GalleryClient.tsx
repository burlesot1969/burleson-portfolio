'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Escape Key & Body Scroll Lock for Modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setExpandedImage(null);
        };
        
        if (expandedImage) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [expandedImage]);

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
                                onClick={() => setExpandedImage(photo.src)}
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
                                onClick={() => setExpandedImage(photo.src)}
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
            {expandedImage && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-pointer"
                    onClick={() => setExpandedImage(null)}
                >
                    <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-[#e1ff00] text-xl font-mono"
                            aria-label="Close modal"
                            onClick={() => setExpandedImage(null)}
                        >
                            [X] CLOSE
                        </button>
                        <motion.img
                            layoutId={`gallery-image-${photos.find(p => p.src === expandedImage)?.id}`}
                            src={expandedImage}
                            alt="Expanded Photo"
                            className="object-contain max-w-full max-h-full drop-shadow-2xl"
                        />
                    </div>
                </div>
            )}

            <Navigation />
        </div>
    );
}
