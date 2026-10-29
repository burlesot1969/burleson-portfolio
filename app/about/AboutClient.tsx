'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
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

            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto px-6 pt-[140px] pb-32 gap-16 lg:gap-20 items-center min-h-screen overflow-y-auto">

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
                            Todd Burleson is a curious creator. He doesn&apos;t limit himself to just one fascination or medium. He simply enjoys creating. He is an author, artist, photographer, advocate, and community builder.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            Todd is a creator driven by a simple philosophy: that beauty is everywhere, especially in the ordinary. A former professional photographer with a decade of darkroom experience, he learned early on that the most profound stories often live in the quietest details. Today, that same attentive gaze shapes his writing and art. Whether he is weaving historical fiction, composing abstract collages, or capturing light through a lens, Todd invites us to slow down, look closer, and discover the wonders hiding in plain sight.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-base md:text-lg font-sans font-bold tracking-[0.25em] uppercase text-white/90 pt-2"
                        >
                            WALK • WANDER • WONDER
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

            <Navigation />
        </div>
    );
}
