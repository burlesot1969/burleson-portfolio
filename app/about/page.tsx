import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About Todd Burleson',
    description: 'Todd Burleson is an author, maker, and school librarian based in the Midwest. He weaves historical fiction, composes abstract collages, and captures light through a lens.',
    openGraph: {
        title: 'About Todd Burleson',
        description: 'Todd Burleson is an author, maker, and school librarian based in the Midwest. He weaves historical fiction, composes abstract collages, and captures light through a lens.',
        type: 'website',
        images: [
            {
                url: '/images/new_author_photo.jpeg',
                width: 1200,
                height: 1600,
                alt: 'Todd Burleson',
            }
        ]
    }
};

export default function About() {
    return <AboutClient />;
}
