import type { Metadata } from 'next';
import SecretWarClient from './SecretWarClient';

export const metadata: Metadata = {
    title: 'The Secret War | Todd Burleson',
    description: 'Children see what adults ignore. Three boys uncover a clandestine war in their own backyard during the Dayton Project in 1944. A historical middle-grade novel by Todd Burleson.',
    openGraph: {
        title: 'The Secret War | Todd Burleson',
        description: 'Children see what adults ignore. Three boys uncover a clandestine war in their own backyard during the Dayton Project in 1944.',
        type: 'website',
        images: [
            {
                url: '/images/the_secret_war_cover.png',
                width: 800,
                height: 1200,
                alt: 'The Secret War Book Cover',
            }
        ]
    }
};

export default function SecretWar() {
    return <SecretWarClient />;
}
