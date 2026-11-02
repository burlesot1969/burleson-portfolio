'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import styles from './gallery.module.css';

type GalleryCategory = 'icm' | 'bw' | 'panhock' | 'look-closer' | 'project-gallery';

interface PhotoItem {
    id: number;
    src: string;
    width: number;
    height: number;
    alt: string;
}

// 1. Color ICM Photos (normalized to 3024 base scale)
const icmPhotos: PhotoItem[] = [
    { id: 1, src: "/images/gallery/abstract-01.jpg", width: 4032, height: 3024, alt: "Abstract 01" },
    { id: 2, src: "/images/gallery/abstract-02.JPG", width: 3024, height: 4032, alt: "Abstract 02" },
    { id: 3, src: "/images/gallery/abstract-03.JPG", width: 3024, height: 4032, alt: "Abstract 03" },
    { id: 4, src: "/images/gallery/abstract-04.jpeg", width: 3024, height: 4032, alt: "Abstract 04" },
    { id: 5, src: "/images/gallery/abstract-05.jpg", width: 4032, height: 3024, alt: "Abstract 05" },
    { id: 6, src: "/images/gallery/abstract-06.JPG", width: 3024, height: 4032, alt: "Abstract 06" },
    { id: 7, src: "/images/gallery/abstract-07.JPG", width: 3024, height: 4034, alt: "Abstract 07" },
    { id: 8, src: "/images/gallery/abstract-08.JPG", width: 3024, height: 4027, alt: "Abstract 08" },
    { id: 9, src: "/images/gallery/abstract-09.JPG", width: 3024, height: 4032, alt: "Abstract 09" },
    { id: 10, src: "/images/gallery/abstract-10.JPG", width: 3024, height: 4176, alt: "Abstract 10" },
    { id: 11, src: "/images/gallery/abstract-11.JPG", width: 3024, height: 4116, alt: "Abstract 11" },
    { id: 12, src: "/images/gallery/abstract-12.JPG", width: 3024, height: 4032, alt: "Abstract 12" },
    { id: 13, src: "/images/gallery/abstract-13.JPG", width: 4032, height: 2729, alt: "Abstract 13" },
    { id: 14, src: "/images/gallery/abstract-14.JPG", width: 3024, height: 4033, alt: "Abstract 14" },
    { id: 15, src: "/images/gallery/abstract-15.JPG", width: 3024, height: 4032, alt: "Abstract 15" },
    { id: 16, src: "/images/gallery/abstract-16.JPG", width: 3024, height: 4032, alt: "Abstract 16" },
    { id: 17, src: "/images/gallery/abstract-17.JPG", width: 3024, height: 4032, alt: "Abstract 17" },
    { id: 18, src: "/images/gallery/abstract-18.JPG", width: 3024, height: 4033, alt: "Abstract 18" },
];

// 2. Custom Black & White Photos (normalized to ICM 3024/4032 dimensions)
const monochromePhotos: PhotoItem[] = [
    { id: 101, src: "/images/gallery/monochrome/mono-1.jpeg", width: 4032, height: 3024, alt: "Monochrome 01" },
    { id: 102, src: "/images/gallery/monochrome/mono-2.jpeg", width: 3024, height: 4032, alt: "Monochrome 02" },
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
    { id: 113, src: "/images/gallery/monochrome/mono-13.jpeg", width: 3024, height: 4033, alt: "Monochrome 13" },
    { id: 114, src: "/images/gallery/monochrome/mono-14.jpeg", width: 3024, height: 4032, alt: "Monochrome 14" },
];

