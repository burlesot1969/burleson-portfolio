'use client';


import Image from "next/image";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import AtmosphericBackground from "@/components/AtmosphericBackground";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-[#111] text-[#ededed]">
      <Header />

      {/* Atmospheric Glass Background */}
      <AtmosphericBackground />

      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center z-10">

        {/* The Scrolling "Vapor" Text */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-start pointer-events-none z-10">
          <motion.div
            className="whitespace-nowrap text-[15vw] font-bold tracking-tighter text-white/50 mix-blend-overlay blur-[1px] leading-none"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 90, // Slower for majesty
            }}
          >
            WONDER IS THE BEGINNING OF WISDOM • LOOK CLOSER • SEE THE UNSEEN •
            WONDER IS THE BEGINNING OF WISDOM • LOOK CLOSER • SEE THE UNSEEN •
          </motion.div>
        </div>

      </section>

      <Navigation />
    </main>
  );
}
