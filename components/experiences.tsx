import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Section from "./Section";
import { useTranslation } from "react-i18next";
import { Typography } from "./ui/typography";

export default function Experiences() {
    const { t, i18n } = useTranslation();
    const [visibleImage, setVisibleImage] = useState<string | null>("image1");
    const sectionRef = useRef<HTMLDivElement>(null);
    const experiencesRef = useRef<HTMLDivElement[]>([]);
    const titleRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (window.innerWidth >= 768) {
            ScrollTrigger.create({
                trigger: "#experiences",
                start: "top top",
                end: `+=${experiences.length * window.innerHeight}`,
                pin: true,
                pinSpacing: true,
            });
        }

        experiences.forEach((exp, index) => {
            const sectionHeight = window.innerHeight;
            ScrollTrigger.create({
                trigger: experiencesRef.current[index],
                start: `top+=${index * sectionHeight} center`,
                end: `top+=${(index + 1) * sectionHeight} center`,
                onEnter: () => setVisibleImage(exp.id),
                onEnterBack: () => {
                    if (index > 0) {
                        setVisibleImage(experiences[index - 1].id);
                    }
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [i18n.language]);

    const experiences = [
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

    const handleImageVisibility = (imageId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setVisibleImage(imageId);
        if (window.innerWidth < 768) {
            setTimeout(() => {
                titleRefs.current[imageId]?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    const renderImageSection = (
        imageId: string,
        yearRange: string,
        title: string,
        imageUrl: string,
        description: string,
        btnName?: string,
        btnLink?: string,
        localisation?: string,
        localisationLink?: string
    ) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 md:pt-0">
            <div className="flex flex-col">
                <a
                    href="#"
                    ref={el => (titleRefs.current[imageId] = el)}
                    className={`my-2 md:my-5 ps-2 ${visibleImage === imageId ? "active text-blue-500 border-s-2 border-s-blue-500" : ""}`}
                    onClick={e => handleImageVisibility(imageId, e)}>
                    <Typography variant="small">{yearRange}</Typography>
                    <Typography variant="h3" className={`${visibleImage === imageId ? "active text-blue-500" : ""}`}>
                        {title}
                    </Typography>
                </a>
            </div>
            <div className="flex justify-center items-center">
                {visibleImage === imageId ? (
                    <>
                        <img src={imageUrl} alt="" className="object-cover w-full h-[300px] md:h-screen md:absolute md:top-0 md:w-[220px] xl:w-[400px]" />
                    </>
                ) : (
                    <div className="h-full md:top-0"></div>
                )}
            </div>
            {visibleImage === imageId && (
                <>
                    <div className="my-2 md:my-5 md:absolute md:top-0 md:right-0 ">
                        <Link href={localisationLink ? localisationLink : ""} target="_blank" className="flex gap-1">
                            <MapPin />
                            <Typography variant="small">{localisation}</Typography>
                        </Link>
                    </div>
                    <div className="md:absolute md:top-1/4 md:right-0 md:w-[220px] lg:w-[300px] pb-5 md:pb-0">
                        <Typography variant="p" className="text-justify">
                            {description}
                        </Typography>
                        {btnName && btnLink && (
                            <div className="flex justify-center pt-5">
                                <Button asChild>
                                    <Link target="_blank" href={btnLink}>
                                        {btnName}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div ref={sectionRef}>
            <Section id="experiences" className="bg-slate-100 dark:bg-black h-full md:h-screen">
                <div className="flex flex-col container mx-auto">
                    <div className="gap-4">
                        <div className="relative w-full pt-5">
                            {experiences.map((exp, index) => (
                                <div key={exp.id} ref={el => (experiencesRef.current[index] = el!)}>
                                    {renderImageSection(
                                        exp.id,
                                        exp.yearRange,
                                        exp.title,
                                        exp.imageUrl,
                                        exp.description,
                                        exp.btnName,
                                        exp.btnLink,
                                        exp.localisation,
                                        exp.localisationLink
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