// 3. Look Closer (normalized to ICM 3024/4032 dimensions)
const lookCloserPhotos: PhotoItem[] = [
    { id: 201, src: "/images/gallery/look-closer/look-closer-1.jpeg", width: 3024, height: 4032, alt: "Look Closer 01" },
    { id: 202, src: "/images/gallery/look-closer/look-closer-2.jpeg", width: 3024, height: 4032, alt: "Look Closer 02" },
    { id: 203, src: "/images/gallery/look-closer/look-closer-3.jpeg", width: 3024, height: 4032, alt: "Look Closer 03" },
    { id: 204, src: "/images/gallery/look-closer/look-closer-4.jpeg", width: 3024, height: 3898, alt: "Look Closer 04" },
    { id: 205, src: "/images/gallery/look-closer/look-closer-5.jpeg", width: 3024, height: 4028, alt: "Look Closer 05" },
    { id: 206, src: "/images/gallery/look-closer/look-closer-6.jpeg", width: 3024, height: 4032, alt: "Look Closer 06" },
    { id: 207, src: "/images/gallery/look-closer/look-closer-7.jpeg", width: 4032, height: 3024, alt: "Look Closer 07" },
    { id: 208, src: "/images/gallery/look-closer/look-closer-8.jpeg", width: 3024, height: 4032, alt: "Look Closer 08" },
    { id: 209, src: "/images/gallery/look-closer/look-closer-9.jpeg", width: 3024, height: 4032, alt: "Look Closer 09" },
    { id: 210, src: "/images/gallery/look-closer/look-closer-10.jpeg", width: 3024, height: 4032, alt: "Look Closer 10" },
    { id: 211, src: "/images/gallery/look-closer/look-closer-11.jpeg", width: 3024, height: 4032, alt: "Look Closer 11" },
    { id: 212, src: "/images/gallery/look-closer/look-closer-12.jpeg", width: 3024, height: 4032, alt: "Look Closer 12" },
    { id: 213, src: "/images/gallery/look-closer/look-closer-13.jpeg", width: 4032, height: 3024, alt: "Look Closer 13" },
    { id: 214, src: "/images/gallery/look-closer/look-closer-14.jpeg", width: 4032, height: 3024, alt: "Look Closer 14" },
    { id: 215, src: "/images/gallery/look-closer/look-closer-15.jpeg", width: 3024, height: 4032, alt: "Look Closer 15" },
    { id: 216, src: "/images/gallery/look-closer/look-closer-16.jpeg", width: 4032, height: 3024, alt: "Look Closer 16" },
    { id: 217, src: "/images/gallery/look-closer/look-closer-17.jpeg", width: 3024, height: 4032, alt: "Look Closer 17" },
    { id: 218, src: "/images/gallery/look-closer/look-closer-18.jpeg", width: 4032, height: 3024, alt: "Look Closer 18" },
    { id: 219, src: "/images/gallery/look-closer/look-closer-19.jpeg", width: 3024, height: 4032, alt: "Look Closer 19" },
    { id: 220, src: "/images/gallery/look-closer/look-closer-20.jpeg", width: 3024, height: 4032, alt: "Look Closer 20" },
    { id: 221, src: "/images/gallery/look-closer/look-closer-21.jpeg", width: 3024, height: 4032, alt: "Look Closer 21" },
    { id: 222, src: "/images/gallery/look-closer/look-closer-22.jpeg", width: 4032, height: 3024, alt: "Look Closer 22" },
    { id: 223, src: "/images/gallery/look-closer/look-closer-23.jpeg", width: 4032, height: 3024, alt: "Look Closer 23" },
    { id: 224, src: "/images/gallery/look-closer/look-closer-24.jpeg", width: 3024, height: 4033, alt: "Look Closer 24" },
    { id: 225, src: "/images/gallery/look-closer/look-closer-25.jpeg", width: 3024, height: 4032, alt: "Look Closer 25" },
    { id: 226, src: "/images/gallery/look-closer/look-closer-26.jpeg", width: 3024, height: 4032, alt: "Look Closer 26" },
    { id: 227, src: "/images/gallery/look-closer/look-closer-27.jpeg", width: 3024, height: 4032, alt: "Look Closer 27" },
    { id: 228, src: "/images/gallery/look-closer/look-closer-28.jpeg", width: 3024, height: 4032, alt: "Look Closer 28" },
    { id: 229, src: "/images/gallery/look-closer/look-closer-29.jpeg", width: 3024, height: 4032, alt: "Look Closer 29" },
    { id: 230, src: "/images/gallery/look-closer/look-closer-30.jpeg", width: 3024, height: 4032, alt: "Look Closer 30" },
    { id: 231, src: "/images/gallery/look-closer/look-closer-31.jpeg", width: 3024, height: 4032, alt: "Look Closer 31" },
    { id: 232, src: "/images/gallery/look-closer/look-closer-32.jpeg", width: 4032, height: 3024, alt: "Look Closer 32" },
    { id: 233, src: "/images/gallery/look-closer/look-closer-33.jpeg", width: 4032, height: 2697, alt: "Look Closer 33" },
    { id: 234, src: "/images/gallery/look-closer/look-closer-34.jpeg", width: 3024, height: 4032, alt: "Look Closer 34" },
    { id: 235, src: "/images/gallery/look-closer/look-closer-35.jpeg", width: 3024, height: 4032, alt: "Look Closer 35" },
    { id: 236, src: "/images/gallery/look-closer/look-closer-36.jpeg", width: 4032, height: 3024, alt: "Look Closer 36" },
    { id: 237, src: "/images/gallery/look-closer/look-closer-37.jpeg", width: 4032, height: 3024, alt: "Look Closer 37" },
    { id: 238, src: "/images/gallery/look-closer/look-closer-38.jpeg", width: 4032, height: 2697, alt: "Look Closer 38" },
];

