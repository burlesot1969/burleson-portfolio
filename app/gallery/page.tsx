import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
    title: 'Gallery | Todd Burleson',
    description: 'Abstract photography gallery by Todd Burleson',
};

export default function GalleryPage() {
    return <GalleryClient />;
}
