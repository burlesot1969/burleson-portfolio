import type { Metadata } from 'next';
import GreetingsClient from './GreetingsClient';

export const metadata: Metadata = {
    title: 'Greetings from Kenosha | Todd Burleson',
    description: '"Greetings from Kenosha" is a local history, digital art, and storytelling project by Todd Burleson, blending vintage postcard art, deep human stories, and interactive cartography.',
    openGraph: {
        title: 'Greetings from Kenosha | Todd Burleson',
        description: 'A love letter to downtown Kenosha, blending vintage postcard art, deep archival research, human stories, and interactive cartography.',
        type: 'website',
        images: [
            {
                url: '/images/kenosha/poster-00-mural.jpg',
                width: 1280,
                height: 960,
                alt: 'Greetings from Kenosha Vintage Travel Poster',
            }
        ]
    }
};

export default function GreetingsFromKenoshaPage() {
    return <GreetingsClient />;
}
