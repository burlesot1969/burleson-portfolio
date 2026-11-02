'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import styles from './gallery.module.css';

type GalleryCategory = 'icm' | 'bw' | 'panhock' | 'look-closer';
type LayoutMode = 'editorial' | 'single';

interface PhotoItem {
    id: number;
    src: string;
    width: number;
    height: number;
    alt: string;
}

// 1. Color ICM Photos (original set)
const icmPhotos: PhotoItem[] = [
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
const monochromePhotos: PhotoItem[] = [
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

// 3. Look Closer (Macro & Intimate Details)
const lookCloserPhotos: PhotoItem[] = [
    { id: 201, src: "/images/gallery/look-closer/look-closer-1.jpeg", width: 960, height: 1280, alt: "Look Closer 01" },
    { id: 202, src: "/images/gallery/look-closer/look-closer-2.jpeg", width: 960, height: 1280, alt: "Look Closer 02" },
    { id: 203, src: "/images/gallery/look-closer/look-closer-3.jpeg", width: 960, height: 1280, alt: "Look Closer 03" },
    { id: 204, src: "/images/gallery/look-closer/look-closer-4.jpeg", width: 993, height: 1280, alt: "Look Closer 04" },
    { id: 205, src: "/images/gallery/look-closer/look-closer-5.jpeg", width: 961, height: 1280, alt: "Look Closer 05" },
    { id: 206, src: "/images/gallery/look-closer/look-closer-6.jpeg", width: 960, height: 1280, alt: "Look Closer 06" },
    { id: 207, src: "/images/gallery/look-closer/look-closer-7.jpeg", width: 1280, height: 960, alt: "Look Closer 07" },
    { id: 208, src: "/images/gallery/look-closer/look-closer-8.jpeg", width: 960, height: 1280, alt: "Look Closer 08" },
    { id: 209, src: "/images/gallery/look-closer/look-closer-9.jpeg", width: 960, height: 1280, alt: "Look Closer 09" },
    { id: 210, src: "/images/gallery/look-closer/look-closer-10.jpeg", width: 960, height: 1280, alt: "Look Closer 10" },
    { id: 211, src: "/images/gallery/look-closer/look-closer-11.jpeg", width: 960, height: 1280, alt: "Look Closer 11" },
    { id: 212, src: "/images/gallery/look-closer/look-closer-12.jpeg", width: 960, height: 1280, alt: "Look Closer 12" },
    { id: 213, src: "/images/gallery/look-closer/look-closer-13.jpeg", width: 1280, height: 960, alt: "Look Closer 13" },
    { id: 214, src: "/images/gallery/look-closer/look-closer-14.jpeg", width: 1280, height: 960, alt: "Look Closer 14" },
    { id: 215, src: "/images/gallery/look-closer/look-closer-15.jpeg", width: 960, height: 1280, alt: "Look Closer 15" },
    { id: 216, src: "/images/gallery/look-closer/look-closer-16.jpeg", width: 1280, height: 960, alt: "Look Closer 16" },
    { id: 217, src: "/images/gallery/look-closer/look-closer-17.jpeg", width: 960, height: 1280, alt: "Look Closer 17" },
    { id: 218, src: "/images/gallery/look-closer/look-closer-18.jpeg", width: 1280, height: 960, alt: "Look Closer 18" },
    { id: 219, src: "/images/gallery/look-closer/look-closer-19.jpeg", width: 960, height: 1280, alt: "Look Closer 19" },
    { id: 220, src: "/images/gallery/look-closer/look-closer-20.jpeg", width: 960, height: 1280, alt: "Look Closer 20" },
    { id: 221, src: "/images/gallery/look-closer/look-closer-21.jpeg", width: 960, height: 1280, alt: "Look Closer 21" },
    { id: 222, src: "/images/gallery/look-closer/look-closer-22.jpeg", width: 1280, height: 960, alt: "Look Closer 22" },
    { id: 223, src: "/images/gallery/look-closer/look-closer-23.jpeg", width: 1280, height: 960, alt: "Look Closer 23" },
    { id: 224, src: "/images/gallery/look-closer/look-closer-24.jpeg", width: 896, height: 1195, alt: "Look Closer 24" },
    { id: 225, src: "/images/gallery/look-closer/look-closer-25.jpeg", width: 960, height: 1280, alt: "Look Closer 25" },
    { id: 226, src: "/images/gallery/look-closer/look-closer-26.jpeg", width: 960, height: 1280, alt: "Look Closer 26" },
    { id: 227, src: "/images/gallery/look-closer/look-closer-27.jpeg", width: 960, height: 1280, alt: "Look Closer 27" },
    { id: 228, src: "/images/gallery/look-closer/look-closer-28.jpeg", width: 960, height: 1280, alt: "Look Closer 28" },
    { id: 229, src: "/images/gallery/look-closer/look-closer-29.jpeg", width: 960, height: 1280, alt: "Look Closer 29" },
    { id: 230, src: "/images/gallery/look-closer/look-closer-30.jpeg", width: 960, height: 1280, alt: "Look Closer 30" },
    { id: 231, src: "/images/gallery/look-closer/look-closer-31.jpeg", width: 960, height: 1280, alt: "Look Closer 31" },
    { id: 232, src: "/images/gallery/look-closer/look-closer-32.jpeg", width: 1280, height: 960, alt: "Look Closer 32" },
    { id: 233, src: "/images/gallery/look-closer/look-closer-33.jpeg", width: 957, height: 640, alt: "Look Closer 33" },
    { id: 234, src: "/images/gallery/look-closer/look-closer-34.jpeg", width: 960, height: 1280, alt: "Look Closer 34" },
    { id: 235, src: "/images/gallery/look-closer/look-closer-35.jpeg", width: 960, height: 1280, alt: "Look Closer 35" },
    { id: 236, src: "/images/gallery/look-closer/look-closer-36.jpeg", width: 1280, height: 960, alt: "Look Closer 36" },
    { id: 237, src: "/images/gallery/look-closer/look-closer-37.jpeg", width: 1280, height: 960, alt: "Look Closer 37" },
    { id: 238, src: "/images/gallery/look-closer/look-closer-38.jpeg", width: 1000, height: 669, alt: "Look Closer 38" },
];

// 4. PanHock Portfolio (Panography & Hockney-Inspired Joiners)
const panhockPhotos: PhotoItem[] = [
    { id: 301, src: "/images/gallery/panhock/panhock-1.jpeg", width: 640, height: 800, alt: "PanHock 01" },
    { id: 302, src: "/images/gallery/panhock/panhock-2.jpeg", width: 553, height: 1000, alt: "PanHock 02" },
    { id: 303, src: "/images/gallery/panhock/panhock-3.jpeg", width: 600, height: 800, alt: "PanHock 03" },
    { id: 304, src: "/images/gallery/panhock/panhock-4.jpeg", width: 720, height: 1280, alt: "PanHock 04" },
    { id: 305, src: "/images/gallery/panhock/panhock-5.jpeg", width: 1000, height: 454, alt: "PanHock 05" },
    { id: 306, src: "/images/gallery/panhock/panhock-6.jpeg", width: 978, height: 1280, alt: "PanHock 06" },
    { id: 307, src: "/images/gallery/panhock/panhock-7.jpeg", width: 768, height: 1280, alt: "PanHock 07" },
    { id: 308, src: "/images/gallery/panhock/panhock-8.jpeg", width: 1280, height: 640, alt: "PanHock 08" },
    { id: 309, src: "/images/gallery/panhock/panhock-9.jpeg", width: 1280, height: 303, alt: "PanHock 09" },
    { id: 310, src: "/images/gallery/panhock/panhock-10.jpeg", width: 978, height: 1280, alt: "PanHock 10" },
    { id: 311, src: "/images/gallery/panhock/panhock-11.jpeg", width: 1280, height: 1280, alt: "PanHock 11" },
    { id: 312, src: "/images/gallery/panhock/panhock-12.jpeg", width: 569, height: 423, alt: "PanHock 12" },
    { id: 313, src: "/images/gallery/panhock/panhock-13.jpeg", width: 711, height: 1280, alt: "PanHock 13" },
    { id: 314, src: "/images/gallery/panhock/panhock-14.jpeg", width: 1280, height: 830, alt: "PanHock 14" },
    { id: 315, src: "/images/gallery/panhock/panhock-15.jpeg", width: 707, height: 1280, alt: "PanHock 15" },
    { id: 316, src: "/images/gallery/panhock/panhock-16.jpeg", width: 640, height: 1280, alt: "PanHock 16" },
    { id: 317, src: "/images/gallery/panhock/panhock-17.jpeg", width: 1280, height: 1251, alt: "PanHock 17" },
    { id: 318, src: "/images/gallery/panhock/panhock-18.jpeg", width: 1280, height: 1067, alt: "PanHock 18" },
    { id: 319, src: "/images/gallery/panhock/panhock-19.jpeg", width: 1280, height: 819, alt: "PanHock 19" },
    { id: 320, src: "/images/gallery/panhock/panhock-20.jpeg", width: 1280, height: 1280, alt: "PanHock 20" },
    { id: 321, src: "/images/gallery/panhock/panhock-21.jpeg", width: 1024, height: 1280, alt: "PanHock 21" },
];

const GALLERY_META: Record<
    GalleryCategory,
    {
        collectionLabel: string;
        shortTitle: string;
        breadcrumb: string;
        headingLines: [string, string];
        coverImage: string;
        coverAlt: string;
        portalDescription: string;
        statement: React.ReactNode;
        photos: PhotoItem[];
    }
> = {
    icm: {
        collectionLabel: 'Collection I',
        shortTitle: 'ICM',
        breadcrumb: 'ICM',
        headingLines: ['THE', 'ICM GALLERY'],
        coverImage: '/images/gallery/icm-cover.jpg',
        coverAlt: 'ICM Gallery Cover',
        portalDescription:
            'Painting with light to capture how a moment actually feels. A study of motion, abstraction, and hidden textures.',
        statement: (
            <>
                I use <strong>Intentional Camera Movement (ICM)</strong> to find the wonder in the ordinary, painting with light to capture how a moment actually feels.
            </>
        ),
        photos: icmPhotos,
    },
    bw: {
        collectionLabel: 'Collection II',
        shortTitle: 'Monochrome',
        breadcrumb: 'MONOCHROME',
        headingLines: ['THE', 'MONOCHROME'],
        coverImage: '/images/gallery/mono-cover.jpeg',
        coverAlt: 'Monochrome Gallery Cover',
        portalDescription:
            'Stripping away color to reveal the raw geometry of light, shadow, and quiet details.',
        statement: (
            <>
                Stripping away color to explore the quiet architecture of <strong>light, shadow, and high contrast</strong> in abstract forms.
            </>
        ),
        photos: monochromePhotos,
    },
    panhock: {
        collectionLabel: 'Collection III',
        shortTitle: 'PanHock',
        breadcrumb: 'PANHOCK',
        headingLines: ['THE', 'PANHOCK GALLERY'],
        coverImage: '/images/gallery/panhock/panhock-4.jpeg',
        coverAlt: 'PanHock Gallery Cover',
        portalDescription:
            'Fragmented perspectives and Hockney-inspired photo joiners that stitch time, space, and memory into layered mosaics.',
        statement: (
            <>
                Inspired by <strong>panography and David Hockney&apos;s joiners</strong>, each composite is built from individual frames—stitching shifting angles and moments of time into a single unified vision.
            </>
        ),
        photos: panhockPhotos,
    },
    'look-closer': {
        collectionLabel: 'Collection IV',
        shortTitle: 'Look Closer',
        breadcrumb: 'LOOK CLOSER',
        headingLines: ['LOOK', 'CLOSER'],
        coverImage: '/images/gallery/look-closer/look-closer-2.jpeg',
        coverAlt: 'Look Closer Gallery Cover',
        portalDescription:
            'Intimate macro studies and close-up observations uncovering the extraordinary textures hiding in plain sight.',
        statement: (
            <>
                Slowing down to <strong>look closer</strong>—revealing the intricate geometry, delicate textures, and quiet miracles hiding in plain sight all around us.
            </>
        ),
        photos: lookCloserPhotos,
    },
};

const PORTAL_ORDER: GalleryCategory[] = ['icm', 'bw', 'panhock', 'look-closer'];

/**
 * Groups photos into an Aspect-Ratio-Aware Editorial Salon Hang:
 * - Landscape / Panoramic photos (width > height) and every 5th vertical showcase piece
 *   get a full-width hero row so wide compositions are never squeezed into narrow columns.
 * - Remaining vertical/square works pair into oversized 2-up diptych rows.
 */
function buildEditorialRows(photos: PhotoItem[]): Array<{ type: 'full'; photo: PhotoItem } | { type: 'pair'; photos: [PhotoItem, PhotoItem] }> {
    const rows: Array<{ type: 'full'; photo: PhotoItem } | { type: 'pair'; photos: [PhotoItem, PhotoItem] }> = [];
    let pendingVertical: PhotoItem | null = null;
    let verticalPairCount = 0;

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const isLandscape = photo.width > photo.height * 1.05;

        if (isLandscape) {
            rows.push({ type: 'full', photo });
        } else {
            // Every 3rd vertical row (after 2 pairs), showcase one vertical as a full-stage hero if no landscapes have appeared
            if (!pendingVertical && verticalPairCount === 2) {
                rows.push({ type: 'full', photo });
                verticalPairCount = 0;
            } else if (!pendingVertical) {
                pendingVertical = photo;
            } else {
                rows.push({ type: 'pair', photos: [pendingVertical, photo] });
                pendingVertical = null;
                verticalPairCount++;
            }
        }
    }

    if (pendingVertical) {
        rows.push({ type: 'full', photo: pendingVertical });
    }

    return rows;
}

interface SubGalleryViewProps {
    activeCategory: GalleryCategory;
    onBack: () => void;
    onSelectCategory: (cat: GalleryCategory) => void;
}

function SubGalleryView({ activeCategory, onBack, onSelectCategory }: SubGalleryViewProps) {
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('editorial');

    const meta = GALLERY_META[activeCategory];
    const activePhotos = meta.photos;
    const editorialRows = buildEditorialRows(activePhotos);

    // Escape Key & Arrow Navigation for Modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setExpandedImage(null);
            } else if (e.key === 'ArrowRight' && expandedImage) {
                const idx = activePhotos.findIndex((p) => p.src === expandedImage);
                if (idx !== -1) {
                    setExpandedImage(activePhotos[(idx + 1) % activePhotos.length].src);
                }
            } else if (e.key === 'ArrowLeft' && expandedImage) {
                const idx = activePhotos.findIndex((p) => p.src === expandedImage);
                if (idx !== -1) {
                    setExpandedImage(activePhotos[(idx - 1 + activePhotos.length) % activePhotos.length].src);
                }
            }
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
    }, [expandedImage, activePhotos]);

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.noiseOverlay}></div>
            <Header />

            <main>
                <div className={styles.headerSection}>
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Elegant Breadcrumb */}
                        <div className={styles.breadcrumb}>
                            <button
                                type="button"
                                className={styles.breadcrumbLink}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    onBack();
                                }}
                            >
                                COLLECTIONS
                            </button>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>
                                {meta.breadcrumb}
                            </span>
                        </div>

                        {/* Quick Collection Switcher Pills */}
                        <div className={styles.collectionSwitcher}>
                            {PORTAL_ORDER.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => onSelectCategory(cat)}
                                    className={`${styles.switcherPill} ${
                                        activeCategory === cat ? styles.switcherPillActive : ''
                                    }`}
                                >
                                    {GALLERY_META[cat].shortTitle}
                                </button>
                            ))}
                        </div>

                        <h1 className={styles.galleryTitle}>
                            {meta.headingLines[0]}
                            <br />
                            {meta.headingLines[1]}
                        </h1>

                        <p className={styles.artistStatement}>{meta.statement}</p>

                        {/* View Mode Toggle: Editorial Salon vs. Full-Stage Single Exhibition */}
                        <div className={styles.viewModeBar}>
                            <span className={styles.viewModeLabel}>DISPLAY:</span>
                            <button
                                type="button"
                                onClick={() => setLayoutMode('editorial')}
                                className={`${styles.viewModeBtn} ${
                                    layoutMode === 'editorial' ? styles.viewModeBtnActive : ''
                                }`}
                            >
                                Salon Rhythm (Hero + Pair)
                            </button>
                            <button
                                type="button"
                                onClick={() => setLayoutMode('single')}
                                className={`${styles.viewModeBtn} ${
                                    layoutMode === 'single' ? styles.viewModeBtnActive : ''
                                }`}
                            >
                                Full-Stage (1 Per Row)
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Full-Stage Single-Column Exhibition View */}
                {layoutMode === 'single' ? (
                    <div className={styles.singleStageContainer}>
                        {activePhotos.map((photo) => (
                            <motion.div
                                key={photo.id}
                                className={styles.singleStageItem}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                onClick={() => setExpandedImage(photo.src)}
                            >
                                <div className={styles.singleStageFrame}>
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        width={photo.width}
                                        height={photo.height}
                                        className={styles.singleStagePhoto}
                                        sizes="95vw"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Aspect-Ratio-Aware Editorial Salon Hang */
                    <div className={styles.editorialContainer}>
                        {editorialRows.map((row, idx) => {
                            if (row.type === 'full') {
                                const photo = row.photo;
                                const isLandscape = photo.width > photo.height * 1.05;
                                return (
                                    <motion.div
                                        key={`row-full-${photo.id}-${idx}`}
                                        className={styles.editorialHeroRow}
                                        initial={{ opacity: 0, y: 60 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.7, ease: 'easeOut' }}
                                        onClick={() => setExpandedImage(photo.src)}
                                    >
                                        <div
                                            className={
                                                isLandscape
                                                    ? styles.editorialLandscapeFrame
                                                    : styles.editorialVerticalHeroFrame
                                            }
                                        >
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                width={photo.width}
                                                height={photo.height}
                                                className={styles.editorialPhoto}
                                                sizes="94vw"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            }

                            return (
                                <div key={`row-pair-${row.photos[0].id}-${idx}`} className={styles.editorialPairRow}>
                                    {row.photos.map((photo) => (
                                        <motion.div
                                            key={photo.id}
                                            className={styles.imageWrapper}
                                            initial={{ opacity: 0, y: 60 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-50px' }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                            onClick={() => setExpandedImage(photo.src)}
                                        >
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                width={photo.width}
                                                height={photo.height}
                                                className={styles.photo}
                                                sizes="(max-width: 768px) 96vw, 46vw"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Image Expansion Modal */}
            {expandedImage && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-pointer"
                    onClick={() => setExpandedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-[92vh] w-full h-full flex items-center justify-center">
                        <button
                            className="absolute -top-10 right-0 text-white hover:text-zinc-400 text-sm font-mono tracking-widest"
                            aria-label="Close modal"
                            onClick={() => setExpandedImage(null)}
                        >
                            [ESC / CLOSE]
                        </button>
                        <motion.img
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

export default function GalleryClient() {
    // Navigation State: 'landing' shows 4-part split portal, or active subgallery
    const [activeCategory, setActiveCategory] = useState<'landing' | GalleryCategory>('landing');

    const handleSelectCategory = (category: GalleryCategory) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setActiveCategory(category);
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setActiveCategory('landing');
    };

    // Render 4-Part Split-Screen Landing Selector
    if (activeCategory === 'landing') {
        return (
            <div className={styles.galleryContainer}>
                <div className={styles.noiseOverlay}></div>
                <Header />

                <main className={styles.portalContainer}>
                    {PORTAL_ORDER.map((categoryKey) => {
                        const item = GALLERY_META[categoryKey];
                        return (
                            <div
                                key={categoryKey}
                                className={styles.portalPanel}
                                onClick={() => handleSelectCategory(categoryKey)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleSelectCategory(categoryKey);
                                    }
                                }}
                            >
                                <div className={styles.panelBackground}>
                                    <Image
                                        src={item.coverImage}
                                        alt={item.coverAlt}
                                        fill
                                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className={styles.panelOverlay}></div>
                                <div className={styles.panelContent}>
                                    <span className={styles.panelSubtitle}>{item.collectionLabel}</span>
                                    <h2 className={styles.panelTitle}>{item.shortTitle}</h2>
                                    <p className={styles.panelDescription}>{item.portalDescription}</p>
                                    <span className={styles.panelLink}>Enter Gallery</span>
                                </div>
                            </div>
                        );
                    })}
                </main>

                <Navigation />
            </div>
        );
    }

    // Render Active Subgallery
    return (
        <SubGalleryView
            activeCategory={activeCategory}
            onBack={handleBack}
            onSelectCategory={handleSelectCategory}
        />
    );
}
