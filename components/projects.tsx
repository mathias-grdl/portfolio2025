import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Obandito from "../public/assets/projects/obandito.png";
import Nda from '@/public/assets/projects/NDA.png';
import Tp66 from "../public/assets/projects/tp66.png";
import Lotostats from "@/public/assets/projects/lotostats.png";
import VehiclesApi from "@/public/assets/projects/vehicles-api.png";
import { Typography } from "./ui/typography";
import Image from "next/image";
import type { StaticImageData } from "next/image";

const ImagePreloader = ({ images }: { images: StaticImageData[] }) => (
    <div aria-hidden="true" className="hidden">
        {images.map((image, index) => (
            <div key={index} className="relative w-0 h-0">
                <Image
                    src={image}
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

export default function Projects() {
    const { t, i18n } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const projectsRef = useRef<HTMLDivElement[]>([]);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const projects = [
        {
            img: Nda,
            title: t("projects.items.radioanalyzer.title"),
            description: t("projects.items.radioanalyzer.description"),
            tags: ["ReactJs", "SaaS", "Figma"],
            link: "https://radioanalyzer.com/",
            github: "",
            project: t("projects.items.radioanalyzer.project"),
        },
        {
            img: Obandito,
            title: t("projects.items.obandito.title"),
            description: t("projects.items.obandito.description"),
            tags: t("projects.items.obandito.tags", { returnObjects: true }) as string[],
            project: t("projects.items.obandito.project"),
        },
        {
            img: Tp66,
            title: t("projects.items.tp66.title"),
            description: t("projects.items.tp66.description"),
            tags: ["Wordpress", "Bootstrap"],
            link: "https://www.travaux-publics-66.fr/",
            project: t("projects.items.tp66.project"),
        },
        {
            img: Lotostats,
            title: t("projects.items.lotostats.title"),
            description: t("projects.items.lotostats.description"),
            tags: ["NextJS", "TypeScript", "NeonDB", "Tailwind CSS"],
            link: "https://rosaliablake.com/",
            project: t("projects.items.lotostats.project"),
        },
        {
            img: VehiclesApi,
            title: t("projects.items.vehiclesApi.title"),
            description: t("projects.items.vehiclesApi.description"),
            tags: ["NodeJS", "Express", "Jest"],
            link: "https://api-vehicles-nodejs.netlify.app/api-docs",
            github: "https://github.com/mathias-grdl/api-Vehicles-NodeJS",
            project: t("projects.items.vehiclesApi.project"),
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }

            const trigger = ScrollTrigger.create({
                trigger: "#projects",
                start: "top top",
                end: `+=${projects.length * window.innerHeight}px`,
                pin: true,
                pinSpacing: true,
                snap: {
                    snapTo: 1 / (projects.length - 1),
                    duration: { min: 0.2, max: 0.3 },
                    delay: 0,
                    ease: "power1.inOut",
                },
                scrub: 0.5,
                onUpdate: self => {
                    const snapIncrement = 1 / (projects.length - 1);
                    const snapPosition = Math.round(self.progress / snapIncrement) * snapIncrement;
                    const index = Math.round(snapPosition * (projects.length - 1));
                    setActiveIndex(index);
                },
            });

            scrollTriggerRef.current = trigger;
            return () => trigger.kill();
        });

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
            mm.revert();
        };
    }, [i18n.language, projects.length]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (img: string, index: number) => {
        if (index !== activeIndex) {
            setHoveredProject(img);
        }
    };

    const handleMouseLeave = () => {
        setHoveredProject(null);
    };

    const handleAccordionChange = (value: string) => {
        const newIndex = Number(value.split("-")[1]);
        setActiveIndex(newIndex);

        if (window.innerWidth >= 768 && scrollTriggerRef.current) {
            const trigger = scrollTriggerRef.current;
            const exactPosition = newIndex / (projects.length - 1);
            const targetScroll = trigger.start + (trigger.end - trigger.start) * exactPosition;

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
        <section
            id="projects"
            className="bg-slate-100 dark:bg-black h-full md:h-screen relative flex items-center justify-center"
            onMouseMove={handleMouseMove}
            ref={sectionRef}>
            <ImagePreloader images={projects.map(project => project.img)} />
            {hoveredProject && (
                <div
                    className="absolute pointer-events-none hidden md:block"
                    style={{
                        top: mousePosition.y,
                        left: mousePosition.x,
                        transform: "translate(-50%, -50%)",
                    }}>
                    <div className="relative w-32 h-32">
                        <Image
                            src={hoveredProject}
                            alt="Hovered Project Preview"
                            fill
                            sizes="128px"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}
            <div className="container mx-auto">
                <Accordion type="single" collapsible value={`item-${activeIndex}`} onValueChange={handleAccordionChange}>
                    {projects.map((project, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            ref={el => (projectsRef.current[index] = el!)}
                            onMouseEnter={() => handleMouseEnter(project.img.src, index)}
                            onMouseLeave={handleMouseLeave}>
                            <AccordionTrigger>
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 items-center">
                                    <Typography
                                        variant="h3"
                                        className={`col-span-1 text-3xl md:text-4xl lg:text-5xl ${activeIndex === index ? "text-blue-500" : ""} no-underline`}>
                                        {project.title}
                                    </Typography>
                                    <div className="col-span-1 flex gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 items-center">
                                    <div>
                                        <Typography variant="lead" className="pb-5">
                                            {project.project}
                                        </Typography>
                                        <Typography variant="p" className="col-span-1 text-justify md:text-left">
                                            {project.description}
                                        </Typography>
                                    </div>
                                    <div className="relative w-full h-[200px]">
                                        <Image
                                            src={project.img}
                                            alt={project.title}
                                            fill
                                            priority={index === activeIndex}
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="col-span-1 flex gap-2 justify-end">
                                        {project.link ? (
                                            <Button asChild>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                    {t("projects.link")}
                                                </a>
                                            </Button>
                                        ) : null}
                                        {project.github ? (
                                            <Button asChild>
                                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                    {t("projects.github")}
                                                </a>
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
