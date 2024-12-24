import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            img: "https://mathias-grondziel.com/assets/work/obandito-home.png",
            title: "O'bandito",
            description: "Working with useEffects and fetching with useSWR",
            tags: ["ReactJs", "Wordpress"],
        },
        {
            img: "https://www.mouvement-metropole.fr/wp-content/uploads/2024/09/les-20-lieux-incontournables-a-visiter-en-grece-un-voyage-inoubliable-au-coeur-de-la-mediterranee_66ab3ee39a7a1-scaled.jpg",
            title: "Movies finder",
            description: "Working with useEffects and fetching with useSWR",
            tags: ["ReactJs", "API"],
        },
        {
            img: "https://www.okvoyage.com/wp-content/uploads/2023/07/paysages-de-grece.jpg",
            title: "Maison Thishan",
            description: "Creating an e-commerce website for an independent perfumer",
            tags: ["E-commerce", "ReactJs"],
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0mLAKZfJN3DDn-vtDmZXc_GJ0QCJvmUQUQ&s",
            title: "TP66",
            description: "Redesign of the website for the largest construction company in the Eastern Pyrenees",
            tags: ["Construction", "Wordpress"],
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0mLAKZfJN3DDn-vtDmZXc_GJ0QCJvmUQUQ&s",
            title: "Kasa",
            description: "Kasa is my first ReactJS project aimed at showcasing different apartments",
            tags: ["ReactJs", "Real Estate"],
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
        <section id="projects" className="bg-slate-100 dark:bg-black h-screen relative" onMouseMove={handleMouseMove} ref={sectionRef}>
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
                            onMouseEnter={() => handleMouseEnter(project.img, index)}
                            onMouseLeave={handleMouseLeave}>
                            <AccordionTrigger>
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 items-center">
                                    <h3 className="col-span-1 text-3xl md:text-4xl lg:text-6xl">{project.title}</h3>
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
                                        <img className="col-span-1 object-cover size-full" src={project.img} alt={project.title} />
                                    </div>
                                    <div className="col-span-1 flex gap-2 justify-end">
                                        <Button>Link</Button>
                                        <Button>Github</Button>
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
