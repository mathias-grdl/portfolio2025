"use client";
import AboutMe from "@/components/aboutme";
import Contact from "@/components/contact";
import Experiences from "@/components/experiences";
import Hobbies from "@/components/hobbies";
import Projects from "@/components/projects";
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
                <Projects />
                <Hobbies />
                <Contact />
            </div>
        </SmoothScroll>
    );
}
