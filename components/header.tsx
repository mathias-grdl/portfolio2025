import React, { useState } from "react";
// import { ModeToggle } from "./dropdownTheme";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

export default function Header() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            gsap.to(".menu", { x: 0, duration: 0.5 });
        } else {
            gsap.to(".menu", { x: "-100%", duration: 0.5 });
        }
    };

    return (
        <header className="relative w-screen z-[10] grid grid-cols-3 items-center pt-3 px-5">
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

            <div className={`menu fixed top-0 left-0 w-full h-full bg-black transform -translate-x-full md:hidden ${menuOpen ? "block" : "hidden"} z-[20]`}>
                <button className="absolute top-5 right-5 text-white" onClick={toggleMenu}>
                    ✕
                </button>
                <ul className="flex flex-col items-center justify-center h-full gap-4">
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
