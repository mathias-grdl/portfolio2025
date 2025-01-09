"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Section from "./Section";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Oslo from "../public/assets/hobbies/oslo2.png";
import Paris from "../public/assets/hobbies/paris2.png";
import Copenhagen from "../public/assets/hobbies/copenhagen1.png";
import Chypre from "../public/assets/hobbies/chypre1.png";
import Finland from "../public/assets/hobbies/finland1.png";
import Poland from "../public/assets/hobbies/poland1.png";
import Sweden from "../public/assets/hobbies/Sweden.png";
import { useTranslation } from "react-i18next";
import { Typography } from "./ui/typography";

interface ImageData {
    src: string;
}

interface LocationData {
    images: ImageData;
    location: string;
    cities?: string;
    flag: string;
    description: string;
    lat: number;
    lng: number;
}

interface SliderProps {
    locationData: LocationData[];
}

const LocationSlide = ({ image, location, isActive }: { image: ImageData; location: string; isActive: boolean }) => (
    <div
        className="location-slide absolute inset-0"
        style={{
            opacity: isActive ? 1 : 0,
            visibility: "visible",
            zIndex: 1,
        }}>
        <img src={image.src} alt={location} style={{ objectPosition: "50% 25%" }} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50" />
    </div>
);

const LocationInfo = ({ location, flag }: { location: string; flag: string }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center container mx-auto">
            <div className="flex items-center gap-4 mb-2">
                <img src={flag} alt={`${location} flag`} className="w-8 h-8" />
                <Typography variant="h2" className="text-6xl font-bold">
                    {t(`hobbies.locations.${location.toLowerCase()}.title`)}
                </Typography>
            </div>
            <span className="mb-4">{t(`hobbies.locations.${location.toLowerCase()}.cities`)}</span>
            <Typography variant="p" className="text-xl text-center">
                {t(`hobbies.locations.${location.toLowerCase()}.description`)}
            </Typography>
        </div>
    );
};

const DesktopSlider = ({ locationData }: SliderProps) => {
    const { i18n } = useTranslation();

    const textRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lastIndexRef = useRef(0);
    const slideAnimationsRef = useRef(new Map());

    const handleSlideChange = useCallback((index: number) => {
        const slides = document.querySelectorAll(".location-slide");
        slides.forEach((slide, i) => {
            const prevAnim = slideAnimationsRef.current.get(i);
            if (prevAnim) prevAnim.kill();

            const newAnim = gsap.to(slide, {
                opacity: i === index ? 1 : 0,
                duration: 0.4,
                ease: "power2.inOut",
                immediateRender: false,
            });
            slideAnimationsRef.current.set(i, newAnim);
        });

        gsap.timeline({
            onComplete: () => slideAnimationsRef.current.clear(),
        })
            .set(textRef.current, { opacity: 0, y: 20 })
            .to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power1.out",
            });
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 0.8,
        });

        const rafCallback = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(rafCallback);
        };

        const rafId = requestAnimationFrame(rafCallback);

        const scrollTrigger = ScrollTrigger.create({
            trigger: "#hobbies",
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: self => {
                const newIndex = Math.floor(self.progress * (locationData.length - 1));
                const clampedIndex = Math.min(newIndex, locationData.length - 1);

                if (clampedIndex !== lastIndexRef.current) {
                    lastIndexRef.current = clampedIndex;
                    setActiveIndex(clampedIndex);
                    handleSlideChange(clampedIndex);
                }
            },
        });

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            scrollTrigger.kill();
            slideAnimationsRef.current.clear();
        };
    }, [handleSlideChange, locationData.length, i18n.language]);

    return (
        <div className="relative h-full">
            <div className="absolute inset-0">
                {locationData.map((location, index) => (
                    <LocationSlide key={location.location} image={location.images} location={location.location} isActive={index === activeIndex} />
                ))}
            </div>
            <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <LocationInfo {...locationData[activeIndex]} />
            </div>
        </div>
    );
};

