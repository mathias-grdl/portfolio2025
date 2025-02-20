import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import LoadingScreen from "@/components/LoadingScreen";

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: "Mathias Grondziel",
    description: "Portfolio of Mathias Grondziel, a front-end developer reactjs.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sora.variable} ${manrope.variable} font-sans antialiased bg-neutral-50 dark:bg-zinc-900`}>
                <Providers>
                    <LoadingScreen />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
