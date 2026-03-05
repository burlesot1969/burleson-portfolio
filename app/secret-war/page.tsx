'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

export default function SecretWar() {
    return (
        <div className="min-h-screen w-full bg-[#111] text-[#ededed]">
            <Header />

            {/* 
              Levitation Layout:
              - Grid: 2 columns on desktop (Left: Book, Right: Text+Buttons)
              - Mobile: Stacked (Book -> Text -> Buttons)
              - Image: Maximized width, no artificial constraints.
            */}
            {/* 
              Levitation Layout:
              - Grid: 2 columns on desktop (Left: Book, Right: Text+Buttons)
              - Mobile: Stacked (Book -> Text -> Buttons)
              - Image: Maximized width, no artificial constraints.
            */}
            {/* 
              Levitation Layout:
              - Grid: 2 columns on desktop (Strict 2-Col)
              - Mobile: Stacked
              - Image: Enormous, full width, deep shadow
            */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto px-6 pt-32 pb-16 gap-12 items-start">

                {/* Left Column: Floating Book (Maximize Size) */}
                <div className="order-1 flex flex-col items-center justify-center w-full">
                    <motion.div
                        className="relative w-full h-auto drop-shadow-2xl"
                        animate={{ y: [-15, 15, -15] }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src="/images/the_secret_war_cover.png"
                            alt="The Secret War Book Cover"
                            width={1000}
                            height={1500}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Column: Text & Actions */}
                <motion.div
                    className="order-2 flex flex-col justify-start items-center md:items-start text-center md:text-left mt-0 md:mt-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-none text-[#ededed]"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        THE SECRET WAR
                    </motion.h1>

                    <motion.h2
                        className="text-xl md:text-2xl font-serif leading-relaxed text-[#ededed] opacity-90 mb-8 max-w-lg"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        In 1944 Dayton, Ohio, secrets are part of everyday life.
                    </motion.h2>

                    <div className="text-lg md:text-xl font-serif leading-relaxed text-[#ededed] opacity-90 space-y-6 mb-10 text-left">
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            In 1944 Dayton, Ohio, everyone is a piece of a puzzle they aren’t allowed to see.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            Jamie has a photograph of a "ghost plane"—an aircraft that officially doesn't exist. Billy has a heavy, gray stone he found near the train tracks that pulses with an impossible heat. Ken has a sketchbook full of secrets he’s afraid to share.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            As their lives collide in the shadow of the top-secret Manhattan Project, these three boys must decide if the truth is worth the risk of being seen. Because in a town built on silence, the most dangerous weapon isn't a bomb—it's a question.
                        </motion.p>
                    </div>

                    {/* Buttons: Now here in the right column */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        <a
                            href="https://www.amazon.com/Secret-War-Todd-Burleson/dp/B0GKWV6RDN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center px-8 py-4 bg-white text-black text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                        >
                            ORDER THE BOOK
                        </a>

                        <a
                            href="/sample.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center px-8 py-4 border border-[#ededed] text-sm font-light uppercase tracking-widest text-[#ededed] transition-all duration-300 hover:bg-[#ededed] hover:text-[#111]"
                        >
                            Read Sample
                        </a>

                        <a
                            href="https://secretwarinteractive.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center px-8 py-4 border border-[#ededed] text-sm font-light uppercase tracking-widest text-[#ededed] transition-all duration-300 hover:bg-[#ededed] hover:text-[#111]"
                        >
                            Launch Experience
                        </a>
                    </motion.div>

                </motion.div>
            </div>

            {/* CURRICULUM ARCHIVE SECTION */}
            <section className="relative z-10 w-full bg-neutral-900 py-16 pb-48 px-6 text-[#ededed]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 text-center md:text-left">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-[#ededed] opacity-60 mb-4">
                            EDUCATOR RESOURCES
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            A complete interdisciplinary curriculum for the classroom.
                        </h2>
                        <p className="text-xl font-light text-gray-400 max-w-2xl">
                            History, STEM, and Ethics modules designed for 5th-7th grade instruction.
                        </p>
                    </div>

                    {/* Educator Resources CTA */}
                    <div className="flex flex-col items-center justify-center mt-12 bg-white/5 border border-white/20 p-12 text-center">
                        <h4 className="text-2xl font-serif mb-6 text-white">Get the Complete Educator Resources Pack</h4>
                        <p className="text-lg font-light text-gray-300 max-w-3xl mb-10">
                            Includes The Blueprint roadmap, a 20-day Teacher Companion pacing guide, Student Field Notes workbook, History & STEM modules, Book Club frameworks, and primary source historical documents.
                        </p>
                        <a
                            href="https://forms.gle/et4LTXFCE2fMifUm7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center px-10 py-5 bg-white text-black text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                        >
                            REQUEST FREE ACCESS
                        </a>
                    </div>
                </div>
            </section>

            <Navigation />
        </div>
    );
}
