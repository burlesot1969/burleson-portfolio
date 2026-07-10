'use client';

import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import BlueSmokeBackground from '@/components/BlueSmokeBackground';
import { motion } from 'framer-motion';
import { useState } from 'react';

const EMAIL = 'toddburlesonwonders@gmail.com';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [copiedVisit, setCopiedVisit] = useState(false);
    const [copiedConversation, setCopiedConversation] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const handleCopyLink = async (e: React.MouseEvent, type: 'visit' | 'conversation') => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            if (type === 'visit') {
                setCopiedVisit(true);
                setTimeout(() => setCopiedVisit(false), 2000);
            } else {
                setCopiedConversation(true);
                setTimeout(() => setCopiedConversation(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };


    return (
        <div className="relative min-h-screen w-full bg-[#111] text-[#ededed] overflow-hidden">
            <Header />
            <BlueSmokeBackground />

            {/* 
              Restructured Layout to coordinate with About page:
              - Grid: 2 columns on desktop (Correspondence Left, Guidelines Right)
              - Mobile: Stacked
              - Min-Height: Full screen layout with z-10 index
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto px-6 pt-[150px] pb-[300px] gap-16 lg:gap-24 min-h-screen items-start relative z-10">

                {/* Left Column: Direct Connection & Correspondence */}
                <motion.div
                    className="flex flex-col justify-center text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-xs font-sans uppercase tracking-[0.3em] text-[#ededed] opacity-50 mb-6">
                        CORRESPONDENCE
                    </h1>
                    <p className="text-3xl md:text-4xl font-serif leading-tight tracking-tight mb-12">
                        For school visits, interviews, rights inquiries, or just to share a wonder.
                    </p>

                    {/* Email Connection Block */}
                    <div className="py-8 border-t border-white/10 flex flex-col items-start gap-4">
                        <span className="text-[10px] font-sans tracking-[0.3em] uppercase opacity-40">
                            DIRECT INQUIRIES
                        </span>
                        <a 
                            href={`mailto:${EMAIL}`}
                            className="text-xl sm:text-2xl font-serif text-[#ededed] hover:text-white transition-colors duration-300 select-all tracking-tight break-all"
                        >
                            {EMAIL}
                        </a>
                        
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 border border-white/10 hover:border-white/30 text-[9px] font-sans uppercase tracking-[0.2em] transition-all duration-300 text-gray-400 hover:text-[#ededed] bg-black/20 backdrop-blur-sm active:scale-95"
                                aria-label="Copy email address"
                            >
                                {copied ? 'Copied' : 'Copy Email'}
                            </button>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="px-4 py-2 border border-white/10 hover:border-white/30 text-[9px] font-sans uppercase tracking-[0.2em] transition-all duration-300 text-gray-400 hover:text-[#ededed] bg-black/20 backdrop-blur-sm active:scale-95"
                            >
                                Open Mailer
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Detailed Guidelines */}
                <motion.div
                    className="flex flex-col gap-12 lg:pl-12 lg:border-l border-white/10 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    {/* School & Library Visits */}
                    <div>
                        <h2 className="text-xs font-sans font-bold tracking-[0.2em] mb-4 text-[#ededed] opacity-50 uppercase">
                            SCHOOL & LIBRARY VISITS
                        </h2>
                        <div className="text-xl md:text-2xl font-serif leading-relaxed text-gray-300 space-y-4">
                            <p>
                                Now retired, Todd is fully available and delighted to do in-person school and library visits. He loves traveling to connect directly with classrooms, as well as conducting interactive virtual sessions.
                            </p>
                            <p>
                                His dynamic sessions go beyond the book—exploring the "Secret War," the detective work of historical research, and the art of noticing wonders in the everyday. Please reach out to discuss how he can tailor a visit for your group.
                            </p>
                        </div>
                        <a
                            href={`mailto:${EMAIL}?subject=School%20Visit%20Inquiry`}
                            onClick={(e) => handleCopyLink(e, 'visit')}
                            className="inline-block text-[11px] font-sans font-light uppercase tracking-[0.2em] border-b border-white/20 hover:border-[#ededed] transition-all duration-300 pb-1 mt-4 text-gray-300 hover:text-white"
                        >
                            {copiedVisit ? 'Email Address Copied!' : 'INQUIRE ABOUT A VISIT →'}
                        </a>
                    </div>

                    {/* Interviews & Conversation */}
                    <div>
                        <h2 className="text-xs font-sans font-bold tracking-[0.2em] mb-4 text-[#ededed] opacity-50 uppercase">
                            INTERVIEWS & CONVERSATION
                        </h2>
                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-300">
                            Todd is available for podcasts, interviews, and panels. He is especially passionate about discussing the creative process, the intersection of history and making, and how we can all learn to slow down and find beauty in the ordinary.
                        </p>
                        <a
                            href={`mailto:${EMAIL}?subject=Interview%2FPanel%20Inquiry`}
                            onClick={(e) => handleCopyLink(e, 'conversation')}
                            className="inline-block text-[11px] font-sans font-light uppercase tracking-[0.2em] border-b border-white/20 hover:border-[#ededed] transition-all duration-300 pb-1 mt-4 text-gray-300 hover:text-white"
                        >
                            {copiedConversation ? 'Email Address Copied!' : 'START A CONVERSATION →'}
                        </a>
                    </div>
                </motion.div>

            </div>

            <Navigation />
        </div>
    );
}

