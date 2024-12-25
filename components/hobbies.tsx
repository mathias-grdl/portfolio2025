"use client";

import React, { useState, useEffect, useRef } from "react";
import Section from "./Section";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Oslo from "../public/assets/hobbies/oslo-min.jpg";
import Paris from "../public/assets/hobbies/paris-min.png";

const locationData = [
    {
        images: Paris,
        location: "France",
        flag: "https://flagcdn.com/fr.svg",
        description: "City of lights and romance",
    },
    {
        images: Oslo,
        location: "Norway",
        flag: "https://flagcdn.com/no.svg",
        description: "Capital city with stunning fjords",
    },
    {
        images: Oslo,
        location: "Denmark",
        flag: "https://flagcdn.com/dk.svg",
        description: "City of beautiful canals and architecture",
    },
    {
        images: Oslo,
        location: "Cyprus",
        flag: "https://flagcdn.com/cy.svg",
        description: "Island country in the Eastern Mediterranean",
    },
    {
        images: Oslo,
        location: "Finland",
        flag: "https://flagcdn.com/fi.svg",
        description: "Country of thousands of lakes and islands",
    },
    {
        images: Oslo,
        location: "Poland",
        flag: "https://flagcdn.com/pl.svg",
        description: "City known for its well-preserved medieval core",
    },
];

export default function Hobbies() {
    const containerRef = useRef(null);
    const [activeLocation, setActiveLocation] = useState("Oslo, Norway");
    const locationRefs = useRef<HTMLDivElement[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Préchargement des images
    useEffect(() => {
        locationData.forEach(location => {
            const img = new Image();
            img.src = location.images.src;
        });
    }, []);

    const handleLocationChange = (newLocation: string) => {
        if (isTransitioning || activeLocation === newLocation) return;
        setIsTransitioning(true);

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsTransitioning(false);
            },
        });

        timeline
            .to(".content-transition", {
                opacity: 0.8,
                duration: 0.2,
                ease: "power2.out",
            })
            .add(() => {
                setActiveLocation(newLocation);
            })
            .to(".content-transition", {
                opacity: 1,
                duration: 0.3,
                ease: "power2.in",
            });
    };

    useEffect(() => {
        if (window.innerWidth >= 768) { // md breakpoint
            gsap.registerPlugin(ScrollTrigger);

            const lenis = new Lenis({
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            const locations = Array.from(new Set(locationData.map(item => item.location)));

            ScrollTrigger.create({
                trigger: "#hobbies",
                start: "top top",
                end: `+=${locations.length * window.innerHeight}`,
                pin: true,
                pinSpacing: true,
            });

            locations.forEach((_, index) => {
                const sectionHeight = window.innerHeight;
                ScrollTrigger.create({
                    trigger: locationRefs.current[index],
                    start: `top+=${index * sectionHeight} center`,
                    end: `top+=${(index + 1) * sectionHeight} center`,
                    onEnter: () => handleLocationChange(locations[index]),
                    onEnterBack: () => handleLocationChange(locations[index]),
                });
            });

            return () => {
                lenis.destroy();
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        }
    }, []);

    return (
        <Section id="hobbies" className="relative h-full md:h-screen">
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-5 h-full container mx-auto">
                {/* Sidebar */}
                <div className="col-span-1 py-8 sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                    <h2 className="text-4xl font-bold mb-2 select-none">Travels</h2>
                    <span className="text-sm text-neutral-500">2023-2024</span>
                    <div className="mt-8 space-y-2 md:hidden">
                        <select
                            className="w-full px-4 py-3 rounded-lg transition-all bg-neutral-100 dark:bg-neutral-800"
                            onChange={e => handleLocationChange(e.target.value)}
                            value={activeLocation}>
                            {Array.from(new Set(locationData.map(item => item.location))).map(location => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                    <nav className="mt-8 space-y-2 hidden md:block">
                        {Array.from(new Set(locationData.map(item => item.location))).map((location, index) => {
                            const locationDataItem = locationData.find(item => item.location === location);
                            return (
                                <button
                                    key={location}
                                    ref={el => (locationRefs.current[index] = el!)}
                                    onClick={() => handleLocationChange(location)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all
                                        ${
                                            activeLocation === location
                                                ? "bg-neutral-100 dark:bg-neutral-800 font-medium"
                                                : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                                        }`}>
                                    <img src={locationDataItem?.flag} alt={location} className="w-4 h-4 mr-2 inline-block" />
                                    {location}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content avec animation */}
                <div className="col-span-4 md:px-8 flex items-center">
                    <div className="content-transition max-w-3xl w-full space-y-8">
                        <div className="select-none">
                            <h3 className="text-4xl font-medium mb-3 text-neutral-900 dark:text-neutral-100">{activeLocation}</h3>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                {locationData.find(item => item.location === activeLocation)?.description}
                            </p>
                        </div>

                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                            <img
                                src={locationData.find(item => item.location === activeLocation)?.images.src}
                                alt={activeLocation}
                                className="w-full h-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
