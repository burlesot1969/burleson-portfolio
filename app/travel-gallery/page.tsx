import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Eastern European Trip | Todd Burleson',
    description: 'Interactive 3x5 Photo Collage of Eastern European Trip by Todd Burleson.',
};

export default function TravelGalleryPage() {
    return (
        <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', background: '#070a12' }}>
            <iframe 
                src="/travel-gallery/index.html" 
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Eastern European Trip Photo Gallery"
            />
        </main>
    );
}
