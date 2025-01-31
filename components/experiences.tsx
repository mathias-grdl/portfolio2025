import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from "./ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Section from "./Section";
import { useTranslation } from "react-i18next";
import { Typography } from "./ui/typography";
import Image from "next/image";

// Types
interface Experience {
    id: string;
    yearRange: string;
    title: string;
    imageUrl: string;
    type: string;
    description: string;
    btnName?: string;
    btnLink?: string;
    localisation?: string;
    localisationLink?: string;
}

// Sous-composants
const ExperienceTitle = ({ 
    yearRange, 
    title, 
    isVisible, 
    onClick 
}: { 
    yearRange: string; 
    title: string; 
    isVisible: boolean; 
    onClick: () => void; 
}) => (
    <div
        className={`my-2 md:my-5 ps-2 cursor-pointer ${
            isVisible ? "active text-blue-500 border-s-2 border-s-blue-500" : ""
        }`}
        onClick={onClick}
    >
        <Typography variant="small">{yearRange}</Typography>
        <Typography variant="h3" className={`${isVisible ? "active text-blue-500" : ""}`}>
            {title}
        </Typography>
    </div>
);

// Mise à jour du composant ExperienceImage pour utiliser le statut de chargement
const ExperienceImage = ({ imageUrl, isVisible }: { imageUrl: string; isVisible: boolean }) => (
    <div className="flex justify-center items-center">
        {isVisible ? (
            <div className="relative w-full h-[300px] md:h-screen md:absolute md:top-0 md:w-[220px] xl:w-[400px]">
                <Image 
                    src={imageUrl} 
                    alt="Experience illustration"
                    fill
                    priority
                    loading="eager" // Force le chargement immédiat
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 220px, 400px"
                    className="object-cover"
                    quality={85}
                />
            </div>
        ) : (
            <div className="h-full md:top-0" />
        )}
    </div>
);

const ExperienceDetails = ({
    description,
    btnName,
    btnLink,
    localisation,
    localisationLink
}: Partial<Experience>) => (
    <div>
        <div className="my-2 md:my-5 md:absolute md:top-[50px] md:right-0">
            {localisation && (
                <Link href={localisationLink || ""} target="_blank" className="flex items-center justify-center gap-1">
                    <MapPin />
                    <Typography variant="small">{localisation}</Typography>
                </Link>
            )}
        </div>
        <div className="md:absolute md:top-1/4 md:right-0 md:w-[220px] lg:w-[300px] pb-5 md:pb-0 py-5">
            <Typography variant="p" className="text-justify">{description}</Typography>
            {btnName && btnLink && (
                <div className="flex justify-center pt-5">
                    <Button asChild>
                        <Link target="_blank" href={btnLink}>{btnName}</Link>
                    </Button>
                </div>
            )}
        </div>
    </div>
);

// Composant de préchargement modifié
const ImagePreloader = ({ images }: { images: string[] }) => (
    <div aria-hidden="true" className="hidden">
        {images.map((src, index) => (
            <div key={index} className="relative w-0 h-0">
                <Image
                    src={src}
                    alt=""
                    fill
                    priority={true}
                    sizes="1px"
                />
            </div>
        ))}
    </div>
);

