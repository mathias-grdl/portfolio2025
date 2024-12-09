"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
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
            <section className="bg-slate-300 h-[800px] flex items-center justify-center">
                <h1 className="text-6xl text-white relative z-10">
                    Mathias Grondziel <br /> Front end web developper
                </h1>
            </section>
            <section ref={sectionRef} className="bg-slate-100 overflow-hidden">
                <div ref={horizontalRef} className="relative w-[400vw] flex">
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center"></div>
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-200">
                        <h2 className="text-4xl">Développeur</h2>
                    </div>
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-300">
                        <h2 className="text-4xl">Designer</h2>
                    </div>
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-400">
                        <h2 className="text-4xl">Créatif</h2>
                    </div>
                </div>
            </section>
            <section className="bg-slate-300 h-[800px]"></section>
        </div>
    );
}
