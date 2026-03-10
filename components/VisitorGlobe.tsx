"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// Import react-globe.gl dynamically since it relies on window/browser APIs
const Globe = dynamic(() => import('react-globe.gl'), {
    ssr: false,
    loading: () => <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-black/50 animate-pulse rounded-full border border-[rgba(255,204,0,0.1)] shadow-[0_0_60px_rgba(255,204,0,0.05)] flex items-center justify-center"><p className="text-amber-500/50 text-xs font-mono tracking-widest uppercase">Initializing Radar...</p></div>
});

// --- Types ---
interface VisitorPoint {
    lat: number;
    lng: number;
    size: number;
    color: string;
    label: string;
}

// --- Constants & Config ---
// Using a basic dark gray map with no borders, typical of intelligence dashboards
const GLOBE_IMAGE_URL = '//unpkg.com/three-globe/example/img/earth-dark.jpg';
const BACKGROUND_COLOR = '#00000000'; // Transparent so it sits on the page background
const PINS_COLOR = '#ffcc00'; // Bright amber/yellow
const PINS_COLOR_ALT = '#ff8800'; // Darker amber for variation

// --- Mock Data Generator ---
// Generate realistic-looking "readers" hotspots
const MOCK_LOCATIONS = [
    { name: "New York, USA", lat: 40.7128, lng: -74.006 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    { name: "Sydney, AUS", lat: -33.8688, lng: 151.2093 },
    { name: "Chicago, USA", lat: 41.8781, lng: -87.6298 },
    { name: "Los Angeles, USA", lat: 34.0522, lng: -118.2437 },
    { name: "Toronto, CAN", lat: 43.7, lng: -79.42 },
    { name: "Berlin, DEU", lat: 52.52, lng: 13.4050 },
    { name: "Tokyo, JPN", lat: 35.6762, lng: 139.6503 },
    { name: "Seattle, USA", lat: 47.6062, lng: -122.3321 },
    { name: "Austin, USA", lat: 30.2672, lng: -97.7431 },
    { name: "Melbourne, AUS", lat: -37.8136, lng: 144.9631 },
    { name: "Auckland, NZL", lat: -36.8485, lng: 174.7633 },
    { name: "Paris, FRA", lat: 48.8566, lng: 2.3522 },
];

const getRandomOffset = () => (Math.random() - 0.5) * 5; // Scatter them a bit

const generateMockData = (count: number): VisitorPoint[] => {
    return Array.from({ length: count }).map(() => {
        const baseLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
        return {
            lat: baseLocation.lat + getRandomOffset(),
            lng: baseLocation.lng + getRandomOffset(),
            size: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.3 ? PINS_COLOR : PINS_COLOR_ALT,
            label: baseLocation.name
        };
    });
};

// --- Component ---
export default function VisitorGlobe() {
    const globeEl = useRef<any>(null);
    const [mounted, setMounted] = useState(false);
    const [pointsData, setPointsData] = useState<VisitorPoint[]>([]);
    const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

    // We use a container ref to observe size changes for responsiveness
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial mounting and data generation
    useEffect(() => {
        setMounted(true);
        // Initial cluster of visitors
        setPointsData(generateMockData(80));

        // Add new "live" pings
        const intervalId = setInterval(() => {
            setPointsData(prev => {
                const newPoints = [...prev, ...generateMockData(1)].slice(-150); // Keep max 150 points 
                return newPoints;
            });
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    // Handle Resize observer to make the globe responsive
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                // Keep it square based on width, maxing out at 600px
                const newSize = Math.min(width, 600);
                if (newSize > 0 && Math.abs(dimensions.width - newSize) > 10) {
                    setDimensions({ width: newSize, height: newSize });
                }
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, [dimensions.width]);

    // Setup Globe Controls once it's available
    useEffect(() => {
        if (!globeEl.current) return;

        // Ensure auto-rotation
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 1.0;

        // Optional: Disable zooming so scrolling past it is easier
        globeEl.current.controls().enableZoom = false;

        // Start looking slightly from above down towards US/EU
        globeEl.current.pointOfView({ lat: 35, lng: -50, altitude: 2.5 }, 0);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="w-full flex justify-center items-center relative overflow-hidden py-10">
            {/* Ambient Background Glow matching the radar theme */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-amber-500/5 blur-[100px] pointer-events-none -z-10" />

            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl={GLOBE_IMAGE_URL}
                backgroundColor={BACKGROUND_COLOR}

                // Show grid lines for that "radar" look
                showGraticules={true}

                // Atmosphere config (outer halo)
                showAtmosphere={true}
                atmosphereColor={PINS_COLOR_ALT}
                atmosphereAltitude={0.15}

                // Render points 
                pointsData={pointsData}
                pointLat="lat"
                pointLng="lng"
                pointColor="color"
                pointAltitude="size" // Extrude based on size
                pointRadius={(d: any) => d.size * 0.8}
                pointsMerge={true}
                pointResolution={12}
            />
        </div>
    );
}