export default function Experiences() {
    const { t, i18n } = useTranslation();
    const [visibleImage, setVisibleImage] = useState<string>("image1");
    const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

    const experiences: Experience[] = [
        {
            id: "image1",
            yearRange: "2024 - 2025",
            title: t("experiences.items.radioAnalyzer.title"),
            imageUrl: "https://img.static-kl.com/images/media/14503BF4-AEAD-481C-8987FC06F3D8C704?w=1280",
            type: "Developer",
            description: t("experiences.items.radioAnalyzer.description"),
            btnName: t("experiences.items.radioAnalyzer.btnText"),
            btnLink: "https://radioanalyzer.com/",
            localisation: "Aalborg, Danmark",
            localisationLink: "https://maps.app.goo.gl/Xmw69RrVu6f7g8Gr9",
        },
        {
            id: "image2",
            yearRange: "2023 - 2025",
            title: t("experiences.items.freelance.title"),
            imageUrl:
                "https://images.unsplash.com/photo-1609185271997-ec976c17a0bc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Developer",
            description: t("experiences.items.freelance.description"),
            btnName: t("experiences.items.freelance.btnText"),
            btnLink: "https://fr.fiverr.com/mathias_grdl",
            localisation: "Perpignan, France",
            localisationLink: "https://maps.app.goo.gl/XMS3wHD4gtgjTh949",
        },
        {
            id: "image3",
            yearRange: "2022 - 2023",
            title: t("experiences.items.kori.title"),
            imageUrl:
                "https://images.unsplash.com/photo-1722605267048-a5389a97b20c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Developer",
            description: t("experiences.items.kori.description"),
            btnName: t("experiences.items.kori.btnText"),
            btnLink: "https://www.agence-kori.fr/",
            localisation: "Perpignan, France",
            localisationLink: "https://maps.app.goo.gl/XMS3wHD4gtgjTh949",
        },
        {
            id: "image4",
            yearRange: "2021 - 2022",
            title: t("experiences.items.vendeurPolyvalent.title"),
            imageUrl:
                "https://images.unsplash.com/photo-1724599685287-299a6412b92a?q=80&w=1820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Other",
            description: t("experiences.items.vendeurPolyvalent.description"),
            localisation: "Tours, France",
            localisationLink: "https://maps.app.goo.gl/sWHUhPvJCDXNgZuf8",
        },
        {
            id: "image5",
            yearRange: "2018 - 2022",
            title: t("experiences.items.uberEats.title"),
            imageUrl:
                "https://images.unsplash.com/photo-1643549811064-adf938a5ca40?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Other",
            description: t("experiences.items.uberEats.description"),
            localisation: "Angers, France",
            localisationLink: "https://maps.app.goo.gl/rZLxanLae3eHcG3T7",
        },
    ];

    const initializeScrollTrigger = () => {
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            scrollTriggersRef.current.forEach(trigger => trigger.kill());

            const sectionHeight = window.innerHeight;
            const totalHeight = sectionHeight * experiences.length;

            const trigger = ScrollTrigger.create({
                trigger: "#experiences",
                start: "top top",
                end: `+=${totalHeight}px`,
                pin: true,
                pinSpacing: true,
                snap: {
                    snapTo: 1 / (experiences.length - 1),
                    duration: { min: 0.2, max: 0.3 },
                    delay: 0,
                    ease: "power1.inOut",
                },
                scrub: 0.5,
                onUpdate: self => {
                    // Arrondir à la position discrète la plus proche
                    const snapIncrement = 1 / (experiences.length - 1);
                    const snapPosition = Math.round(self.progress / snapIncrement) * snapIncrement;
                    const index = Math.round(snapPosition * (experiences.length - 1));
                    setVisibleImage(`image${index + 1}`);
                },
            });

            scrollTriggersRef.current = [trigger];
            return () => trigger.kill();
        });

        return () => {
            mm.revert();
            scrollTriggersRef.current.forEach(trigger => trigger.kill());
        };
    };

    useEffect(() => {
        // Register both plugins
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        return initializeScrollTrigger();
    }, [i18n.language]);

    const handleTitleClick = (imageId: string) => {
        const index = parseInt(imageId.replace("image", "")) - 1;
        setVisibleImage(imageId);

        if (window.innerWidth >= 768 && scrollTriggersRef.current[0]) {
            const trigger = scrollTriggersRef.current[0];
            const exactPosition = index / (experiences.length - 1);
            const targetScroll = trigger.start + (trigger.end - trigger.start) * exactPosition;

            // Utiliser ScrollToPlugin correctement
            gsap.to(window, {
                duration: 0.5,
                ease: "power2.inOut",
                scrollTo: {
                    y: targetScroll,
                    autoKill: false
                },
                onComplete: () => ScrollTrigger.refresh()
            });
        }
    };

    return (
        <Section id="experiences" className="bg-slate-100 dark:bg-black h-full md:h-screen">
            <ImagePreloader images={experiences.map(exp => exp.imageUrl)} />
            <div className="flex flex-col container mx-auto">
                <div className="relative w-full pt-5">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 md:pt-0">
                            <div className="flex flex-col pt-5">
                                <ExperienceTitle
                                    yearRange={exp.yearRange}
                                    title={exp.title}
                                    isVisible={visibleImage === exp.id}
                                    onClick={() => handleTitleClick(exp.id)}
                                />
                            </div>
                            <ExperienceImage
                                imageUrl={exp.imageUrl}
                                isVisible={visibleImage === exp.id}
                            />
                            {visibleImage === exp.id && (
                                <ExperienceDetails {...exp} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
