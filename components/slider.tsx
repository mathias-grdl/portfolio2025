import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Header from "./header";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function Slider() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(2);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorColor, setCursorColor] = useState("rgba(255, 255, 255, 0.5)");
    const [hoveredIndex, setHoveredIndex] = useState(activeIndex);
    const [isMouseInSection, setIsMouseInSection] = useState(false);
    const [isMouseOnHeader, setIsMouseOnHeader] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const slides = [
        {
            url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "Travel",
            id: "travel",
            title: t("slides.hobbies"),
        },
        {
            url: "https://images.unsplash.com/photo-1598903747246-f663f6fe93c0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "Projects",
            title: t("slides.projects"),
            id: "projects",
        },
        {
            url: "https://images.unsplash.com/photo-1441786485319-5e0f0c092803?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "About Me",
            title: [t("hero.titlePart1"), <br key="break" />, t("hero.titlePart2")],
            id: "aboutMe",
        },
        {
            url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "Experiences",
            id: "experiences",
            title: t("slides.experiences"),
        },
        {
            url: "https://images.unsplash.com/photo-1639153697189-04bc5d043f64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: t("slides.contact"),
            subTitle: "Contact",
            id: "contact",
        },
    ];

    const colors = ["rgba(255, 165, 0, 0.5)", "rgba(0, 128, 255, 0.5)", "rgba(255, 255, 255, 0.5)", "rgba(255, 192, 203, 0.5)", "rgba(144, 238, 144, 0.5)"];

    const getWidth = (index: number) => {
        return activeIndex === index ? "md:w-[40%]" : "md:w-[15%]";
    };

    const getHeight = (index: number) => {
        return activeIndex === index ? "h-[40%]" : "h-[15%]";
    };

    const getOpacity = (index: number) => {
        return activeIndex === index ? "opacity-30" : "opacity-65";
    };

    const getZIndex = (index: number) => {
        return activeIndex === index ? "z-20" : "z-10";
    };

    const handleClick = (index: number) => {
        if (activeIndex === index) {
            const element = document.getElementById(slides[index].id);
            element?.scrollIntoView({ behavior: "smooth" });
        } else {
            setActiveIndex(index);
        }
    };

    const handlePrevSlide = () => {
        setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                handlePrevSlide();
            } else if (event.key === "ArrowRight") {
                handleNextSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isMouseInSection) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMouseInSection]);

    useEffect(() => {
        setCursorColor(colors[hoveredIndex]);
    }, [hoveredIndex]);

    return (
        <section
            ref={sectionRef}
            className="flex flex-col md:flex-row overflow-hidden h-screen relative"
            onMouseEnter={() => setIsMouseInSection(true)}
            onMouseLeave={() => setIsMouseInSection(false)}>
            {isMouseInSection && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            left: mousePosition.x,
                            top: mousePosition.y,
                            width: "50px",
                            height: "50px",
                            backgroundColor: cursorColor,
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none",
                            zIndex: 100,
                            transition: "background-color 0.2s ease",
                        }}
                    />
                    {!isMouseOnHeader && activeIndex === hoveredIndex && (
                        <div
                            style={{
                                position: "fixed",
                                left: mousePosition.x,
                                top: mousePosition.y,
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                                zIndex: 101,
                            }}>
                            <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                        </div>
                    )}
                </>
            )}

            <div className="absolute top-0 z-30" onMouseEnter={() => setIsMouseOnHeader(true)} onMouseLeave={() => setIsMouseOnHeader(false)}>
                <Header />
            </div>

            <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`relative w-full ${getWidth(index)} ${getHeight(index)} md:h-screen ${getZIndex(
                        // className={`relative w-full md:${getWidth(index)} ${getHeight(index)} md:h-screen ${getZIndex(
                        index
                    )} cursor-none transition-all duration-500 ease-in-out hover:scale-105 overflow-visible`}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(activeIndex)}>
                    <div className="relative h-full w-full">
                        <img src={slide.url} alt={slide.subTitle} className="object-cover size-full" />
                    </div>
                    <div className={`absolute inset-0 bg-black ${getOpacity(index)} transition-opacity duration-500`}></div>
                    {activeIndex === index && (
                        <>
                            <h1 className="uppercase text-3xl md:xl:text-4xl lg:text-6xl xl:text-9xl whitespace-nowrap text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 scale-0 animate-scaleIn">
                                {slide.title}
                            </h1>
                            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1/2 flex items-end justify-center pb-8 z-30">
                                <div className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all animate-bounce">
                                    <ChevronDown className="w-8 h-8 text-white" />
                                </div>
                            </div> */}
                        </>
                    )}
                </div>
            ))}
        </section>
    );
}
