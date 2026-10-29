'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
    MapPin, 
    ExternalLink, 
    Maximize2, 
    Minimize2, 
    ArrowRight 
} from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import IcmUndulatingBackground from '@/components/IcmUndulatingBackground';

const SPOTLIGHT_STORY = {
    edition: 'EDITION NO. 00',
    title: 'Greetings from Kenosha Mural',
    address: '5500 Sixth Avenue, Downtown Kenosha',
    rawImage: '/images/kenosha/original-00-mural.jpg',
    postcardImage: '/images/kenosha/poster-00-mural.jpg',
    dispatchUrl: 'https://whereimaginationtakesflight.substack.com/s/greetings-from-kenosha',
    coordinates: '42.5847° N, 87.8212° W',
};

{/* Bespoke Thematic Vintage Icons (Replacing generic Lucide icons) */}

{/* 1. Historic Kenosha PCC Electric Streetcar */}
function PccStreetcarIcon({ className = 'w-6 h-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            {/* Trolley Pole & Contact Shoe */}
            <path d="M12 4V1" />
            <path d="M9 1h6" />
            <path d="M12 4l3 3" />
            {/* Streamlined Streetcar Body */}
            <rect x="4" y="6" width="16" height="13" rx="3" />
            {/* Front & Side Windows */}
            <line x1="4" y1="11" x2="20" y2="11" />
            <line x1="9" y1="6" x2="9" y2="11" />
            <line x1="15" y1="6" x2="15" y2="11" />
            {/* Round Headlight */}
            <circle cx="12" cy="15" r="1.5" fill="currentColor" fillOpacity="0.2" />
            {/* Bumper */}
            <line x1="3" y1="19" x2="21" y2="19" strokeWidth="2.2" />
            {/* Steel Tracks */}
            <line x1="7" y1="22" x2="9" y2="19" />
            <line x1="17" y1="22" x2="15" y2="19" />
            <line x1="2" y1="22" x2="22" y2="22" strokeDasharray="2 2" />
        </svg>
    );
}

{/* 2. Historic Southport Lighthouse Tower on Lake Michigan */}
function SouthportLighthouseIcon({ className = 'w-6 h-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            {/* Beacon Light Rays */}
            <line x1="4" y1="4" x2="2" y2="3" />
            <line x1="20" y1="4" x2="22" y2="3" />
            {/* Lantern Room Dome */}
            <path d="M9 7h6" />
            <path d="M10 7a2 2 0 0 1 4 0" />
            <rect x="9.5" y="4" width="5" height="3" fill="currentColor" fillOpacity="0.15" />
            {/* Gallery Walkway Railing */}
            <line x1="8" y1="7" x2="16" y2="7" strokeWidth="2" />
            {/* Tapered Brick Tower */}
            <path d="M9 7l-2 12h10l-2-12" />
            {/* Tower Windows */}
            <circle cx="12" cy="11" r="1" fill="currentColor" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
            {/* Lake Michigan Waves Base */}
            <path d="M5 19h14" strokeWidth="2" />
            <path d="M2 22c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
        </svg>
    );
}

{/* 3. Kenosha Public Museums Classical Portico Facade */}
function KenoshaMuseumIcon({ className = 'w-6 h-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            {/* Classical Pediment Gable */}
            <path d="M2 9l10-6 10 6H2z" fill="currentColor" fillOpacity="0.1" />
            <line x1="2" y1="9" x2="22" y2="9" strokeWidth="2" />
            {/* 4 Classical Columns */}
            <line x1="5" y1="9" x2="5" y2="18" />
            <line x1="9.5" y1="9" x2="9.5" y2="18" />
            <line x1="14.5" y1="9" x2="14.5" y2="18" />
            <line x1="19" y1="9" x2="19" y2="18" />
            {/* Grand Entrance Steps */}
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" />
            <line x1="1" y1="21" x2="23" y2="21" strokeWidth="2" />
        </svg>
    );
}

{/* 4. The Ethos: Open Field Journal with Ruled Pages */}
function FieldJournalIcon({ className = 'w-5 h-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M2 6c3-1.5 6-1 10 1 4-2 7-2.5 10-1v13c-3-1.5-6-1-10 1-4-2-7-2.5-10-1V6z" fill="currentColor" fillOpacity="0.08" />
            <line x1="12" y1="7" x2="12" y2="20" strokeWidth="2" />
            <line x1="5" y1="10" x2="9" y2="10" />
            <line x1="5" y1="13" x2="9" y2="13" />
            <line x1="15" y1="10" x2="19" y2="10" />
            <line x1="15" y1="13" x2="19" y2="13" />
        </svg>
    );
}

