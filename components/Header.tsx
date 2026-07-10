'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 p-8 z-50 mix-blend-difference pointer-events-none">
            <Link href="/" className="pointer-events-auto block relative h-12 w-12 animate-spin-slow">
                <Image
                    src="/images/logo.png"
                    alt="Todd Burleson Logo"
                    fill
                    className="object-contain brightness-0 invert hover:sepia hover:saturate-[3] hover:hue-rotate-[15deg] hover:brightness-90 transition-all duration-300"
                    priority
                />
            </Link>
        </header>
    );
}
