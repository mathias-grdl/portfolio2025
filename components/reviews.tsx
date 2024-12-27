/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { reviews } from "@/data/dataReviews";
import Review from "./review";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type ReviewType = {
    id: number;
    picture: string;
    name: string;
    flag: string;
    country: string;
    stars: number;
    review: string;
};

export default function Reviews() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [displayedReviews, setDisplayedReviews] = useState(reviews);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect screen size
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 767px)").matches);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (isMobile) return;

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

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
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
            return () => _horizontalScroll.kill();
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            lenis.destroy();
            mm.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isMobile]);

    return (
        <section ref={containerRef} className="h-screen overflow-hidden relative bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center py-12">
                    <h2 className="text-center text-4xl uppercase font-bold">Ils m&apos;ont fait confiance</h2>
                </div>
                {isMobile ? (
                    <div className="relative md:hidden">
                        <Swiper 
                            modules={[Navigation]} 
                            navigation 
                            onSlideChange={swiper => setCurrentSlide(swiper.activeIndex + 1)} 
                            className="w-full"
                        >
                            {displayedReviews.map(review => (
                                <SwiperSlide key={review.id}>
                                    <Review review={review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="text-center mt-4 text-gray-600">
                            {currentSlide} / {displayedReviews.length}
                        </div>
                    </div>
                ) : (
                    <div ref={trackRef} className="hidden md:block w-[300%] will-change-transform">
                        <div className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-8 w-full p-8">
                            {displayedReviews.map((review, index) => (
                                <Review key={review.id} ref={el => (cardsRef.current[index] = el)} review={review} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
