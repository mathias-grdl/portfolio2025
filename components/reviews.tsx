/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { reviews } from "@/data/dataReviews";
import Review from "./review";

export default function Reviews() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        gsap.set(containerRef.current, {
            perspective: 1000,
        });

        const cards = cardsRef.current;
        cards.forEach(card => {
            gsap.set(card, {
                transformStyle: "preserve-3d",
                transformOrigin: "center center -50",
            });
        });

        const _horizontalScroll = gsap.to(trackRef.current, {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                onUpdate: self => {
                    const progress = self.progress;
                    cards.forEach((card, i) => {
                        const wave = Math.sin(progress * Math.PI * 2 + i * 0.2);
                        const depth = Math.cos(progress * Math.PI * 2 + i * 0.2);

                        gsap.to(card, {
                            rotationY: wave * 15,
                            z: depth * 50,
                            scale: 0.9 + Math.abs(depth) * 0.15,
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    });
                },
            },
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="h-full md:h-screen overflow-hidden relative bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center py-12">
                    <h2 className="text-4xl uppercase font-bold">Ils m&apos;ont fait confiance</h2>
                </div>
                <div ref={trackRef} className="w-[300%] will-change-transform">
                    <div className="grid grid-rows-2 grid-flow-col gap-8 w-full p-8">
                        {reviews.map((review, index) => (
                            <Review key={review.id} ref={el => (cardsRef.current[index] = el)} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