// 4. PanHock Portfolio (normalized to ICM 3024/4032 dimensions)
const panhockPhotos: PhotoItem[] = [
    { id: 301, src: "/images/gallery/panhock/panhock-1.jpeg", width: 3024, height: 3780, alt: "PanHock 01" },
    { id: 302, src: "/images/gallery/panhock/panhock-2.jpeg", width: 3024, height: 5468, alt: "PanHock 02" },
    { id: 303, src: "/images/gallery/panhock/panhock-3.jpeg", width: 3024, height: 4032, alt: "PanHock 03" },
    { id: 304, src: "/images/gallery/panhock/panhock-4.jpeg", width: 3024, height: 5376, alt: "PanHock 04" },
    { id: 305, src: "/images/gallery/panhock/panhock-5.jpeg", width: 4032, height: 1831, alt: "PanHock 05" },
    { id: 306, src: "/images/gallery/panhock/panhock-6.jpeg", width: 3024, height: 3958, alt: "PanHock 06" },
    { id: 307, src: "/images/gallery/panhock/panhock-7.jpeg", width: 3024, height: 5040, alt: "PanHock 07" },
    { id: 308, src: "/images/gallery/panhock/panhock-8.jpeg", width: 4032, height: 2016, alt: "PanHock 08" },
    { id: 309, src: "/images/gallery/panhock/panhock-9.jpeg", width: 4032, height: 954, alt: "PanHock 09" },
    { id: 310, src: "/images/gallery/panhock/panhock-10.jpeg", width: 3024, height: 3958, alt: "PanHock 10" },
    { id: 311, src: "/images/gallery/panhock/panhock-11.jpeg", width: 3024, height: 3024, alt: "PanHock 11" },
    { id: 312, src: "/images/gallery/panhock/panhock-12.jpeg", width: 4032, height: 2997, alt: "PanHock 12" },
    { id: 313, src: "/images/gallery/panhock/panhock-13.jpeg", width: 3024, height: 5444, alt: "PanHock 13" },
    { id: 314, src: "/images/gallery/panhock/panhock-14.jpeg", width: 4032, height: 2615, alt: "PanHock 14" },
    { id: 315, src: "/images/gallery/panhock/panhock-15.jpeg", width: 3024, height: 5475, alt: "PanHock 15" },
    { id: 316, src: "/images/gallery/panhock/panhock-16.jpeg", width: 3024, height: 6048, alt: "PanHock 16" },
    { id: 317, src: "/images/gallery/panhock/panhock-17.jpeg", width: 3024, height: 2955, alt: "PanHock 17" },
    { id: 318, src: "/images/gallery/panhock/panhock-18.jpeg", width: 4032, height: 3361, alt: "PanHock 18" },
    { id: 319, src: "/images/gallery/panhock/panhock-19.jpeg", width: 4032, height: 2580, alt: "PanHock 19" },
    { id: 320, src: "/images/gallery/panhock/panhock-20.jpeg", width: 3024, height: 3024, alt: "PanHock 20" },
    { id: 321, src: "/images/gallery/panhock/panhock-21.jpeg", width: 3024, height: 3780, alt: "PanHock 21" },
];

