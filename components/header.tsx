import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSelector from "./theme/language-selector";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { Typography } from "./ui/typography";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function Header() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isTop, setIsTop] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const lenis = useSmoothScroll();
    const scrollToSectionFn = useScrollToSection(lenis);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (!isHovered) {
                setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            }
            setPrevScrollPos(currentScrollPos);
            setIsTop(currentScrollPos < 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            gsap.to(".menu", { x: 0, duration: 0.5 });
        } else {
            gsap.to(".menu", { x: "-100%", duration: 0.5 });
        }
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        if (!href) return;

        scrollToSectionFn(href);

        if (menuOpen) {
            toggleMenu();
        }
    };

    return (
        <header
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`fixed top-0 w-full grid grid-cols-3 items-center py-3 px-5 transition-all duration-100 ${visible ? "translate-y-0" : "-translate-y-full"
                } ${!isTop ? "bg-black/50 backdrop-blur-sm" : ""}`}>
            <Typography variant="link" className="col-span-1 text-white whitespace-nowrap">
                Mathias Grondziel
            </Typography>

            <nav className="col-span-1 flex justify-center">
                <ul className="hidden md:flex justify-between gap-2 items-center">
                    <li>
                        <Typography variant="link" as={Link} href="#aboutme" className="text-white" onClick={handleLinkClick}>
                            {t("nav.about")}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="link" as={Link} href="#experiences" className="text-white" onClick={handleLinkClick}>
                            {t("nav.experiences")}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="link" as={Link} href="#projects" className="text-white" onClick={handleLinkClick}>
                            {t("nav.projects")}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="link" as={Link} href="#contact" className="text-white" onClick={handleLinkClick}>
                            {t("nav.contact")}
                        </Typography>
                    </li>
                </ul>
            </nav>

            <div className="col-span-1 flex justify-end gap-2 items-center z-10">
                <div className="hidden md:block">
                    <LanguageSelector />
                </div>
                <button className="md:hidden w-6 h-6 relative focus:outline-none" onClick={toggleMenu}>
                    <span
                        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                            }`}></span>
                    <span
                        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"
                            }`}></span>
                    <span
                        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                            }`}></span>
                </button>
            </div>

            <div className={`menu fixed top-0 left-0 w-full h-screen bg-black transform -translate-x-full md:hidden ${menuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col items-center justify-center h-full gap-8">
                    <li>
                        <Typography variant="link" as={Link} href="#aboutme" className="text-white" onClick={handleLinkClick}>
                            {t("nav.about")}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="link" as={Link} href="#experiences" className="text-white" onClick={handleLinkClick}>
                            {t("nav.experiences")}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="link" as={Link} href="#projects" className="text-white" onClick={handleLinkClick}>
                            {t("nav.projects")}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="link" as={Link} href="#contact" className="text-white" onClick={handleLinkClick}>
                            {t("nav.contact")}
                        </Typography>
                    </li>
                    <li>
                        <LanguageSelector />
                    </li>
                </ul>
            </div>
        </header>
    );
}
