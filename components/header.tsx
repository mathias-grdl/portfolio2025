import React from "react";
import { ModeToggle } from "./dropdownTheme";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();

    return (
        <header className="relative w-screen z-[10] grid grid-cols-3 items-center pt-3 px-5">
            <h1 className="col-span-1">Mathias Grondziel</h1>

            <nav className="col-span-1 flex justify-center">
                <ul className="flex justify-between gap-2 items-center">
                    <li>
                        <Link href="/">{t("nav.about")}</Link>
                    </li>
                    <li>
                        <Link href="/">{t("nav.experiences")}</Link>
                    </li>
                    <li>
                        <Link href="/">{t("nav.projects")}</Link>
                    </li>
                    <li>
                        <Link href="/">{t("nav.contact")}</Link>
                    </li>
                </ul>
            </nav>

            <div className="col-span-1 flex justify-end gap-2 items-center">
                <ModeToggle />
                <LanguageSelector />
            </div>
        </header>
    );
}
