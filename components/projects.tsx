import React, { useState, useEffect, useRef } from "react";
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
            title: "O'bandito",
            description:
                "O'bandito is a web platform connecting musicians with event organizers, developed over 4 weeks as part of a professional certification project. Built collaboratively with a team of 3 developers (2 frontend, 1 backend).",
            tags: ["ReactJs", "API GraphQL", "Figma"],
        },
        {
            img: MoviesFinder,
            title: "Movies finder",
            description:
                "A movie search platform built with React, leveraging an external API for real-time movie data. Features dynamic search, movie details display, and responsive design using useEffect and useSWR for efficient data fetching.",
            tags: ["ReactJs", "API"],
            link: "https://movie-search-hub.netlify.app/?s=Jumanji",
            github: "https://github.com/mathias-grdl/BeginReact-Workshop-UseEffect",
        },
        {
            img: Thishan,
            title: "Maison Thishan",
            description:
                "A fully custom WordPress e-commerce website built from scratch for an independent perfumer. Features bespoke theme development, custom product catalog, and tailored checkout process without using pre-made themes.",
            tags: ["Wordpress", "E-commerce"],
            link: "https://maisonthishan.com/",
        },
        {
            img: Tp66,
            title: "TP66",
            description: "Redesign of the website for the largest construction company in the Eastern Pyrenees",
            tags: ["Wordpress"],
            link: "https://www.travaux-publics-66.fr/",
        },
        {
            img: Kasa,
            title: "Kasa",
            description: "Kasa is my first ReactJS project aimed at showcasing different apartments",
            tags: ["ReactJs"],
            link: "https://p7-kasa-openclassrooms.netlify.app/",
            github: "https://github.com/mathias-grdl/P7-Kasa-Openclassrooms",
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
                                    <h3 className={`col-span-1 text-3xl md:text-4xl lg:text-6xl ${activeIndex === index ? "text-blue-500" : ""} no-underline`}>
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
                                    <span className="col-span-1">{project.description}</span>
                                    <div className="w-full h-[200px]">
                                        <img className="col-span-1 object-cover size-full" src={project.img.src} alt={project.title} />
                                    </div>
                                    <div className="col-span-1 flex gap-2 justify-end">
                                        {project.link ? (
                                            <Button asChild>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                    Link
                                                </a>
                                            </Button>
                                        ) : null}
                                        {project.github ? (
                                            <Button asChild>
                                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                    Github
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
