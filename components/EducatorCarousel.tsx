'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: 'The Teacher Companion',
        src: '/images/educator-slide-1.jpg',
        fallback: 'https://placehold.co/1200x800/111111/EDEDED?text=Educator+Toolkit+-+Slide+1'
    },
    {
        id: 2,
        title: 'Resource Pack',
        src: '/images/educator-slide-2.jpg',
        fallback: 'https://placehold.co/1200x800/111111/EDEDED?text=Educator+Toolkit+-+Slide+2'
    },
    {
        id: 3,
        title: 'Book Club Guide',
        src: '/images/educator-slide-3.jpg',
        fallback: 'https://placehold.co/1200x800/111111/EDEDED?text=Educator+Toolkit+-+Slide+3'
    }
];

export default function EducatorCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
        Autoplay({ delay: 6000, stopOnInteraction: false })
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleAutoplay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        const playOrPause = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
        playOrPause();
        setIsPlaying(autoplay.isPlaying());
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative w-full max-w-5xl mx-auto group">
            <div className="overflow-hidden rounded-xl shadow-2xl border border-white/10 relative bg-black/50" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="flex-[0_0_100%] min-w-0 relative aspect-[16/10] md:aspect-[16/9] flex items-center justify-center bg-zinc-900"
                        >
                            <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                className="object-cover transition-opacity duration-500"
                                onError={(e) => {
                                    // Fallback to placeholder if the user hasn't added the real image yet
                                    e.currentTarget.src = slide.fallback;
                                }}
                            />
                            {/* Optional overlay gradient for readability if needed later */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Play/Pause Button */}
            <button
                onClick={toggleAutoplay}
                className="absolute bottom-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none"
                aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5" />
                ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                )}
            </button>

            {/* Snap Dots */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? 'bg-white scale-125'
                            : 'bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
