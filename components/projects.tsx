import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Obandito from "../public/assets/projects/obandito.png";
import Thishan from "../public/assets/projects/thishan.png";
import MoviesFinder from "../public/assets/projects/moviesFinder.png";
import Kasa from "../public/assets/projects/kasa.png";
import Tp66 from "../public/assets/projects/tp66.png";

export default function Projects() {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const projectsRef = useRef<HTMLDivElement[]>([]);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 0.8,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        ScrollTrigger.create({
            trigger: "#projects",
            start: "top top",
            end: `+=${projects.length * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
        });

        projects.forEach((_, index) => {
            const sectionHeight = window.innerHeight;
            ScrollTrigger.create({
                trigger: projectsRef.current[index],
                start: `top+=${index * sectionHeight} center`,
                end: `top+=${(index + 1) * sectionHeight} center`,
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index),
            });
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    const projects = [
        {
            img: Obandito,
            title: t("projects.items.obandito.title"),
            description: t("projects.items.obandito.description"),
            tags: t("projects.items.obandito.tags", { returnObjects: true }) as string[],
            project: t("projects.items.obandito.project"),
        },
        {
            img: MoviesFinder,
            title: t("projects.items.moviesFinder.title"),
            description: t("projects.items.moviesFinder.description"),
            tags: ["ReactJs", "API"],
            link: "https://movie-search-hub.netlify.app/?s=Jumanji",
            github: "https://github.com/mathias-grdl/BeginReact-Workshop-UseEffect",
            project: t("projects.items.moviesFinder.project"),
        },
        {
            img: Thishan,
            title: t("projects.items.thishan.title"),
            description: t("projects.items.thishan.description"),
            tags: ["Wordpress", "E-commerce"],
            link: "https://maisonthishan.com/",
            project: t("projects.items.thishan.project"),
        },
        {
            img: Tp66,
            title: t("projects.items.tp66.title"),
            description: t("projects.items.tp66.description"),
            tags: ["Wordpress"],
            link: "https://www.travaux-publics-66.fr/",
            project: t("projects.items.tp66.project"),
        },
        {
            img: Kasa,
            title: t("projects.items.kasa.title"),
            description: t("projects.items.kasa.description"),
            tags: ["ReactJs"],
            link: "https://p7-kasa-openclassrooms.netlify.app/",
            github: "https://github.com/mathias-grdl/P7-Kasa-Openclassrooms",
            project: t("projects.items.kasa.project"),
        },
    ];

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
        setHoveredProject(null);
    };

    return (
        <section id="projects" className="bg-slate-100 dark:bg-black h-full md:h-screen relative" onMouseMove={handleMouseMove} ref={sectionRef}>
            {hoveredProject && (
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: mousePosition.y,
                        left: mousePosition.x,
                        transform: "translate(-50%, -50%)",
                    }}>
                    <img src={hoveredProject} alt="Hovered Project" className="w-32 h-32 object-cover" />
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
                                    <h3 className={`col-span-1 text-3xl md:text-4xl lg:text-5xl ${activeIndex === index ? "text-blue-500" : ""} no-underline`}>
                                        {project.title}
                                    </h3>
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
                                        <h4 className="text-xl bold pb-5">{project.project}</h4>
                                        <span className="col-span-1 text-justify md:text-left">{project.description}</span>
                                    </div>
                                    <div className="w-full h-[200px]">
                                        <img className="col-span-1 object-cover size-full" src={project.img.src} alt={project.title} />
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
