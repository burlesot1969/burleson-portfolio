'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import styles from './gallery.module.css';

// 1. Color ICM Photos (original set)
const icmPhotos = [
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

// 2. Custom Black & White Photos
const monochromePhotos = [
    { id: 101, src: "/images/gallery/monochrome/mono-1.jpeg", width: 5712, height: 4284, alt: "Monochrome 01" },
    { id: 102, src: "/images/gallery/monochrome/mono-2.jpeg", width: 4284, height: 5712, alt: "Monochrome 02" },
    { id: 103, src: "/images/gallery/monochrome/mono-3.jpeg", width: 3024, height: 4032, alt: "Monochrome 03" },
    { id: 104, src: "/images/gallery/monochrome/mono-4.jpeg", width: 3024, height: 4032, alt: "Monochrome 04" },
    { id: 105, src: "/images/gallery/monochrome/mono-5.jpeg", width: 3024, height: 4032, alt: "Monochrome 05" },
    { id: 106, src: "/images/gallery/monochrome/mono-6.jpeg", width: 3024, height: 4032, alt: "Monochrome 06" },
    { id: 107, src: "/images/gallery/monochrome/mono-7.jpeg", width: 3024, height: 4032, alt: "Monochrome 07" },
    { id: 108, src: "/images/gallery/monochrome/mono-8.jpeg", width: 3024, height: 4032, alt: "Monochrome 08" },
    { id: 109, src: "/images/gallery/monochrome/mono-9.jpeg", width: 3024, height: 4032, alt: "Monochrome 09" },
    { id: 110, src: "/images/gallery/monochrome/mono-10.jpeg", width: 4032, height: 3024, alt: "Monochrome 10" },
    { id: 111, src: "/images/gallery/monochrome/mono-11.jpeg", width: 3024, height: 4032, alt: "Monochrome 11" },
    { id: 112, src: "/images/gallery/monochrome/mono-12.jpeg", width: 3024, height: 4032, alt: "Monochrome 12" },
    { id: 113, src: "/images/gallery/monochrome/mono-13.jpeg", width: 2998, height: 3998, alt: "Monochrome 13" },
    { id: 114, src: "/images/gallery/monochrome/mono-14.jpeg", width: 4284, height: 5712, alt: "Monochrome 14" },
];

export default function GalleryClient() {
    // Navigation State: 'landing' shows split portal, 'icm' or 'bw' loads active subgallery
    const [activeCategory, setActiveCategory] = useState<'landing' | 'icm' | 'bw'>('landing');
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

    // Parallax Scroll logic (always running, binds to containerRef when active)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [100, -300]);
    const yRight = useTransform(scrollYProgress, [0, 1], [250, -100]);

    // Split active array into columns
    const activePhotos = activeCategory === 'icm' ? icmPhotos : monochromePhotos;
    const leftColumnPhotos = activePhotos.filter((_, i) => i % 2 === 0);
    const rightColumnPhotos = activePhotos.filter((_, i) => i % 2 !== 0);

    // Render Split-Screen Landing Selector
    if (activeCategory === 'landing') {
        return (
            <div className={styles.galleryContainer}>
                <div className={styles.noiseOverlay}></div>
                <Header />

                <main className={styles.portalContainer}>
                    {/* ICM Panel */}
                    <div 
                        className={styles.portalPanel}
                        onClick={() => setActiveCategory('icm')}
                    >
                        <div className={styles.panelBackground}>
                            <Image 
                                src="/images/gallery/icm-cover.jpg"
                                alt="ICM Gallery Cover"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className={styles.panelOverlay}></div>
                        <div className={styles.panelContent}>
                            <span className={styles.panelSubtitle}>Collection I</span>
                            <h1 className={styles.panelTitle}>ICM</h1>
                            <p className={styles.panelDescription}>
                                Painting with light to capture how a moment actually feels. A study of motion, abstraction, and hidden textures.
                            </p>
                            <span className={styles.panelLink}>Enter Gallery</span>
                        </div>
                    </div>

                    {/* Monochrome Panel */}
                    <div 
                        className={styles.portalPanel}
                        onClick={() => setActiveCategory('bw')}
                    >
                        <div className={styles.panelBackground}>
                            <Image 
                                src="/images/gallery/mono-cover.jpeg"
                                alt="Monochrome Gallery Cover"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className={styles.panelOverlay}></div>
                        <div className={styles.panelContent}>
                            <span className={`${styles.panelSubtitle} ${styles.panelSubtitleMono}`}>Collection II</span>
                            <h1 className={styles.panelTitle}>Monochrome</h1>
                            <p className={styles.panelDescription}>
                                Stripping away color to reveal the raw geometry of light, shadow, and quiet details.
                            </p>
                            <span className={`${styles.panelLink} ${styles.panelLinkMono}`}>Enter Gallery</span>
                        </div>
                    </div>
                </main>

                <Navigation />
            </div>
        );
    }

    // Render Active Grid Subgallery
    return (
        <div className={`${styles.galleryContainer} ${activeCategory === 'bw' ? styles.monochromeTheme : ''}`}>
            <div className={styles.noiseOverlay}></div>
            <Header />

            <main>
                <div className={styles.headerSection}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Elegant Breadcrumb Navigation */}
                        <div className={styles.breadcrumb}>
                            <span 
                                className={styles.breadcrumbLink} 
                                onClick={() => setActiveCategory('landing')}
                            >
                                COLLECTIONS
                            </span>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={`${styles.breadcrumbCurrent} ${activeCategory === 'bw' ? styles.breadcrumbCurrentMono : ''}`}>
                                {activeCategory === 'icm' ? 'ICM' : 'MONOCHROME'}
                            </span>
                        </div>

                        <h1 className={styles.galleryTitle}>
                            {activeCategory === 'icm' ? (
                                <>THE<br />ICM GALLERY</>
                            ) : (
                                <>THE<br />MONOCHROME</>
                            )}
                        </h1>

                        <p className={styles.artistStatement}>
                            {activeCategory === 'icm' ? (
                                <>I use <strong>Intentional Camera Movement (ICM)</strong> to find the wonder in the ordinary, painting with light to capture how a moment actually feels.</>
                            ) : (
                                <>Stripping away color to explore the quiet architecture of <strong>light, shadow, and high contrast</strong> in abstract forms.</>
                            )}
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
                            className={`absolute -top-12 right-0 text-white text-xl font-mono ${activeCategory === 'bw' ? 'hover:text-zinc-400' : 'hover:text-[#e1ff00]'}`}
                            aria-label="Close modal"
                            onClick={() => setExpandedImage(null)}
                        >
                            [X] CLOSE
                        </button>
                        <motion.img
                            layoutId={`gallery-image-${activePhotos.find(p => p.src === expandedImage)?.id}`}
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