{/* 5. The Cadence: Vintage Postcard Deck */}
function VintagePostcardIcon({ className = 'w-5 h-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <rect x="5" y="3" width="16" height="12" rx="1.5" opacity="0.4" />
            <rect x="3" y="6" width="18" height="14" rx="1.5" fill="currentColor" fillOpacity="0.08" />
            <line x1="12" y1="8" x2="12" y2="18" strokeDasharray="1.5 1.5" />
            <rect x="16" y="8" width="3.5" height="4" rx="0.5" strokeDasharray="1 1" />
            <line x1="14" y1="14" x2="19" y2="14" />
            <line x1="14" y1="16.5" x2="19" y2="16.5" />
        </svg>
    );
}

{/* 6. Civic Pledge: WPA Civic Heritage Shield */}
function HeritagePledgeIcon({ className = 'w-5 h-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.1" />
            <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5L12 7z" fill="currentColor" />
        </svg>
    );
}

{/* 7. Vintage Table of Contents Compass */}
function VintageCompassIcon({ className = 'w-4 h-4' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <polygon points="12 4 14.5 11 12 10 9.5 11" fill="currentColor" />
            <polygon points="12 20 14.5 13 12 14 9.5 13" fill="currentColor" fillOpacity="0.4" />
        </svg>
    );
}

{/* Authentic Rubber Postal Cancellation Stamp (Feb 8, 1850) in Weathered Chalk White */}
function AuthenticPostmark({ className = '' }: { className?: string }) {
    return (
        <div className={`relative inline-block select-none pointer-events-none -rotate-[1.5deg] ${className}`}>
            <Image
                src="/images/kenosha/authentic-postmark-white-perfect.png"
                alt="Greetings from Kenosha Feb 8 1850 Postmark"
                width={180}
                height={118}
                className="w-36 sm:w-44 h-auto object-contain opacity-95 drop-shadow-md"
            />
        </div>
    );
}

{/* Authentic Symmetrical Perforated Postage Stamp with Equidistant White Border */}
function AuthenticPostageStamp({ className = '' }: { className?: string }) {
    return (
        <div className={`relative inline-block select-none pointer-events-none rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 drop-shadow-xl ${className}`}>
            <Image
                src="/images/kenosha/authentic-stamp-perfect-symmetrical.png"
                alt="Greetings from Kenosha Official Postcard Stamp"
                width={164}
                height={195}
                className="w-24 sm:w-28 h-auto object-contain drop-shadow-2xl"
            />
        </div>
    );
}

{/* Authentic Postal Duo: Imperfect White Cancellation Stamp + Symmetrical Perforated Postage Stamp */}
function AuthenticPostalLockup({ className = '' }: { className?: string }) {
    return (
        <div className={`relative inline-block select-none pointer-events-none -rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 drop-shadow-xl ${className}`}>
            <Image
                src="/images/kenosha/authentic-postal-lockup-white-overlap.png"
                alt="Greetings from Kenosha Feb 8 1850 Postmark and Official Postage Stamp"
                width={299}
                height={205}
                className="w-52 sm:w-64 md:w-72 h-auto object-contain drop-shadow-2xl"
            />
        </div>
    );
}

{/* Vintage Diagonal Airmail Piping Ribbon */}
function AirmailRibbon({ className = '' }: { className?: string }) {
    return (
        <div 
            className={`w-full h-2 rounded-t-xl ${className}`}
            style={{
                backgroundImage: 'repeating-linear-gradient(135deg, #b34728 0, #b34728 12px, #f4eedb 12px, #f4eedb 20px, #1b263b 20px, #1b263b 32px, #f4eedb 32px, #f4eedb 40px)',
            }}
        />
    );
}

