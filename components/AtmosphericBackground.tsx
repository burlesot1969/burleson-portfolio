'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FloatingImage {
    id: number;
    src: string;
    left: string;
    width: string;
    duration: string;
    delay: string;
    blendMode: string;
}

export default function AtmosphericBackground() {
    const [images, setImages] = useState<FloatingImage[]>([]);

    useEffect(() => {
        // "Structured Chaos": Hard-coded positions for 10 images
        const configs = [
            { left: '2%', width: 'w-48', duration: '14s', delay: '-5s' },   // 1 (was 18s)
            { left: '12%', width: 'w-96', duration: '20s', delay: '-12s' },  // 2 (was 25s)
            { left: '25%', width: 'w-64', duration: '16s', delay: '-20s' },  // 3 (was 20s)
            { left: '35%', width: 'w-48', duration: '22s', delay: '-8s' },   // 4 (was 28s)
            { left: '45%', width: 'w-80', duration: '17s', delay: '-15s' },  // 5 (was 22s)
            { left: '55%', width: 'w-56', duration: '12s', delay: '-2s' },   // 6 (was 15s)
            { left: '65%', width: 'w-96', duration: '20s', delay: '-25s' },  // 7 (was 26s)
            { left: '75%', width: 'w-48', duration: '17s', delay: '-10s' },  // 8 (was 21s)
            { left: '85%', width: 'w-72', duration: '15s', delay: '-18s' },  // 9 (was 19s)
            { left: '90%', width: 'w-64', duration: '19s', delay: '-4s' },   // 10 (was 24s)
        ];

        const newImages = configs.map((config, i) => {
            const imgIndex = (i % 10) + 1;
            return {
                id: i,
                src: `/images/abstract_${imgIndex}.jpg`,
                left: config.left,
                width: config.width,
                duration: config.duration,
                delay: config.delay,
                blendMode: 'screen', // "mix-blend-screen" for projected light look
            };
        });

        setImages(newImages);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* z-0 to float BEHIND the text */}

            {images.map((img) => (
                <div
                    key={img.id}
                    className={`absolute bottom-0 border border-white/30 ${img.width}`}
                    style={{
                        left: img.left,
                        mixBlendMode: img.blendMode as any,
                        animation: `floatUp ${img.duration} linear infinite`,
                        animationDelay: img.delay,
                        aspectRatio: '3/4',
                    }}
                >
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src={img.src}
                            alt=""
                            fill
                            className="object-cover saturate-[2.5] brightness-125" // "Hyper-vibrant"
                            priority={img.id < 5}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
