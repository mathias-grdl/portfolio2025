import React, { useState, useEffect } from "react";
// import { ModeToggle } from "./dropdownTheme";
import Link from "next/link";
import LanguageSelector from "./theme/language-selector";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

export default function Header() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
            setIsTop(currentScrollPos < 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            gsap.to(".menu", { x: 0, duration: 0.5 });
        } else {
            gsap.to(".menu", { x: "-100%", duration: 0.5 });
        }
    };

    return (
        <header
            className={`fixed top-0 w-screen z-[100] grid grid-cols-3 items-center py-3 px-5 transition-all duration-100 ${
                visible ? "translate-y-0" : "-translate-y-full"
            } ${!isTop ? "bg-black/50 backdrop-blur-sm" : ""}`}>
            <h1 className="col-span-1 text-white">Mathias Grondziel</h1>

            <nav className="col-span-1 flex justify-center">
                <ul className="hidden md:flex justify-between gap-2 items-center">
                    <li>
                        <Link href="#aboutme" className="text-white">
                            {t("nav.about")}
                        </Link>
                    </li>
                    <li>
                        <Link href="#experiences" className="text-white">
                            {t("nav.experiences")}
                        </Link>
                    </li>
                    <li>
                        <Link href="#projects" className="text-white">
                            {t("nav.projects")}
                        </Link>
                    </li>
                    <li>
                        <Link href="#contact" className="text-white">
                            {t("nav.contact")}
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="col-span-1 flex justify-end gap-2 items-center">
                {/* <ModeToggle /> */}
                <LanguageSelector />
                <button className="md:hidden text-white" onClick={toggleMenu}>
                    ☰
                </button>
            </div>

            <div className={`menu fixed top-0 left-0 w-full h-screen bg-black transform -translate-x-full md:hidden ${menuOpen ? "block" : "hidden"} z-[101]`}>
                <button className="absolute top-5 right-5 text-white text-xl" onClick={toggleMenu}>
                    ✕
                </button>
                <ul className="flex flex-col items-center justify-center h-full gap-8">
                    <li>
                        <Link href="#aboutme" className="text-white" onClick={toggleMenu}>
                            {t("nav.about")}
                        </Link>
                    </li>
                    <li>
                        <Link href="#experiences" className="text-white" onClick={toggleMenu}>
                            {t("nav.experiences")}
                        </Link>
                    </li>
                    <li>
                        <Link href="#projects" className="text-white" onClick={toggleMenu}>
                            {t("nav.projects")}
                        </Link>
                    </li>
                    <li>
                        <Link href="#contact" className="text-white" onClick={toggleMenu}>
                            {t("nav.contact")}
                        </Link>
                    </li>
                    <li>
                        {/* <ModeToggle /> */}
                        <LanguageSelector />
                    </li>
                </ul>
            </div>
        </header>
    );
}
