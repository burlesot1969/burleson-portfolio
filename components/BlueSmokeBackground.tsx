'use client';

export default function BlueSmokeBackground() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-screen">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                    filter: 'sepia(100%) hue-rotate(195deg) saturate(400%) brightness(0.55) contrast(1.25)'
                }}
            >
                <source src="/videos/smoke.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
