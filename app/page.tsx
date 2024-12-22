"use client";
import AboutMe from "@/components/aboutme";
import Experiences from "@/components/experiences";
import Hobbies from "@/components/hobbies";
import Slider from "@/components/slider";
import SmoothScroll from "@/components/SmoothScroll";
import Test from "@/components/test";

export default function Home() {
    return (
        <SmoothScroll>
            <div className="relative">
                <Slider />
                <AboutMe />
                {/* <Test /> */}
                <Experiences />
                <Hobbies />
                <section id="projects" className="bg-dark-100 h-screen">
                    Projects
                </section>
            </div>
        </SmoothScroll>
    );
}