export default function GreetingsClient() {
    const [splitPosition, setSplitPosition] = useState<number>(50);
    const [viewMode, setViewMode] = useState<'slider' | 'photo' | 'postcard'>('slider');
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const mapCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (mapCardRef.current?.requestFullscreen) {
                    await mapCardRef.current.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                }
            }
        } catch (err) {
            console.error('Fullscreen toggle error:', err);
        }
    };

    const scrollToMap = () => {
        const el = document.getElementById('kenosha-map');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen bg-transparent text-[#ededed] font-sans antialiased selection:bg-[#d4a359] selection:text-black pb-28 relative">
            <Header />

            {/* Living ICM Undulating Gaussian Blur Background */}
            <IcmUndulatingBackground />

            {/* Aged Weathered Linen Texture & Ambient Vignette Overlays */}
            <div 
                className="fixed inset-0 pointer-events-none z-30 opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: 'url(/images/kenosha/linen-texture.jpg)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '320px 320px',
                }}
            />
            <div 
                className="fixed inset-0 pointer-events-none z-20 opacity-50"
                style={{
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(10, 8, 6, 0.75) 100%)',
                }}
            />

            {/* 1. Header Area with Mid-Century Modern Aesthetic & Project Seal */}
            <header className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-black/30 via-black/15 to-transparent">
                {/* Mid-century geometric architectural grid accent */}
                <div className="absolute inset-0 pointer-events-none opacity-15">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                </div>

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    {/* Official Project Moving Logo Video */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-[0_0_35px_rgba(212,163,89,0.35)] border-2 border-[#d4a359]/70 bg-black flex items-center justify-center transition-transform hover:scale-105 duration-300">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                disablePictureInPicture
                                className="w-full h-full object-cover scale-[0.90] pointer-events-none rounded-full"
                                poster="/images/kenosha/logo-clean-black-poster.jpg"
                                aria-label="Greetings from Kenosha Animated Logo"
                            >
                                <source src="/images/kenosha/logo-banner-clean-black.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>

                    {/* Top vintage badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#d4a359]/30 bg-[#2c1e14]/50 backdrop-blur-md mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#d4a359] animate-pulse" />
                        <span className="text-xs uppercase tracking-[0.25em] text-[#d4a359] font-medium">
                            A Love Letter to Community, History & Human Stories
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase mb-6 font-sans drop-shadow-md">
                        Greetings from <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a359] via-[#e09f3e] to-[#b34728]">Kenosha</span>
                    </h1>

                    {/* Mid-Century Decorative Divider */}
                    <div className="flex items-center justify-center gap-3 my-6">
                        <div className="h-[2px] w-16 bg-[#b34728]" />
                        <div className="w-2.5 h-2.5 rotate-45 bg-[#d4a359]" />
                        <div className="h-[2px] w-28 bg-[#003b36]" />
                        <div className="w-2.5 h-2.5 rotate-45 bg-[#d4a359]" />
                        <div className="h-[2px] w-16 bg-[#b34728]" />
                    </div>

                    <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#c4b5a5] max-w-2xl mx-auto font-medium">
                        Vintage WPA-Inspired Art · Field Journal Dispatches · Living Cartography by Todd Burleson
                    </p>
                </div>
            </header>

            {/* 2. Centralized Text Block (Styled as an Authentic Archival Postcard Letter) */}
            <section className="relative py-16 md:py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-2xl bg-gradient-to-b from-[#1a1714]/85 via-[#141210]/80 to-[#110f0d]/85 backdrop-blur-md border border-[#d4a359]/30 shadow-2xl overflow-hidden">
                        {/* Airmail Ribbon Accent */}
                        <AirmailRibbon />

                        {/* Card Content with Linen Texture Wash */}
                        <div className="relative p-8 md:p-14">
                            {/* Authentic Postal Cancellation and Custom Postage Stamp from Postcard Back */}
                            <div className="absolute top-8 right-6 hidden md:block">
                                <AuthenticPostalLockup />
                            </div>

                            {/* Decorative Mid-Century Teak & Ochre Corner Notches */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d4a359]" />
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#b34728]" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#003b36]" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d4a359]" />

                            {/* Wood Tone Bar Accent */}
                            <div className="h-1.5 w-24 bg-gradient-to-r from-[#8b5a2b] via-[#d4a359] to-[#b34728] rounded-full mb-8" />

                            <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.25em] text-[#d4a359] font-semibold pr-0 md:pr-72">
                                <FieldJournalIcon className="w-4 h-4 text-[#d4a359]" />
                                <span>A Curious Neighbor&apos;s Love Letter to Kenosha</span>
                            </div>

                            {/* Manifesto Text */}
                            <div className="space-y-6 text-base sm:text-lg md:text-xl text-[#f5ebd7] font-normal leading-relaxed md:leading-relaxed font-sans">
                                <p className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-snug pr-0 md:pr-72">
                                    &ldquo;Greetings from Kenosha&rdquo; is not just about creating vintage postcards. It is a love letter to the place I call home.
                                </p>

                                <p>
                                    Six months ago, we moved downtown after years of living in central Kenosha. Walking these streets every day became an act of discovery. As a creator, I don&apos;t confine myself to any single medium. Whether through writing, photography, painting, sculpture, or collage, I work from the inside out to express what is deeply felt. But walking, wandering, and wondering through this new neighborhood did something unexpected: it helped me get to know myself, my community, and my neighbors on a whole new level.
                                </p>

                                <p>
                                    By nature, I am very introverted. Yet this project gave me a reason and a quiet courage to walk right into a local shop, historic business, or landmark, introduce myself, ask questions, and listen. The vintage postcards, sparked by a lifelong fascination with 1930s WPA posters and Kenosha&apos;s own downtown mural traditions, became the creative gateway to those conversations.
                                </p>

                                <p>
                                    Each piece begins with deliberate mobile photography, capturing the weathered brick, lakefront light, and architectural soul of our city. But the visual is only the invitation. I gather the memories of the people I meet, dig deep into local archives, and let the photos, research, and human voices marinate, shake, and stir until a narrative emerges.
                                </p>

                                <p>
                                    I chronicle these human stories through two Field Journal dispatches every week, charting what will become close to one hundred stops across downtown Kenosha on an interactive living map. To give back to the community that inspires me, a significant portion of all artwork sales is pledged directly to the Kenosha History Center, Kenosha Public Museums, and the Kenosha Streetcar Society.
                                </p>

                                <p className="text-[#d4a359] font-medium pt-2">
                                    This work is demanding, deeply personal, and profoundly fulfilling: a tribute to Kenosha, to storytelling rooted in place, and to the human connections waiting on every corner if we simply look closer.
                                </p>
                            </div>

                            {/* Mid-Century Metadata Badges */}
                            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-black/50 border border-white/10 shadow-sm">
                                    <FieldJournalIcon className="w-5 h-5 text-[#d4a359] shrink-0" />
                                    <div>
                                        <div className="font-semibold text-white uppercase tracking-wider">The Ethos</div>
                                        <div className="text-neutral-400">Walking, Wandering & Wondering</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-black/50 border border-white/10 shadow-sm">
                                    <VintagePostcardIcon className="w-5 h-5 text-[#4fd1c5] shrink-0" />
                                    <div>
                                        <div className="font-semibold text-white uppercase tracking-wider">The Cadence</div>
                                        <div className="text-neutral-400">2 Dispatches / Wk · ~100 Stops</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-black/50 border border-white/10 shadow-sm">
                                    <HeritagePledgeIcon className="w-5 h-5 text-[#b34728] shrink-0" />
                                    <div>
                                        <div className="font-semibold text-white uppercase tracking-wider">Civic Pledge</div>
                                        <div className="text-neutral-400">3 Local Heritage Trusts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Spotlight Story: The Anatomy of a Dispatch */}
            <section className="relative py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Section Eyebrow & Title */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4a359]/30 bg-[#2c1e14]/50 text-[#d4a359] text-xs uppercase tracking-[0.2em] font-medium mb-4">
                        <VintagePostcardIcon className="w-3.5 h-3.5 text-[#d4a359]" />
                        <span>The Anatomy of a Dispatch</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-4">
                        From Street Corner to Story
                    </h2>
                    <p className="text-neutral-300 text-base md:text-lg">
                        See how a deliberate mobile capture on foot transforms into a vintage linen postcard, opening the door to the human lives and archival histories behind the landmark.
                    </p>
                </div>

                {/* Spotlight Feature Card with Vintage Postcard Styling */}
                <article className="relative rounded-3xl bg-gradient-to-b from-[#1b1714]/85 via-[#141210]/80 to-[#100e0d]/85 backdrop-blur-md border border-[#d4a359]/30 shadow-2xl overflow-hidden">
                    {/* Top Airmail Trim */}
                    <AirmailRibbon />

                    <div className="p-6 sm:p-8 md:p-12 relative">
                        {/* Authentic Postage Stamp from Postcard Back */}
                        <div className="absolute top-8 right-8 hidden sm:block">
                            <AuthenticPostageStamp />
                        </div>

                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 pr-0 sm:pr-28">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-[0.2em] uppercase bg-[#b34728] text-white">
                                        {SPOTLIGHT_STORY.edition}
                                    </span>
                                    <span className="text-xs font-mono text-[#d4a359] flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4a359]" />
                                        {SPOTLIGHT_STORY.address}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                                    {SPOTLIGHT_STORY.title}
                                </h3>
                            </div>

                            {/* View Mode Presets */}
                            <div className="flex items-center gap-2 bg-black/60 p-1 rounded-xl border border-white/10 self-start sm:self-auto shadow-inner">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setViewMode('photo');
                                        setSplitPosition(0);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                                        viewMode === 'photo'
                                            ? 'bg-[#d4a359] text-black shadow'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    Raw Capture
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setViewMode('slider');
                                        setSplitPosition(50);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                                        viewMode === 'slider'
                                            ? 'bg-[#d4a359] text-black shadow'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    Split View
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setViewMode('postcard');
                                        setSplitPosition(100);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                                        viewMode === 'postcard'
                                            ? 'bg-[#d4a359] text-black shadow'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    Vintage Postcard
                                </button>
                            </div>
                        </div>

                        {/* Content Grid: Left Visual Interactive Slider, Right Narrative */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            {/* Left: Visual Interactive Canvas */}
                            <div className="lg:col-span-7">
                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/90 border border-[#d4a359]/30 shadow-2xl select-none group">
                                    {/* Bottom Layer: Final Postcard */}
                                    <Image
                                        src={SPOTLIGHT_STORY.postcardImage}
                                        alt="Greetings from Kenosha Mural Finished Postcard"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover"
                                        priority
                                    />

                                    {/* Top Layer: Raw Photo (clipped by splitPosition when in slider mode, or full when in photo mode) */}
                                    {(viewMode === 'slider' || viewMode === 'photo') && (
                                        <div
                                            className="absolute inset-0 overflow-hidden"
                                            style={{
                                                clipPath:
                                                    viewMode === 'photo'
                                                        ? 'inset(0 0 0 0)'
                                                        : `inset(0 ${100 - splitPosition}% 0 0)`,
                                            }}
                                        >
                                            <Image
                                                src={SPOTLIGHT_STORY.rawImage}
                                                alt="Greetings from Kenosha Mural Raw Mobile Capture"
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    )}

                                    {/* Interactive Divider Line & Handle (only in slider mode) */}
                                    {viewMode === 'slider' && (
                                        <>
                                            <div
                                                className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#d4a359] via-white to-[#d4a359] pointer-events-none shadow-[0_0_15px_rgba(212,163,89,0.8)]"
                                                style={{ left: `${splitPosition}%` }}
                                            />
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#d4a359] text-black font-bold flex items-center justify-center shadow-2xl pointer-events-none border-2 border-white text-[11px]"
                                                style={{ left: `${splitPosition}%` }}
                                            >
                                                ◀▶
                                            </div>
                                        </>
                                    )}

                                    {/* Floating Corner Badges */}
                                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/85 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md border border-white/10 shadow">
                                        Raw Mobile Capture
                                    </div>
                                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/85 text-[10px] font-bold text-[#d4a359] uppercase tracking-wider backdrop-blur-md border border-[#d4a359]/40 shadow">
                                        Postcard Edition No. 00
                                    </div>
                                </div>

                                {/* Range Slider Scrubber */}
                                {viewMode === 'slider' && (
                                    <div className="mt-4 px-2 flex items-center gap-4">
                                        <span className="text-xs font-mono text-neutral-400">Photo</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={splitPosition}
                                            onChange={(e) => setSplitPosition(Number(e.target.value))}
                                            className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4a359]"
                                            aria-label="Compare original capture with finished postcard"
                                        />
                                        <span className="text-xs font-mono text-[#d4a359]">Postcard</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Narrative, Archival Discovery & Call to Action */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div>
                                    <div className="text-xs uppercase tracking-[0.25em] text-[#d4a359] font-semibold mb-2 flex items-center gap-2">
                                        <FieldJournalIcon className="w-3.5 h-3.5 text-[#d4a359]" />
                                        <span>Where the Walking Began</span>
                                    </div>
                                    <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                                        The Spark on Sixth Avenue
                                    </h4>
                                </div>

                                <p className="text-sm sm:text-base text-[#e2d9cd] leading-relaxed">
                                    Painted by Kelly Witte on reclaimed brick at 5500 Sixth Avenue, this vibrant community mural features bold letterforms packed with iconic Kenosha symbols: the harbor lighthouse, historic streetcars, and Lake Michigan waves. Walking past it daily after moving downtown, Todd found the visual spark that inspired this entire project.
                                </p>

                                <p className="text-sm sm:text-base text-[#e2d9cd] leading-relaxed">
                                    But the postcard is only the visual invitation. From this street corner, Todd dove into local archives and oral histories to uncover the deeper story of Sixth Avenue: the people who built the downtown shops, the workers who rode the electric streetcars to manufacturing shifts, and the community members who keep this corridor vibrant today.
                                </p>

                                {/* Action Buttons */}
                                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={SPOTLIGHT_STORY.dispatchUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d4a359] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e09f3e] transition-colors shadow-lg"
                                    >
                                        <span>Read Field Journal on Substack</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>

                                    <button
                                        type="button"
                                        onClick={scrollToMap}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/60 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 border border-white/20 transition-colors shadow"
                                    >
                                        <MapPin className="w-4 h-4 text-[#4fd1c5]" />
                                        <span>Locate on Interactive Map</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            {/* 4. Full-Width Container for Interactive Map Embed (Living Table of Contents) */}
            <section id="kenosha-map" className="relative py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
                <div 
                    ref={mapCardRef}
                    className={`rounded-3xl bg-gradient-to-b from-[#181d24]/90 via-[#12151b]/85 to-[#0e1015]/90 backdrop-blur-md border border-white/15 shadow-2xl overflow-hidden transition-all duration-300 ${
                        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col' : ''
                    }`}
                >
                    {/* Airmail Trim on Map Header */}
                    <AirmailRibbon />

                    {/* Mid-Century Modern Map Header Bar */}
                    <div className="p-6 md:p-8 bg-gradient-to-r from-[#1b263b]/90 via-[#0d1b2a]/85 to-[#141419]/90 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#003b36] bg-[#003b36]/40 text-[#4fd1c5] text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                                <VintageCompassIcon className="w-3.5 h-3.5 text-[#4fd1c5]" />
                                <span>The Project Table of Contents</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                                Interactive Kenosha Landmarks Map
                            </h2>
                            <p className="text-neutral-300 text-sm mt-1 max-w-2xl">
                                This interactive map serves as the living table of contents for the entire project. Pinpoint the geographic coordinates of every vintage postcard edition, historic building, and field journal dispatch across downtown Kenosha and Simmons Island.
                            </p>
                        </div>

                        {/* Interactive Fullscreen and Standalone Map Controls */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a359] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e09f3e] transition-colors shadow-lg cursor-pointer"
                                title={isFullscreen ? 'Exit Fullscreen' : 'Open Fullscreen Map'}
                            >
                                {isFullscreen ? (
                                    <>
                                        <Minimize2 className="w-4 h-4" />
                                        <span>Exit Fullscreen</span>
                                    </>
                                ) : (
                                    <>
                                        <Maximize2 className="w-4 h-4" />
                                        <span>Expand Fullscreen Map</span>
                                    </>
                                )}
                            </button>
                            <a
                                href="https://burlesot1969.github.io/greetingsfromkenosha/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/20 transition-colors border border-white/10"
                                title="Open standalone map in new tab"
                            >
                                <span>New Tab</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Direct Live Map View (Curtain bypassed with ?skipIntro=true) */}
                    <div className={`relative w-full bg-[#0a0a0c] border-t border-b border-white/5 ${isFullscreen ? 'flex-1 h-full' : ''}`}>
                        {!isFullscreen && (
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-[#d4a359] hover:text-white border border-[#d4a359]/40 hover:border-[#d4a359] text-xs font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all cursor-pointer"
                            >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Click to Expand Fullscreen</span>
                            </button>
                        )}
                        <iframe 
                            src="https://burlesot1969.github.io/greetingsfromkenosha/?skipIntro=true" 
                            width="100%" 
                            height={isFullscreen ? '100%' : '650'} 
                            frameBorder="0" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            aria-hidden="false" 
                            tabIndex={0}
                            title="Greetings from Kenosha Interactive Map"
                            className={`w-full ${isFullscreen ? 'h-full flex-1' : 'h-[600px] md:h-[650px]'} block`}
                        />
                    </div>

                    {/* Mid-Century Bottom Trim & Coordinates Bar */}
                    <div className="p-4 md:p-6 bg-[#0e0e12] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-white">Active Map Feed · Edition Coordinates 42.5847° N, 87.8212° W</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[#d4a359]">Lake Michigan Shoreline</span>
                            <span>·</span>
                            <span className="text-[#4fd1c5]">Simmons Island</span>
                            <span>·</span>
                            <span className="text-[#f687b3]">Downtown Historic District</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heritage Preservation Beneficiaries & Community Pledges */}
            <section className="relative py-16 md:py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#b34728]/40 bg-[#b34728]/20 text-[#f687b3] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                        <HeritagePledgeIcon className="w-3.5 h-3.5" />
                        <span>Cultural Safeguarding</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                        Preserving Kenosha&apos;s Rich Heritage
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-base mt-2">
                        A significant portion of all artwork sales is pledged directly to safeguard the city’s architectural and historical treasures.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Partner 1: Kenosha History Center */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181614]/85 to-[#12100e]/85 backdrop-blur-md border border-[#d4a359]/30 hover:border-[#d4a359] transition-all duration-300 shadow-md">
                        <div className="w-12 h-12 rounded-xl bg-[#2c1e14] text-[#d4a359] flex items-center justify-center font-bold text-lg mb-4 border border-[#d4a359]/20 shadow-inner">
                            <SouthportLighthouseIcon className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Kenosha History Center</h4>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                            Safeguarding Kenosha’s maritime soul, Simmons Island archives, and historic Rambler automotive legacy on the shores of Lake Michigan.
                        </p>
                    </div>

                    {/* Partner 2: Kenosha Public Museums */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#131b1a]/85 to-[#0e1413]/85 backdrop-blur-md border border-[#003b36] hover:border-[#4fd1c5] transition-all duration-300 shadow-md">
                        <div className="w-12 h-12 rounded-xl bg-[#003b36]/40 text-[#4fd1c5] flex items-center justify-center font-bold text-lg mb-4 border border-[#003b36] shadow-inner">
                            <KenoshaMuseumIcon className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Kenosha Public Museums</h4>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                            Supporting cultural exhibits, the Civil War Museum, and the Dinosaur Discovery Museum in their mission of public education and paleontological research.
                        </p>
                    </div>

                    {/* Partner 3: Kenosha Streetcar Society */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1b1513]/85 to-[#130f0d]/85 backdrop-blur-md border border-[#b34728]/40 hover:border-[#b34728] transition-all duration-300 shadow-md">
                        <div className="w-12 h-12 rounded-xl bg-[#b34728]/20 text-[#b34728] flex items-center justify-center font-bold text-lg mb-4 border border-[#b34728]/30 shadow-inner">
                            <PccStreetcarIcon className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Kenosha Streetcar Society</h4>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                            Maintaining the authentic historic PCC electric streetcars connecting Kenosha’s Metra station, historic harbors, and Lake Michigan beaches.
                        </p>
                    </div>
                </div>

                {/* Field Journals Callout Banner with Postcard Styling */}
                <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#1c140d]/85 via-[#141210]/80 to-[#002622]/85 backdrop-blur-md border border-[#d4a359]/40 overflow-hidden shadow-2xl">
                    <AirmailRibbon />
                    <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="text-xs font-mono text-[#d4a359] uppercase tracking-widest mb-1">
                                Published Twice Weekly on Substack
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-white">
                                Read the &ldquo;Greetings from Kenosha&rdquo; Field Journals
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                                Dispatches from Todd Burleson’s Substack, <em>Where Imagination Takes Flight</em>, exploring the human stories, oral histories, and archival discoveries behind each landmark.
                            </p>
                        </div>
                        <a
                            href="https://whereimaginationtakesflight.substack.com/s/greetings-from-kenosha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#d4a359] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e09f3e] transition-colors shrink-0 shadow-lg"
                        >
                            <span>Explore Field Journals</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Global Bottom Navigation */}
            <Navigation />
        </main>
    );
}