const MobileSlider = ({ locationData }: SliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleMobileSlideChange = (direction: "next" | "prev") => {
        if (direction === "next") {
            setActiveIndex(prev => (prev + 1) % locationData.length);
        } else {
            setActiveIndex(prev => (prev - 1 + locationData.length) % locationData.length);
        }
    };

    return (
        <div className="relative h-full">
            <div className="absolute inset-0">
                {locationData.map((location, index) => (
                    <LocationSlide key={location.location} image={location.images} location={location.location} isActive={index === activeIndex} />
                ))}
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <LocationInfo {...locationData[activeIndex]} />
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-20">
                    <button onClick={() => handleMobileSlideChange("prev")} className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={() => handleMobileSlideChange("next")} className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Hobbies() {
    const { t } = useTranslation();
    // Mémoriser les données de localisation
    const locationData = useMemo(
        () => [
            {
                images: Paris,
                location: "France",
                cities: "Paris, Angers, Tours, Perpignan, ect...",
                flag: "https://flagcdn.com/fr.svg",
                description: "City of lights and romance",
                lat: 48.8566,
                lng: 2.3522,
            },
            {
                images: Oslo,
                location: "Norway",
                cities: "Oslo",
                flag: "https://flagcdn.com/no.svg",
                description: "Capital city with stunning fjords",
                lat: 59.9139,
                lng: 10.7522,
            },
            {
                images: Copenhagen,
                location: "Denmark",
                cities: "Aalborg, Copenhagen, aarhus, skagen, ect...",
                flag: "https://flagcdn.com/dk.svg",
                description: "City of beautiful canals and architecture",
                lat: 55.6761,
                lng: 12.5683,
            },
            {
                images: Chypre,
                location: "Cyprus",
                cities: "Paphos, Limassol, Lanarca, ect...",
                flag: "https://flagcdn.com/cy.svg",
                description: "Island country in the Eastern Mediterranean",
                lat: 35.1264,
                lng: 33.4299,
            },
            {
                images: Finland,
                location: "Finland",
                cities: "Helsinki, Rovaniemi",
                flag: "https://flagcdn.com/fi.svg",
                description: "Country of thousands of lakes and islands",
                lat: 60.1695,
                lng: 24.9354,
            },
            {
                images: Sweden,
                location: "Sweden",
                cities: "Stockholm, Göteborg",
                flag: "https://flagcdn.com/se.svg",
                description: "Land of midnight sun, forests and Nordic culture",
                lat: 60.128161,
                lng: 18.643501,
            },
            {
                images: Poland,
                location: "Poland",
                cities: "Cracovie",
                flag: "https://flagcdn.com/pl.svg",
                description: "City known for its well-preserved medieval core",
                lat: 52.2297,
                lng: 21.0122,
            },
        ],
        []
    );

    useEffect(() => {
        const imagesToPreload = [Paris, Oslo, Copenhagen, Chypre, Finland, Poland];
        const preloadImages = (images: ImageData[]) => {
            const loadPromises = images.map(image => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = image.src;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });

            Promise.all(loadPromises).catch(err => console.error("Error preloading images:", err));
        };
        preloadImages(imagesToPreload);
    }, []);

    return (
        <Section id="hobbies" className="relative h-screen">
            <div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-white z-20 pt-10">
                    <Typography variant="h2" className="text-4xl font-bold mb-4">
                        {t("hobbies.title")}
                    </Typography>
                    <div className="flex gap-4">
                        <span>{t("hobbies.subtitle.travel")}</span>
                        <span>-</span>
                        <span>{t("hobbies.subtitle.hike")}</span>
                        <span>-</span>
                        <span>{t("hobbies.subtitle.learn")}</span>
                    </div>
                </div>
                <div className="h-screen w-full">
                    <div className="hidden lg:block h-full">
                        <DesktopSlider locationData={locationData} />
                    </div>
                    <div className="lg:hidden h-full">
                        <MobileSlider locationData={locationData} />
                    </div>
                </div>
            </div>
        </Section>
    );
}
