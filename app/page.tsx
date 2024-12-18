"use client";
// import { useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Header from "@/components/header";
// import { Locate } from "lucide-react";
import Slider from "@/components/slider";

export default function Home() {
    // const { t } = useTranslation();
    // const sectionRef = useRef(null);
    // const horizontalRef = useRef(null);

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const sections = gsap.utils.toArray(".horizontal-section");

    //     gsap.to(sections, {
    //         xPercent: -100 * (sections.length - 1),
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: horizontalRef.current,
    //             start: "top top",
    //             end: () => `+=${horizontalRef?.current?.offsetWidth}`,
    //             pin: true,
    //             scrub: 1,
    //             snap: 1 / (sections.length - 1),
    //         },
    //     });
    // }, []);

    return (
        <div className="relative">
            <Slider />

            {/* </section> */}

            {/* <section ref={sectionRef} className="bg-rose-50 overflow-hidden">
                <div ref={horizontalRef} className="relative w-[400vw] flex">
                    <div className="horizontal-section w-screen h-screen flex items-center justify-center"></div>
                    <div id="aboutMe" className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-200">
                        <h2 className="text-4xl">{t("skills.developer")}</h2>
                    </div>
                    <div id="projects" className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-300">
                        <h2 className="text-4xl">{t("skills.designer")}</h2>
                    </div>
                    <div id="experiences" className="horizontal-section w-screen h-screen flex items-center justify-center bg-slate-400">
                        <h2 className="text-4xl">{t("skills.creative")}</h2>
                    </div>
                </div>
            </section> */}
            <section id="experiences" className="bg-dark-900 h-screen">
                Experiences
            </section>
            <section id="aboutme" className="bg-slate-200 h-screen">
                About me
            </section>
            <section id="projects" className="bg-dark-100 h-screen">
                Projects
            </section>
            <section id="hobbies" className="bg-slate-300 h-screen">
                Hobbies
            </section>
        </div>
    );
}