// 5. Project Gallery (Mixed Media, Pencil, Colored Pencil, Collage, Painting, Alcohol Ink)
const projectGalleryPhotos: PhotoItem[] = [
    { id: 401, src: "/images/gallery/project-gallery/project-gallery-1.jpeg", width: 3024, height: 4235, alt: "Project Gallery 01" },
    { id: 402, src: "/images/gallery/project-gallery/project-gallery-2.jpeg", width: 3024, height: 4235, alt: "Project Gallery 02" },
    { id: 403, src: "/images/gallery/project-gallery/project-gallery-3.jpeg", width: 3024, height: 4235, alt: "Project Gallery 03" },
    { id: 404, src: "/images/gallery/project-gallery/project-gallery-4.jpeg", width: 3024, height: 4235, alt: "Project Gallery 04" },
    { id: 405, src: "/images/gallery/project-gallery/project-gallery-5.jpeg", width: 3024, height: 4235, alt: "Project Gallery 05" },
    { id: 406, src: "/images/gallery/project-gallery/project-gallery-6.jpeg", width: 3024, height: 4235, alt: "Project Gallery 06" },
    { id: 407, src: "/images/gallery/project-gallery/project-gallery-7.jpeg", width: 3024, height: 4032, alt: "Project Gallery 07" },
    { id: 408, src: "/images/gallery/project-gallery/project-gallery-8.jpeg", width: 3024, height: 4032, alt: "Project Gallery 08" },
    { id: 409, src: "/images/gallery/project-gallery/project-gallery-9.jpeg", width: 3024, height: 4354, alt: "Project Gallery 09" },
    { id: 410, src: "/images/gallery/project-gallery/project-gallery-10.jpeg", width: 4032, height: 2725, alt: "Project Gallery 10" },
    { id: 411, src: "/images/gallery/project-gallery/project-gallery-11.jpeg", width: 4032, height: 3024, alt: "Project Gallery 11" },
    { id: 412, src: "/images/gallery/project-gallery/project-gallery-12.jpeg", width: 4032, height: 2753, alt: "Project Gallery 12" },
    { id: 413, src: "/images/gallery/project-gallery/project-gallery-13.jpeg", width: 3024, height: 4028, alt: "Project Gallery 13" },
    { id: 414, src: "/images/gallery/project-gallery/project-gallery-14.jpeg", width: 4032, height: 2722, alt: "Project Gallery 14" },
    { id: 415, src: "/images/gallery/project-gallery/project-gallery-15.jpeg", width: 3024, height: 3780, alt: "Project Gallery 15" },
    { id: 416, src: "/images/gallery/project-gallery/project-gallery-16.jpeg", width: 3024, height: 4032, alt: "Project Gallery 16" },
    { id: 417, src: "/images/gallery/project-gallery/project-gallery-17.jpeg", width: 4032, height: 2923, alt: "Project Gallery 17" },
    { id: 418, src: "/images/gallery/project-gallery/project-gallery-18.jpeg", width: 3024, height: 3914, alt: "Project Gallery 18" },
    { id: 419, src: "/images/gallery/project-gallery/project-gallery-19.jpeg", width: 4032, height: 2844, alt: "Project Gallery 19" },
    { id: 420, src: "/images/gallery/project-gallery/project-gallery-20.jpeg", width: 4032, height: 2542, alt: "Project Gallery 20" },
    { id: 421, src: "/images/gallery/project-gallery/project-gallery-21.jpeg", width: 3024, height: 4384, alt: "Project Gallery 21" },
    { id: 422, src: "/images/gallery/project-gallery/project-gallery-22.jpeg", width: 4032, height: 2718, alt: "Project Gallery 22" },
    { id: 423, src: "/images/gallery/project-gallery/project-gallery-23.jpeg", width: 4032, height: 2202, alt: "Project Gallery 23" },
    { id: 424, src: "/images/gallery/project-gallery/project-gallery-24.jpeg", width: 3024, height: 4100, alt: "Project Gallery 24" },
    { id: 425, src: "/images/gallery/project-gallery/project-gallery-26.jpeg", width: 4032, height: 4032, alt: "Project Gallery 25" },
    { id: 426, src: "/images/gallery/project-gallery/project-gallery-27.jpeg", width: 4032, height: 2649, alt: "Project Gallery 26" },
    { id: 427, src: "/images/gallery/project-gallery/project-gallery-28.jpeg", width: 4032, height: 2788, alt: "Project Gallery 27" },
    { id: 428, src: "/images/gallery/project-gallery/project-gallery-29.jpeg", width: 3024, height: 4070, alt: "Project Gallery 28" },
    { id: 429, src: "/images/gallery/project-gallery/project-gallery-30.jpeg", width: 4032, height: 2775, alt: "Project Gallery 29" },
    { id: 430, src: "/images/gallery/project-gallery/project-gallery-31.jpeg", width: 4032, height: 4032, alt: "Project Gallery 30" },
    { id: 431, src: "/images/gallery/project-gallery/project-gallery-32.jpeg", width: 3024, height: 3784, alt: "Project Gallery 31" },
    { id: 432, src: "/images/gallery/project-gallery/project-gallery-33.jpeg", width: 4032, height: 3024, alt: "Project Gallery 32" },
    { id: 433, src: "/images/gallery/project-gallery/project-gallery-34.jpeg", width: 4032, height: 3345, alt: "Project Gallery 33" },
    { id: 434, src: "/images/gallery/project-gallery/project-gallery-35.jpeg", width: 3024, height: 3978, alt: "Project Gallery 34" },
    { id: 435, src: "/images/gallery/project-gallery/project-gallery-36.jpeg", width: 3024, height: 4057, alt: "Project Gallery 35" },
    { id: 436, src: "/images/gallery/project-gallery/project-gallery-37.jpeg", width: 4032, height: 2599, alt: "Project Gallery 36" },
    { id: 437, src: "/images/gallery/project-gallery/project-gallery-38.jpeg", width: 3024, height: 4032, alt: "Project Gallery 37" },
    { id: 438, src: "/images/gallery/project-gallery/project-gallery-39.jpeg", width: 4032, height: 3024, alt: "Project Gallery 38" },
    { id: 439, src: "/images/gallery/project-gallery/project-gallery-40.jpeg", width: 3024, height: 3725, alt: "Project Gallery 39" },
    { id: 440, src: "/images/gallery/project-gallery/project-gallery-41.jpeg", width: 3024, height: 4032, alt: "Project Gallery 40" },
    { id: 441, src: "/images/gallery/project-gallery/project-gallery-42.jpeg", width: 4032, height: 3109, alt: "Project Gallery 41" },
    { id: 442, src: "/images/gallery/project-gallery/project-gallery-43.jpeg", width: 4032, height: 2655, alt: "Project Gallery 42" },
    { id: 443, src: "/images/gallery/project-gallery/project-gallery-44.jpeg", width: 4032, height: 2649, alt: "Project Gallery 43" },
    { id: 444, src: "/images/gallery/project-gallery/project-gallery-45.jpeg", width: 4032, height: 3437, alt: "Project Gallery 44" },
    { id: 445, src: "/images/gallery/project-gallery/project-gallery-46.jpeg", width: 4032, height: 3109, alt: "Project Gallery 45" },
    { id: 446, src: "/images/gallery/project-gallery/project-gallery-47.jpeg", width: 4032, height: 3194, alt: "Project Gallery 46" },
    { id: 447, src: "/images/gallery/project-gallery/project-gallery-48.jpeg", width: 3024, height: 3027, alt: "Project Gallery 47" },
    { id: 448, src: "/images/gallery/project-gallery/project-gallery-49.jpeg", width: 3024, height: 4032, alt: "Project Gallery 48" },
    { id: 449, src: "/images/gallery/project-gallery/project-gallery-50.jpeg", width: 4032, height: 3175, alt: "Project Gallery 49" },
    { id: 450, src: "/images/gallery/project-gallery/project-gallery-51.jpeg", width: 4032, height: 2829, alt: "Project Gallery 50" },
    { id: 451, src: "/images/gallery/project-gallery/project-gallery-52.jpeg", width: 4032, height: 2092, alt: "Project Gallery 51" },
    { id: 452, src: "/images/gallery/project-gallery/project-gallery-53.jpeg", width: 3024, height: 4268, alt: "Project Gallery 52" },
    { id: 453, src: "/images/gallery/project-gallery/project-gallery-54.jpeg", width: 3024, height: 3867, alt: "Project Gallery 53" },
    { id: 454, src: "/images/gallery/project-gallery/project-gallery-55.jpeg", width: 4032, height: 4032, alt: "Project Gallery 54" },
    { id: 455, src: "/images/gallery/project-gallery/project-gallery-56.jpeg", width: 3024, height: 3679, alt: "Project Gallery 55" },
    { id: 456, src: "/images/gallery/project-gallery/project-gallery-57.jpeg", width: 3024, height: 3814, alt: "Project Gallery 56" },
    { id: 457, src: "/images/gallery/project-gallery/project-gallery-58.jpeg", width: 3024, height: 4241, alt: "Project Gallery 57" },
    { id: 458, src: "/images/gallery/project-gallery/project-gallery-59.jpeg", width: 4032, height: 3024, alt: "Project Gallery 58" },
    { id: 459, src: "/images/gallery/project-gallery/project-gallery-60.jpeg", width: 4032, height: 3244, alt: "Project Gallery 59" },
    { id: 460, src: "/images/gallery/project-gallery/project-gallery-61.jpeg", width: 3024, height: 3384, alt: "Project Gallery 60" },
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
    'project-gallery': {
        collectionLabel: 'Collection V',
        shortTitle: 'Project Gallery',
        breadcrumb: 'PROJECT GALLERY',
        headingLines: ['THE', 'PROJECT GALLERY'],
        coverImage: '/images/gallery/project-gallery/project-gallery-8.jpeg',
        coverAlt: 'Project Gallery Cover',
        portalDescription:
            'Mixed-media studio explorations across pencil, colored pencil, collage, painting, and alcohol ink.',
        statement: (
            <>
                A tactile studio exploration across <strong>pencil, colored pencil, collage, painting, and alcohol ink</strong>—celebrating texture, mark-making, and the joy of creative experimentation.
            </>
        ),
        photos: projectGalleryPhotos,
    },
};

