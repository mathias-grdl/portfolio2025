import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Header from "./header";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";
import useMouseMovement from "../hooks/useMouseMovement";
import useCursorColor from "../hooks/useCursorColor";
import { Typography } from "./ui/typography";

type MouseZone = "none" | "header" | "buttons";

export default function Slider() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(2);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorColor, setCursorColor] = useState("rgba(255, 255, 255, 0.5)");
    const [hoveredIndex, setHoveredIndex] = useState(activeIndex);
    const [isMouseInSection, setIsMouseInSection] = useState(false);
    const [mouseZone, setMouseZone] = useState<MouseZone>("none");
    const sectionRef = useRef<HTMLElement>(null);

    const slides = [
        {
            url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "Travel",
            id: "hobbies",
            title: t("slides.hobbies"),
        },
        {
            url: "https://images.unsplash.com/photo-1696761354458-c6c9727d2156?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "Projects",
            title: t("slides.projects"),
            id: "projects",
        },
        {
            url: "https://images.unsplash.com/photo-1513269762479-12fa9962d31b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            // url: "https://images.unsplash.com/photo-1719952742088-9735b5ff8867?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            subTitle: "About Me",
            title: [t("hero.titlePart1"), <br key="break" />, t("hero.titlePart2")],
            id: "aboutme",
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
        return activeIndex === index ? "w-[52%] md:w-[40%]" : "w-[13%] md:w-[15%]";
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

    useKeyboardNavigation(handlePrevSlide, handleNextSlide);
    useMouseMovement(isMouseInSection, setMousePosition);
    useCursorColor(hoveredIndex, colors, setCursorColor);

    return (
        <section
            ref={sectionRef}
            className="flex overflow-hidden h-screen relative"
            onMouseEnter={() => setIsMouseInSection(true)}
            onMouseLeave={() => setIsMouseInSection(false)}>
            {isMouseInSection && mouseZone === "none" && (
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
                    {activeIndex === hoveredIndex && (
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

            <div className="absolute top-0 z-30" onMouseEnter={() => setMouseZone("header")} onMouseLeave={() => setMouseZone("none")}>
                <Header />
            </div>

            <button
                onClick={handlePrevSlide}
                onMouseEnter={() => setMouseZone("buttons")}
                onMouseLeave={() => setMouseZone("none")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <button
                onClick={handleNextSlide}
                onMouseEnter={() => setMouseZone("buttons")}
                onMouseLeave={() => setMouseZone("none")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`relative w-full ${getWidth(index)} h-screen ${getZIndex(
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
                            <Typography
                                variant="h1"
                                className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 scale-0 animate-scaleIn">
                                {slide.title}
                            </Typography>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
}
