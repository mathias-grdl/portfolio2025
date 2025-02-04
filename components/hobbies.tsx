"use client";

import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ImageData {
    src: StaticImageData | string;
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

const ImagePreloader = ({ images }: { images: ImageData[] }) => (
    <div aria-hidden="true" className="hidden">
        {images.map((image, index) => (
            <div key={index} className="relative w-0 h-0">
                <Image
                    src={image.src}
                    alt=""
                    fill
                    priority={true}
                    sizes="1px"
                    quality={85}
                />
            </div>
        ))}
    </div>
);

export default function Hobbies() {
    const { t, i18n } = useTranslation();
    const textRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lastIndexRef = useRef(0);

    const locationData: LocationData[] = [
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
    ];

    const handlePrevSlide = () => {
        const newIndex = activeIndex === 0 ? locationData.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
        lastIndexRef.current = newIndex;
    };

    const handleNextSlide = () => {
        const newIndex = activeIndex === locationData.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
        lastIndexRef.current = newIndex;
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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

                    // Animation plus rapide
                    gsap.to(".location-slide", {
                        opacity: 0,
                        duration: 0.05,
                        ease: "none",
                    });
                    gsap.to(`.location-slide:nth-child(${clampedIndex + 1})`, {
                        opacity: 1,
                        duration: 0.05,
                        ease: "none",
                    });
                }
            },
        });

        return () => scrollTrigger.kill();
    }, [locationData.length, i18n.language]);

    return (
        <Section id="hobbies" className="relative h-screen">
            <ImagePreloader images={locationData.map(loc => loc.images)} />
            <div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-white z-20 pt-10">
                    <Typography variant="h2" className="py-5">
                        {t("hobbies.title")}
                    </Typography>
                    <div className="flex gap-4">
                        <Typography variant="default">{t("hobbies.subtitle.travel")}</Typography>
                        <Typography variant="default">-</Typography>
                        <Typography variant="default">{t("hobbies.subtitle.hike")}</Typography>
                        <Typography variant="default">-</Typography>
                        <Typography variant="default">{t("hobbies.subtitle.learn")}</Typography>
                    </div>
                </div>
                <div className="relative h-screen">
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-4 lg:hidden">
                        <button onClick={handlePrevSlide} className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                            <ChevronLeft className="w-8 h-8 text-white" />
                        </button>

                        <button onClick={handleNextSlide} className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                            <ChevronRight className="w-8 h-8 text-white" />
                        </button>
                    </div>

                    <div>
                        {locationData.map((location, index) => (
                            <div
                                key={location.location}
                                className={`location-slide absolute inset-0 transition-none`}
                                style={{
                                    opacity: index === activeIndex ? 1 : 0,
                                    visibility: "visible",
                                    zIndex: 1,
                                }}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={location.images.src}
                                        alt={location.location}
                                        fill
                                        priority={index === activeIndex || index === ((activeIndex + 1) % locationData.length)}
                                        quality={85}
                                        sizes="100vw"
                                        className="object-cover"
                                        style={{ objectPosition: "50% 25%" }}
                                        loading="eager"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        ))}
                    </div>
                    <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <div className="flex flex-col items-center justify-center container mx-auto">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={locationData[activeIndex].flag}
                                        alt={`${locationData[activeIndex].location} flag`}
                                        fill
                                        priority
                                        sizes="32px"
                                        className="object-cover"
                                    />
                                </div>
                                <Typography variant="h3">{t(`hobbies.locations.${locationData[activeIndex].location.toLowerCase()}.title`)}</Typography>
                            </div>
                            <Typography variant="default" className="mb-4">
                                {t(`hobbies.locations.${locationData[activeIndex].location.toLowerCase()}.cities`)}
                            </Typography>
                            <Typography variant="quote" className="text-center">
                                {t(`hobbies.locations.${locationData[activeIndex].location.toLowerCase()}.description`)}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
