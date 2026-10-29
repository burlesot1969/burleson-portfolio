'use client';

export default function IcmUndulatingBackground() {
    return (
        <div 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
            aria-hidden="true"
        >
            {/* Atmospheric Deep Base Layer (Lake Michigan Midnight & Twilight) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#061413] via-[#0b1016] to-[#120e0b]" />

            {/* 1. Foundational Atmospheric Swells (Wide ICM Color Washes) */}
            <div 
                className="absolute -top-20 left-[-15%] w-[130%] h-[75vh] rounded-full bg-gradient-to-r from-[#004d46]/45 via-[#1b2f4a]/40 to-[#00332e]/35 blur-[120px]"
                style={{
                    animation: 'icmHorizonSweep 42s ease-in-out infinite alternate',
                }}
            />

            <div 
                className="absolute top-1/4 -right-16 w-[680px] h-[680px] rounded-full bg-[#d4a359]/28 blur-[130px]"
                style={{
                    animation: 'icmDrift1 36s ease-in-out infinite alternate',
                }}
            />

            <div 
                className="absolute top-2/3 -left-28 w-[720px] h-[720px] rounded-full bg-[#b34728]/30 blur-[140px]"
                style={{
                    animation: 'icmDrift2 44s ease-in-out infinite alternate',
                }}
            />

            <div 
                className="absolute bottom-6 right-1/4 w-[740px] h-[580px] rounded-full bg-[#00423c]/35 blur-[130px]"
                style={{
                    animation: 'icmDrift3 50s ease-in-out infinite alternate',
                }}
            />

            {/* 2. Organic Morphing Fluid Blobs (Muted Vintage WPA Colors) */}
            {/* Amber Ochre Morphing Blob */}
            <div 
                className="absolute top-[16%] left-[18%] w-[460px] h-[400px] bg-gradient-to-br from-[#d4a359]/40 via-[#c28b3c]/30 to-[#b34728]/15 blur-[65px]"
                style={{
                    animation: 'blobMorph1 46s ease-in-out infinite',
                }}
            />

            {/* Terracotta Brick Morphing Blob */}
            <div 
                className="absolute top-[48%] right-[14%] w-[500px] h-[440px] bg-gradient-to-tr from-[#b34728]/42 via-[#96381e]/30 to-[#d4a359]/10 blur-[70px]"
                style={{
                    animation: 'blobMorph2 54s ease-in-out infinite',
                }}
            />

            {/* Lake Michigan Teal Morphing Blob */}
            <div 
                className="absolute bottom-[18%] left-[10%] w-[520px] h-[440px] bg-gradient-to-r from-[#005f56]/45 via-[#00423c]/35 to-transparent blur-[75px]"
                style={{
                    animation: 'blobMorph3 60s ease-in-out infinite alternate',
                }}
            />

            {/* Harbor Twilight Navy Morphing Blob */}
            <div 
                className="absolute top-[38%] left-[42%] w-[440px] h-[390px] bg-gradient-to-bl from-[#2a4365]/45 via-[#1b263b]/35 to-transparent blur-[70px]"
                style={{
                    animation: 'blobMorph1 58s ease-in-out infinite reverse',
                }}
            />

            {/* WPA Forest Olive Morphing Blob */}
            <div 
                className="absolute top-[66%] left-[34%] w-[420px] h-[370px] bg-gradient-to-tl from-[#486334]/38 via-[#2d401e]/28 to-transparent blur-[65px]"
                style={{
                    animation: 'blobMorph2 66s ease-in-out infinite reverse',
                }}
            />

            {/* 3. Floating Bokeh Bubbles (Organic Drifting Spheres with Luminous Cores) */}
            {/* Bubble 1: Large Warm Amber Ochre Sphere */}
            <div 
                className="absolute top-[26%] left-[12%] w-[130px] h-[130px] rounded-full blur-[14px]"
                style={{
                    background: 'radial-gradient(circle, rgba(240,185,95,0.75) 0%, rgba(212,163,89,0.45) 45%, rgba(212,163,89,0.12) 75%, transparent 90%)',
                    animation: 'bubbleFloat1 34s ease-in-out infinite',
                }}
            />

            {/* Bubble 2: Luminous Lake Teal Orb */}
            <div 
                className="absolute top-[20%] right-[22%] w-[110px] h-[110px] rounded-full blur-[12px]"
                style={{
                    background: 'radial-gradient(circle, rgba(79,209,197,0.78) 0%, rgba(0,95,86,0.45) 45%, rgba(0,59,54,0.12) 75%, transparent 90%)',
                    animation: 'bubbleFloat2 40s ease-in-out infinite',
                }}
            />

            {/* Bubble 3: Warm Terracotta Sphere */}
            <div 
                className="absolute top-[46%] right-[10%] w-[100px] h-[100px] rounded-full blur-[14px]"
                style={{
                    background: 'radial-gradient(circle, rgba(225,115,80,0.72) 0%, rgba(179,71,40,0.42) 45%, rgba(179,71,40,0.10) 75%, transparent 90%)',
                    animation: 'bubbleFloat3 46s ease-in-out infinite alternate',
                }}
            />

            {/* Bubble 4: Radiant Golden Honey Bubble */}
            <div 
                className="absolute top-[60%] left-[24%] w-[85px] h-[85px] rounded-full blur-[10px]"
                style={{
                    background: 'radial-gradient(circle, rgba(246,190,85,0.82) 0%, rgba(224,159,62,0.48) 50%, rgba(212,163,89,0.12) 80%, transparent 92%)',
                    animation: 'bubbleFloat4 38s ease-in-out infinite',
                }}
            />

            {/* Bubble 5: Lake Michigan Azure Bubble */}
            <div 
                className="absolute top-[72%] right-[30%] w-[120px] h-[120px] rounded-full blur-[16px]"
                style={{
                    background: 'radial-gradient(circle, rgba(64,185,178,0.7) 0%, rgba(0,77,70,0.4) 50%, rgba(0,59,54,0.1) 80%, transparent 90%)',
                    animation: 'bubbleFloat5 48s ease-in-out infinite alternate',
                }}
            />

            {/* Bubble 6: Burnt Sienna Floating Bubble */}
            <div 
                className="absolute top-[32%] left-[52%] w-[80px] h-[80px] rounded-full blur-[12px]"
                style={{
                    background: 'radial-gradient(circle, rgba(210,120,80,0.7) 0%, rgba(160,65,35,0.38) 50%, rgba(150,56,30,0.1) 80%, transparent 90%)',
                    animation: 'bubbleFloat3 52s ease-in-out infinite alternate',
                }}
            />

            {/* Bubble 7: WPA Sage Olive Bubble */}
            <div 
                className="absolute top-[80%] left-[42%] w-[95px] h-[95px] rounded-full blur-[14px]"
                style={{
                    background: 'radial-gradient(circle, rgba(145,180,110,0.68) 0%, rgba(72,99,52,0.4) 50%, rgba(53,72,41,0.1) 80%, transparent 90%)',
                    animation: 'bubbleFloat4 56s ease-in-out infinite reverse',
                }}
            />

            {/* Bubble 8: Delicate Golden Pearl Mote */}
            <div 
                className="absolute top-[14%] left-[46%] w-[55px] h-[55px] rounded-full blur-[8px]"
                style={{
                    background: 'radial-gradient(circle, rgba(255,248,235,0.9) 0%, rgba(230,180,100,0.6) 45%, rgba(212,163,89,0.15) 80%, transparent 92%)',
                    animation: 'bubbleFloat2 26s ease-in-out infinite',
                }}
            />

            {/* Bubble 9: Lake Light Cyan Droplet */}
            <div 
                className="absolute top-[56%] right-[42%] w-[50px] h-[50px] rounded-full blur-[8px]"
                style={{
                    background: 'radial-gradient(circle, rgba(160,245,235,0.85) 0%, rgba(56,178,172,0.5) 45%, rgba(0,59,54,0.15) 80%, transparent 92%)',
                    animation: 'bubbleFloat5 32s ease-in-out infinite alternate',
                }}
            />

            {/* Bubble 10: Rising Harbor Indigo Bubble */}
            <div 
                className="absolute top-[85%] right-[18%] w-[110px] h-[110px] rounded-full blur-[16px]"
                style={{
                    background: 'radial-gradient(circle, rgba(90,135,190,0.68) 0%, rgba(27,38,59,0.4) 50%, transparent 85%)',
                    animation: 'bubbleFloat1 50s ease-in-out infinite reverse',
                }}
            />

            {/* Bubble 11: Warm Sunlight Dewdrop */}
            <div 
                className="absolute top-[42%] left-[16%] w-[42px] h-[42px] rounded-full blur-[6px]"
                style={{
                    background: 'radial-gradient(circle, rgba(255,235,190,0.92) 0%, rgba(224,159,62,0.6) 50%, transparent 88%)',
                    animation: 'bubbleFloat4 30s ease-in-out infinite',
                }}
            />

            {/* Bubble 12: Soft Brick Ember */}
            <div 
                className="absolute top-[70%] left-[15%] w-[48px] h-[48px] rounded-full blur-[7px]"
                style={{
                    background: 'radial-gradient(circle, rgba(235,130,95,0.85) 0%, rgba(179,71,40,0.5) 50%, transparent 88%)',
                    animation: 'bubbleFloat2 36s ease-in-out infinite alternate',
                }}
            />
        </div>
    );
}
