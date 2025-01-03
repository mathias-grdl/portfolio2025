/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import ReactJs from "../public/assets/logos/reactjs.svg";
import Bootstrap5 from "../public/assets/logos/bootstrap5.svg";
import Tailwindcss from "../public/assets/logos/tailwindcss.svg";
import Wordpress from "../public/assets/logos/wordpress.svg";
import Typescript from "../public/assets/logos/typescript.svg";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useCanvas } from "../hooks/useCanvas";
import Section from "../components/Section";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./animations/TextReveal";
import ProfilPicture from "../public/assets/aboutme/mathiasBandW1.png";
import { useTranslation } from "react-i18next";

const AboutMe = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { canvasRef, showText, hasDrawn, resetCanvas } = useCanvas();
    const { t } = useTranslation();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            syncTouch: false,
            touchInertiaMultiplier: 0.8,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (sectionRef.current) {
            const sectionPin = ScrollTrigger.create({
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: "+=100%",
                pinSpacing: true,
            });
        }

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="h-full md:h-screen">
            <Section id="aboutme" className="dark:bg-neutral-950">
                <div className="flex flex-col container mx-auto">
                    <div className="m-5 text-center md:text-start">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl ">Mathias Grondziel</h2>
                        <span>{t("aboutme.role")}</span>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 mx-5 relative border-2 border-white">
                            <button
                                onClick={resetCanvas}
                                disabled={!hasDrawn}
                                className={`absolute top-4 right-4 z-30 p-2 rounded-full backdrop-blur-sm transition-all ${
                                    hasDrawn ? "bg-white/10 hover:bg-white/20 cursor-pointer" : "bg-white/5 cursor-not-allowed"
                                }`}
                                title={t("aboutme.resetCanvas")}>
                                <RefreshCw className={`w-6 h-6 ${hasDrawn ? "text-white" : "text-white/50"}`} />
                            </button>
                            <img
                                ref={imageRef}
                                src={ProfilPicture.src}
                                alt="profil"
                                className="object-cover w-full h-[300px] md:h-[500px] absolute top-0 left-0"
                            />
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={500}
                                className="relative z-10 w-full h-[300px] md:h-[500px] cursor-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJrZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTQuNjIyIDE3Ljg5Ny0xMC42OC0yLjkxMyIvPjxwYXRoIGQ9Ik0xOC4zNzYgMi42MjJhMSAxIDAgMSAxIDMuMDAyIDMuMDAyTDE3LjM2IDkuNjQzYS41LjUgMCAwIDAgMCAuNzA3bC45NDQuOTQ0YTIuNDEgMi40MSAwIDAgMSAwIDMuNDA4bC0uOTQ0Ljk0NGEuNS41IDAgMCAxLS43MDcgMEw4LjM1NCA3LjM0OGEuNS41IDAgMCAxIDAtLjcwN2wuOTQ0LS45NDRhMi40MSAyLjQxIDAgMCAxIDMuNDA4IDBsLjk0NC45NDRhLjUuNSAwIDAgMCAuNzA3IDB6Ii8+PHBhdGggZD0iTTkgOGMtMS44MDQgMi43MS0zLjk3IDMuNDYtNi41ODMgMy45NDhhLjUwNy41MDcgMCAwIDAtLjMwMi44MTlsNy4zMiA4Ljg4M2ExIDEgMCAwIDAgMS4xODUuMjA0QzEyLjczNSAyMC40MDUgMTYgMTYuNzkyIDE2IDE1Ii8+PC9zdmc+)_12_12,auto]"
                            />
                            {showText && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-4xl font-bold pointer-events-none text-center">
                                    {t("aboutme.drawMe")}
                                </div>
                            )}
                        </div>

                        <div className="relative md:w-1/2 m-5 flex flex-col justify-between">
                            <TextReveal className="text-neutral-50 leading-7 text-justify">{t("aboutme.description")}</TextReveal>
                            <div className="flex justify-between mt-5">
                                <Image src={ReactJs} alt="logo react" width={50} height={50} />
                                <Image src={Typescript} alt="logo react" width={50} height={50} />
                                <Image src={Tailwindcss} alt="logo react" width={50} height={50} />
                                <Image src={Wordpress} alt="logo react" width={50} height={50} />
                                <Image src={Bootstrap5} alt="logo react" width={50} height={50} />
                            </div>
                            <div className="flex justify-center pt-5">
                                <Button asChild>
                                    <Link href="#contact">contact</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default AboutMe;
