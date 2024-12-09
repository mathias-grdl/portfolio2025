import React from "react";
import { ModeToggle } from "./dropdownTheme";
import Link from "next/link";

export default function Header() {
    return (
        <header className="relative z-[10] flex justify-between items-center p-3">
            <h1>Mathias Grondziel</h1>

            <nav>
                <ul className="flex justify-between gap-2 items-center">
                    <li>
                        <Link href="/">About</Link>
                    </li>
                    <li>
                        <Link href="/">Contact</Link>
                    </li>
                    {/* <li>
                        <ModeToggle />
                    </li> */}
                </ul>
            </nav>
        </header>
    );
}
