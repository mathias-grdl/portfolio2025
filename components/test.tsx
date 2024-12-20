"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function Test() {
    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // Connect lenis to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add(time => {
            lenis.raf(time * 1000);
        });

        // Example animation
        gsap.to(".animated-element", {
            y: 100,
            scrollTrigger: {
                trigger: ".animated-element",
                start: "top center",
                end: "bottom center",
                scrub: true,
                markers: true,
            },
        });

        return () => {
            // Cleanup
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className="container" style={{ height: "1000px", background: "#35973B" }}>
            <div className="spacer" style={{ height: "100vh" }}></div>
            <div className="animated-element" style={{ height: "200px", background: "#333" }}>
                Animated Element
            </div>
            <div className="spacer" style={{ height: "100vh" }}></div>
        </div>
    );
}
