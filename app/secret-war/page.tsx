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

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Card 1: THE BLUEPRINT */}
                        <a
                            href="/00_start_here.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border border-white hover:bg-white/5 transition-all duration-300 bg-white/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-sans font-bold tracking-wide text-white">THE BLUEPRINT (START HERE)</h4>
                                <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">↓</span>
                            </div>
                            <p className="text-lg font-serif text-gray-300 group-hover:text-white transition-colors">
                                Your roadmap for navigating the unit.
                            </p>
                        </a>

                        {/* Card 2: THE TEACHER COMPANION */}
                        <a
                            href="/01_teacher_companion.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border border-white/20 hover:border-white transition-all duration-300 bg-transparent"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-sans font-bold tracking-wide">THE TEACHER COMPANION</h4>
                                <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">↓</span>
                            </div>
                            <p className="text-lg font-serif text-gray-300 group-hover:text-white transition-colors">
                                A 20-day pacing guide with chapter summaries, literary analysis, and bell-ringer prompts.
                            </p>
                        </a>

                        {/* Card 3: STUDENT FIELD NOTES */}
                        <a
                            href="/02_student_workbook.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border border-white/20 hover:border-white transition-all duration-300 bg-transparent"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-sans font-bold tracking-wide">STUDENT FIELD NOTES</h4>
                                <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">↓</span>
                            </div>
                            <p className="text-lg font-serif text-gray-300 group-hover:text-white transition-colors">
                                An immersive workbook for tracking character arcs, evidence, and thematic development.
                            </p>
                        </a>

                        {/* Card 4: HISTORY & STEM MODULES */}
                        <a
                            href="/03_resource_pack.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border border-white/20 hover:border-white transition-all duration-300 bg-transparent"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-sans font-bold tracking-wide">HISTORY & STEM MODULES</h4>
                                <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">↓</span>
                            </div>
                            <p className="text-lg font-serif text-gray-300 group-hover:text-white transition-colors">
                                STEM modules on radiation and invisibility, plus primary source history lessons.
                            </p>
                        </a>

                        {/* Card 5: BOOK CLUB FRAMEWORK */}
                        <a
                            href="/04_book_club_guide.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border border-white/20 hover:border-white transition-all duration-300 bg-transparent"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-sans font-bold tracking-wide">BOOK CLUB FRAMEWORK</h4>
                                <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">↓</span>
                            </div>
                            <p className="text-lg font-serif text-gray-300 group-hover:text-white transition-colors">
                                Discussion frameworks focusing on ethics, friendship, and social-emotional connections.
                            </p>
                        </a>

                        {/* Card 6: PRIMARY SOURCE: KEN'S LETTER */}
                        <a
                            href="/05_kens_letter.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border border-white/20 hover:border-white transition-all duration-300 bg-transparent"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-sans font-bold tracking-wide">PRIMARY SOURCE: KEN’S LETTER</h4>
                                <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">↓</span>
                            </div>
                            <p className="text-lg font-serif text-gray-300 group-hover:text-white transition-colors">
                                Authentic historical documents that bring the era to life.
                            </p>
                        </a>

                    </div>
                </div>
            </section>

            <Navigation />
        </div>
    );
}
