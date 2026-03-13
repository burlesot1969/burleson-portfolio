'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import VisitorGlobe from '@/components/VisitorGlobe';
import { motion } from 'framer-motion';

export default function AboutClient() {
    return (
        <div className="min-h-screen w-full bg-[#111] text-[#ededed]">
            <Header />

            {/* 
              Restructured Layout:
              - Grid: 2 columns on desktop (Bio Left, Image Right)
              - Mobile: Stacked (Image Top, Bio Bottom)
              - Min-Height: Full screen feel
            */}

            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto px-6 pt-[150px] pb-[300px] gap-16 lg:gap-20 items-center min-h-screen overflow-y-auto">

                {/* 
                  Left Column (Desktop) / Bottom (Mobile): Bio Text
                  - order-2 on mobile (comes after image)
                  - order-1 on desktop (comes first/left)
                */}
                <motion.div
                    className="order-2 lg:order-1 flex flex-col justify-center text-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    <motion.h2
                        className="text-sm font-sans uppercase tracking-[0.2em] mb-8 text-[#ededed] opacity-80"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        Todd Burleson
                    </motion.h2>

                    <div className="text-xl md:text-2xl font-serif leading-relaxed text-gray-300 space-y-8">
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            Todd Burleson is an author, educator, and a school librarian. By day, he inspires students to find their own wonders in books. By night he explores the intersection of history and imagination.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            Todd is a creator driven by a simple philosophy: that beauty is everywhere, especially in the ordinary. A former professional photographer with a decade of darkroom experience, he learned early on that the most profound stories often live in the quietest details. Today, that same attentive gaze shapes his writing and art. Whether he is weaving historical fiction, composing abstract collages, or capturing light through a lens, Todd invites us to slow down, look closer, and discover the wonders hiding in plain sight.
                        </motion.p>
                    </div>
                </motion.div>

                {/* 
                  Right Column (Desktop) / Top (Mobile): Portrait Image
                  - order-1 on mobile (comes first)
                  - order-2 on desktop (comes second/right)
                */}
                <div className="order-1 lg:order-2 flex justify-center w-full">
                    <Image
                        src="/images/new_author_photo.jpeg"
                        alt="Todd Burleson Portrait"
                        width={1200}
                        height={1600}
                        className="w-full h-auto max-w-md mx-auto rounded-xl grayscale contrast-125"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>


            </div>

            {/* Readers Around the World Section */}
            <div className="w-full max-w-7xl mx-auto px-6 pb-32 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center mb-12"
                >
                    <h3 className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-amber-500/80 mb-4 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Live Global Intel
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#ededed]">Readers Around the World</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl text-center font-serif text-lg">
                        Tracking incoming frequencies and active operatives exploring the archives globally.
                    </p>
                </motion.div>

                <div className="w-full max-w-4xl mx-auto">
                    <VisitorGlobe />
                </div>
            </div>

            <Navigation />
        </div>
    );
}
