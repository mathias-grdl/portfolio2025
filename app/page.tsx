"use client";
import AboutMe from "@/components/aboutme";
import Experiences from "@/components/experiences";
import Hobbies from "@/components/hobbies";
import Reviews from "@/components/reviews";
import Slider from "@/components/slider";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
    return (
        <SmoothScroll>
            <div className="relative">
                <Slider />
                <AboutMe />
                <Experiences />
                <Reviews />
                <Hobbies />
                <section id="projects" className="bg-dark-100 h-screen">
                    Projects
                </section>
            </div>
        </SmoothScroll>
    );
}
