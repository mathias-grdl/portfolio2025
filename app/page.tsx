"use client";
import AboutMe from "@/components/aboutme";
import Experiences from "@/components/experiences";
import Slider from "@/components/slider";
import SmoothScroll from "@/components/SmoothScroll";
// import Test from "@/components/test";

export default function Home() {
    return (
        <SmoothScroll>
            <div className="relative">
                <Slider />
                <AboutMe />
                {/* <Test /> */}
                <Experiences />
                {/* <section id="experiences" className="bg-slate-300 h-screen">
                    Experiences
                </section> */}
                <section id="projects" className="bg-dark-100 h-screen">
                    Projects
                </section>
                <section id="hobbies" className="bg-slate-300 h-screen">
                    Hobbies
                </section>
            </div>
        </SmoothScroll>
    );
}
