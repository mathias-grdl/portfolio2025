"use client";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "@/components/header";
import { Locate } from "lucide-react";

export default function Home() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const horizontalRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sections = gsap.utils.toArray(".horizontal-section");

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: horizontalRef.current,
                start: "top top",
                end: () => `+=${horizontalRef?.current?.offsetWidth}`,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
            },
        });
    }, []);

    return (
        <div>
            <section className="relative w-full h-[100vh] flex flex-col bg-[url('https://images.pexels.com/photos/1299417/pexels-photo-1299417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-center">
                <Header />

                <div className="flex-1 flex items-end justify-between relative">
                    <h1 className="text-3xl lg:text-9xl text-center z-[2] text-white uppercase font-sora font-light w-full">
                        {t('hero.title')}
                    </h1>
                    <span className="rotate-[90deg] h-[30px] absolute right-[30px] bottom-[40%] lg:bottom-0 origin-right flex gap-2">
                        <Locate /> {t('hero.location')}
                    </span>
                </div>
            </section>
            <section ref={sectionRef} className="bg-slate-100 overflow-hidden">
                <div ref={horizontalRef} className="relative w-[400vw] flex">
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center"></div>
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-200">
                        <h2 className="text-4xl">{t('skills.developer')}</h2>
                    </div>
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-300">
                        <h2 className="text-4xl">{t('skills.designer')}</h2>
                    </div>
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-400">
                        <h2 className="text-4xl">{t('skills.creative')}</h2>
                    </div>
                </div>
            </section>
            <section className="bg-slate-300 h-[800px]"></section>
        </div>
    );
}
