'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import EducatorCarousel from '@/components/EducatorCarousel';
import styles from './secret-war.module.css';

export default function SecretWar() {
    const tiltWrapperRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    useEffect(() => {
        // 1. Scroll Reveal Animation for generic elements
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const currentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.scrollRevealVisible);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observerRef.current = currentObserver;

        document.querySelectorAll(`.${styles.scrollReveal}`).forEach(el => {
            currentObserver.observe(el);
        });

        // 2. 3D Tilt Effect on Hero Image
        const handleMouseMove = (e: MouseEvent) => {
            if (!tiltWrapperRef.current) return;
            const x = window.innerWidth / 2 - e.pageX;
            const y = window.innerHeight / 2 - e.pageY;

            const rotateX = Math.max(-10, Math.min(10, y / 50));
            const rotateY = Math.max(-10, Math.min(10, -x / 50));

            if (window.scrollY < window.innerHeight) {
                tiltWrapperRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        };

        const handleScroll = () => {
            if (window.scrollY > window.innerHeight / 2 && tiltWrapperRef.current) {
                tiltWrapperRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            currentObserver.disconnect();
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className={styles.secretWarContainer}>
            <div className={styles.noiseOverlay}></div>

            {/* Background Realistic Smoke Video */}
            <div className={styles.smokeVideoWrapper}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.smokeVideo}
                >
                    <source src="/videos/smoke.mp4" type="video/mp4" />
                </video>
            </div>

            <Header />

            <main>
                {/* Hero Section */}
                <section id="hero" className={`${styles.hero} ${styles.fadeInUp} pt-32`}>
                    <div className={styles.heroContent}>
                        <div className={styles.clearanceBadge}>[ TOP SECRET // CLEARANCE REQUIRED ]</div>
                        <h1 className={styles.heroTitle}>THE<br />SECRET<br /><span className={styles.accent}>WAR</span></h1>
                        <p className={styles.heroSubtitle}>Some days I feel invisible.</p>

                        {/* Integrated Portfolio Buttons */}
                        <div className={styles.heroActions}>
                            <a href="https://www.amazon.com/Secret-War-Todd-Burleson/dp/B0GKWV6RDN" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
                                ORDER THE BOOK
                            </a>
                            <a href="/sample.pdf" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnOutline}`}>
                                READ SAMPLE
                            </a>
                            <button onClick={() => scrollToSection('educator-resources')} className={`${styles.btn} ${styles.btnOutline}`}>
                                EDUCATOR MATERIALS &darr;
                            </button>
                            <a href="https://secretwarinteractive.netlify.app/" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnOutline}`}>
                                LAUNCH EXPERIENCE &rarr;
                            </a>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <div className={styles.imageWrapper} ref={tiltWrapperRef}>
                            <Image
                                src="/images/the_secret_war_cover.png"
                                alt="The Secret War Book Cover"
                                width={450}
                                height={675}
                                className={styles.coverImage}
                                priority
                            />
                            <div className={styles.scannerLine}></div>
                        </div>
                    </div>
                </section>

                {/* The Witnesses Section */}
                <section id="witnesses" className={styles.witnessesSection}>
                    <h2 className={styles.sectionHeading} data-text="THE WITNESSES">THE WITNESSES</h2>
                    <p className={styles.sectionDescription}>Children see what adults ignore. They document the truth hidden in plain sight.</p>

                    <div className={styles.cardsContainer}>
                        {/* Jamie */}
                        <article className={`${styles.characterCard} ${styles.scrollReveal}`}>
                            <div
                                className={`${styles.cardImageWrapper} cursor-pointer hover:ring-2 hover:ring-[#e1ff00] transition-all`}
                                onClick={() => setExpandedImage('/images/jamie.png')}
                            >
                                <Image src="/images/jamie.png" alt="Jamie Infographic" width={1000} height={1000} className={styles.characterImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>JAMIE</h3>
                                <p className={styles.role}>The Eye of the Secret War</p>
                                <p className={styles.details}>Armed with a Rolleiflex TLR Camera, Jamie captures a world reversed. He develops the truth in the darkroom, exposing secrets others miss, like the "Ghost Engine" at Wright Field.</p>
                                <blockquote className={styles.blockquote}>"If you do not document it, people forget."</blockquote>
                            </div>
                        </article>

                        {/* Billy */}
                        <article className={`${styles.characterCard} ${styles.reverse} ${styles.scrollReveal}`}>
                            <div
                                className={`${styles.cardImageWrapper} cursor-pointer hover:ring-2 hover:ring-[#e1ff00] transition-all`}
                                onClick={() => setExpandedImage('/images/billy.png')}
                            >
                                <Image src="/images/billy.png" alt="Billy Infographic" width={1000} height={1000} className={styles.characterImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>BILLY</h3>
                                <p className={styles.role}>The Lookout's Burden</p>
                                <p className={styles.details}>Seeking to be a soldier, Billy became a victim. A "warm rock" hiding Polonium-210 brought a slow sickness, disguised by adults but revealing a terrifying truth.</p>
                                <blockquote className={styles.blockquote}>"We were holding thunder."</blockquote>
                            </div>
                        </article>

                        {/* Kenji */}
                        <article className={`${styles.characterCard} ${styles.scrollReveal}`}>
                            <div
                                className={`${styles.cardImageWrapper} cursor-pointer hover:ring-2 hover:ring-[#e1ff00] transition-all`}
                                onClick={() => setExpandedImage('/images/kenji.png')}
                            >
                                <Image src="/images/kenji.png" alt="Kenji Infographic" width={1000} height={1000} className={styles.characterImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>KENJI SATO</h3>
                                <p className={styles.role}>The Invisible Observer of 1944</p>
                                <p className={styles.details}>Carrying the burden of Gaman, Kenji sketches the hidden realities of the Dayton Project. While adults see past him, he records hissing mud and hazmat suits, censored by mail clerks but preserved in margins.</p>
                                <blockquote className={styles.blockquote}>"Some days I feel invisible."</blockquote>
                            </div>
                        </article>
                    </div>
                </section>

                {/* Integrated Trailer Section */}
                <section className={`${styles.trailerSection} ${styles.scrollReveal}`}>
                    <div className={styles.trailerHeading}>
                        <h3 className="text-sm font-sans uppercase tracking-widest text-[#e1ff00] opacity-80 mb-4">OFFICIAL TRAILER</h3>
                        <h2 className="text-3xl md:text-5xl font-mono text-white tracking-widest uppercase">Secrets Have Costs</h2>
                    </div>
                    <div className="max-w-5xl mx-auto relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-[#e1ff00]/20 bg-black">
                        <iframe
                            src="https://www.youtube.com/embed/tUpviHAOO2w?si=BRPnnSBzvG3n73aX&rel=0&modestbranding=1"
                            title="The Secret War Book Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                </section>

                {/* Briefing Section */}
                <section id="dossier" className={`${styles.dossierSection} ${styles.scrollReveal}`}>
                    <div className={styles.dossierContainer}>
                        <div className={styles.dossierHeader}>
                            <h2>DECLASSIFIED BRIEFING</h2>
                            <span className={styles.dateStamp}>1944 // OHIO</span>
                        </div>
                        <div className={styles.dossierBody}>
                            <p>In the shadows of industrial America, history was forged in secret. While the world watched the battlefields, three boys uncovered a clandestine war in their own backyard. The Dayton Project demanded silence, but the innocent eyes of witnesses recorded every hushed whisper, every glowing stone, and every missing friend.</p>
                            <p>This is their story. This is <span className={styles.accentText}>The Secret War.</span></p>
                        </div>
                    </div>
                </section>

                {/* Integrated Educator Resources Section */}
                <section id="educator-resources" className={`${styles.educatorSection} ${styles.scrollReveal}`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16 text-center md:text-left pt-12">
                            <h3 className="text-sm font-sans uppercase tracking-widest text-[#e1ff00] opacity-80 mb-4">EDUCATOR RESOURCES</h3>
                            <h2 className="text-3xl md:text-4xl font-mono mb-4 text-white uppercase tracking-wider">A complete interdisciplinary<br />curriculum for the classroom.</h2>
                            <p className="text-xl font-light text-gray-400 max-w-2xl mt-6">History, STEM, and Ethics modules designed for 5th-7th grade instruction.</p>
                        </div>

                        <div className="mb-16">
                            <EducatorCarousel />
                        </div>

                        <div className="flex flex-col items-center justify-center mt-12 bg-white/5 border border-white/10 p-12 text-center rounded">
                            <h4 className="text-2xl font-mono uppercase tracking-widest mb-6 text-white pt-6">Get the Complete Educator Resources Pack</h4>
                            <p className="text-lg font-light text-gray-300 max-w-3xl mb-10 pb-6 border-b border-white/10">
                                Includes The Blueprint roadmap, a 20-day Teacher Companion pacing guide, Student Field Notes workbook, History & STEM modules, Book Club frameworks, and primary source historical documents.
                            </p>
                            <a
                                href="https://forms.gle/et4LTXFCE2fMifUm7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
                            >
                                REQUEST FREE ACCESS
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            {/* Image Expansion Modal */}
            {expandedImage && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
                    onClick={() => setExpandedImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-[#e1ff00] text-xl font-mono"
                            onClick={() => setExpandedImage(null)}
                        >
                            [X] CLOSE
                        </button>
                        <Image
                            src={expandedImage}
                            alt="Expanded Infographic"
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Existing Portfolio Footer / Navigation Component */}
            <Navigation />
        </div>
    );
}
