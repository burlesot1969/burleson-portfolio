'use client';

import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="min-h-screen w-full bg-[#111] text-[#ededed]">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-32 pb-48 min-h-screen flex flex-col justify-center">

                {/* Header */}
                <motion.div
                    className="mb-24 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-sm font-sans uppercase tracking-[0.2em] text-[#ededed] opacity-60 mb-6">
                        CORRESPONDENCE
                    </h1>
                    <p className="text-3xl md:text-4xl font-serif leading-tight">
                        For school visits, interviews, and rights inquiries.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24">

                    {/* Left Column: School & Library Visits */}
                    <motion.div
                        className="flex flex-col items-start text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h2 className="text-xs font-sans font-bold tracking-widest mb-8 text-[#ededed]">
                            SCHOOL & LIBRARY VISITS
                        </h2>
                        <div className="text-xl font-serif leading-relaxed text-gray-300 mb-8 max-w-md space-y-6">
                            <p>
                                As a full-time school librarian, Todd is actively teaching during the school year. While his in-person availability is limited to local events and school breaks, he loves connecting with classrooms virtually.
                            </p>
                            <p>
                                His interactive virtual sessions go beyond the book—exploring the "Secret War," the detective work of historical research, and the art of noticing wonders in the everyday.
                            </p>
                        </div>
                        <a
                            href="mailto:toddburlesonwonders@gmail.com"
                            className="inline-block px-8 py-3 border border-[#ededed] text-sm font-sans font-light uppercase tracking-widest text-[#ededed] hover:bg-[#ededed] hover:text-[#111] transition-all duration-300"
                        >
                            INQUIRE ABOUT A VISIT -&gt;
                        </a>
                    </motion.div>

                    {/* Right Column: Interviews & Conversation */}
                    <motion.div
                        className="flex flex-col items-start text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <h2 className="text-xs font-sans font-bold tracking-widest mb-8 text-[#ededed]">
                            INTERVIEWS & CONVERSATION
                        </h2>
                        <p className="text-xl font-serif leading-relaxed text-gray-300 mb-8 max-w-md">
                            Todd is available for podcasts, interviews, and panels. He is especially passionate about discussing the creative process, the intersection of history and making, and how we can all learn to slow down and find beauty in the ordinary.
                        </p>
                        <a
                            href="mailto:toddburlesonwonders@gmail.com"
                            className="inline-block px-8 py-3 border border-[#ededed] text-sm font-sans font-light uppercase tracking-widest text-[#ededed] hover:bg-[#ededed] hover:text-[#111] transition-all duration-300"
                        >
                            START A CONVERSATION -&gt;
                        </a>
                    </motion.div>

                </div>

                {/* Bottom Section: General Inquiries */}
                <motion.div
                    className="text-center md:text-left pt-12 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-xs font-sans font-bold tracking-widest mb-6 text-[#ededed]">
                        SAY HELLO
                    </h2>
                    <p className="text-xl font-serif leading-relaxed text-gray-300 mb-6 max-w-2xl">
                        Have a question about the book or just want to share a wonder you found? I would love to hear from you.
                    </p>
                    <a
                        href="mailto:toddburlesonwonders@gmail.com"
                        className="text-lg font-sans font-medium tracking-wide border-b border-transparent hover:border-[#ededed] transition-all duration-300 pb-1 inline-block"
                    >
                        EMAIL TODD -&gt;
                    </a>
                </motion.div>
            </div>

            <Navigation />
        </div>
    );
}
