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

const AboutMe = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { canvasRef, showText, hasDrawn, resetCanvas } = useCanvas();

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
                        <span>Développeur ReactJS et Wordpress Since 2022</span>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 mx-5 relative border-2 border-white">
                            <button
                                onClick={resetCanvas}
                                disabled={!hasDrawn}
                                className={`absolute top-4 right-4 z-30 p-2 rounded-full backdrop-blur-sm transition-all ${
                                    hasDrawn ? "bg-white/10 hover:bg-white/20 cursor-pointer" : "bg-white/5 cursor-not-allowed"
                                }`}
                                title="Reset canvas">
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
                                className="relative z-10 w-full h-[300px] md:h-[500px] cursor-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE0LjYyMiAxNy44OTctMTAuNjgtMi45MTMiLz48cGF0aCBkPSJNMTguMzc2IDIuNjIyYTEgMSAwIDEgMSAzLjAwMiAzLjAwMkwxNy4zNiA5LjY0M2EuNS41IDAgMCAwIDAgLjcwN2wuOTQ0Ljk0NGEyLjQxIDIuNDEgMCAwIDEgMCAzLjQwOGwtLjk0NC45NDRhLjUuNSAwIDAgMS0uNzA3IDBMOC4zNTQgNy4zNDhhLjUuNSAwIDAgMSAwLS43MDdsLjk0NC0uOTQ0YTIuNDEgMi40MSAwIDAgMSAzLjQwOCAwbC45NDQuOTQ0YS41LjUgMCAwIDAgLjcwNyAweiIvPjxwYXRoIGQ9Ik05IDhjLTEuODA0IDIuNzEtMy45NyAzLjQ2LTYuNTgzIDMuOTQ4YS41MDcuNTA3IDAgMCAwLS4zMDIuODE5bDcuMzIgOC44ODNhMSAxIDAgMCAwIDEuMTg1LjIwNEMxMi43MzUgMjAuNDA1IDE2IDE2Ljc5MiAxNiAxNSIvPjwvc3ZnPg==)_12_12,auto]"
                            />
                            {showText && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-4xl font-bold pointer-events-none text-center">
                                    DRAW ME
                                </div>
                            )}
                        </div>

                        <div className="relative md:w-1/2 m-5 flex flex-col justify-between">
                            <TextReveal className="text-neutral-50 leading-7">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus suscipit quia, voluptatibus maiores labore perspiciatis,
                                nulla aspernatur eos dolore id saepe ratione exercitationem facere architecto sit sint culpa sed tempore. Officia, similique
                                quia aliquam nisi quasi repellat recusandae veniam voluptas neque ipsa rem deserunt animi laborum! Architecto, iure nobis sequi
                                magnam repellat esse sit ea rem, ut placeat corporis atque. Quos similique, soluta quae voluptate, fuga unde aliquam rerum
                                veniam voluptatum obcaecati minus sapiente. Consectetur error ducimus eveniet hic aspernatur, nam odit placeat numquam libero ad
                                voluptatibus, molestias similique possimus.
                            </TextReveal>
                            <div className="flex justify-between mt-5">
                                <Image src={ReactJs} alt="logo react" width={50} height={50} />
                                <Image src={Typescript} alt="logo react" width={50} height={50} />
                                <Image src={Tailwindcss} alt="logo react" width={50} height={50} />
                                <Image src={Wordpress} alt="logo react" width={50} height={50} />
                                <Image src={Bootstrap5} alt="logo react" width={50} height={50} />
                            </div>
                            <div className="flex justify-center pt-5">
                                <Button asChild>
                                    <Link target="_blank" href="/">
                                        contact
                                    </Link>
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