const PORTAL_ORDER: GalleryCategory[] = ['icm', 'bw', 'panhock', 'look-closer', 'project-gallery'];

interface SubGalleryViewProps {
    activeCategory: GalleryCategory;
    onBack: () => void;
}

function SubGalleryView({ activeCategory, onBack }: SubGalleryViewProps) {
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    const meta = GALLERY_META[activeCategory];
    const activePhotos = meta.photos;

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
                        {/* Clean Minimalist Breadcrumb */}
                        <div className={styles.breadcrumb}>
                            <button
                                type="button"
                                className={styles.breadcrumbLink}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    onBack();
                                }}
                            >
                                ← COLLECTIONS
                            </button>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>
                                {meta.breadcrumb}
                            </span>
                        </div>

                        <h1 className={styles.galleryTitle}>
                            {meta.headingLines[0]}
                            <br />
                            {meta.headingLines[1]}
                        </h1>

                        <p className={styles.artistStatement}>{meta.statement}</p>
                    </motion.div>
                </div>

                {/* Unified Full-Stage Single-Column Exhibition matching ICM Gallery dimensions */}
                <div className={styles.singleStageContainer}>
                    {activePhotos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            className={styles.singleStageItem}
                            initial={{ opacity: 0, y: 50 }}
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
                                    sizes="(max-width: 768px) 94vw, 1060px"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
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
                            [X] CLOSE
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
    return <SubGalleryView activeCategory={activeCategory} onBack={handleBack} />;
}
