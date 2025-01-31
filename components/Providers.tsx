"use client";

import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import i18next from "../app/i18n/client";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <I18nextProvider i18n={i18next}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </I18nextProvider>
    );
}
