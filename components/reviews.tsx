import { getReviews } from "@/data/dataReviews";
import Review from "./review";
import { useState, useEffect, useRef } from "react";
import { Typography } from "./ui/typography";
import Section from "./Section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Reviews() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t, i18n } = useTranslation();

    const [reviews, setReviews] = useState(getReviews());
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);

    // Updated reviewsPerPage logic
    const [reviewsPerPage, setReviewsPerPage] = useState(3);
    useEffect(() => {
        const updateReviewsPerPage = () => {
            if (window.innerWidth < 768) return setReviewsPerPage(1); // Changed from 640 to 768 (md breakpoint)
            return setReviewsPerPage(3);
        };
        updateReviewsPerPage();
        window.addEventListener("resize", updateReviewsPerPage);
        return () => window.removeEventListener("resize", updateReviewsPerPage);
    }, []);

    const maxSlides = Math.ceil(reviews.length / reviewsPerPage);

    const handleDeleteReview = (id: number) => {
        setReviews(prevReviews => {
            const newReviews = prevReviews.filter(review => review.id !== id);
            const newMaxSlides = Math.ceil(newReviews.length / reviewsPerPage);
            if (currentSlide >= newMaxSlides) {
                setCurrentSlide(Math.max(0, newMaxSlides - 1));
            }
            return newReviews;
        });
    };

    const handleReloadReviews = () => {
        setReviews(getReviews());
        setCurrentSlide(0);
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % maxSlides);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + maxSlides) % maxSlides);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 7000);

        return () => clearInterval(timer);
    }, [maxSlides, nextSlide]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: "+=100%",
                pinSpacing: true,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [i18n.language]);

    useEffect(() => {
        setReviews(getReviews());
    }, [i18n.language]);

    return (
        <div ref={sectionRef} className="h-full lg:h-screen">
            <Section className="h-full lg:h-screen flex justify-center items-center">
                <div className="flex flex-col w-full max-w-7xl container mx-auto py-5">
                    <div className="my-8 text-center">
                        <Typography variant="h2">{t("reviews.title")}</Typography>
                        <span className="text-sm text-gray-600">{t("reviews.totalReviews", { count: reviews.length })}</span>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 p-8">
                            <Typography variant="p" className="text-center text-gray-600">
                                {t("reviews.noReviews")}
                            </Typography>
                            <button
                                onClick={handleReloadReviews}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                {t("reviews.reloadReviews")}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-8">
                            <div className="group relative">
                                {/* Navigation buttons pour tablette et desktop */}
                                <div className="hidden sm:block">
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[75%] z-50
                                                 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                                        <ChevronLeft className="w-8 h-8 text-black" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[75%] z-50
                                                 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                                        <ChevronRight className="w-8 h-8 text-black" />
                                    </button>
                                </div>

                                {/* Navigation buttons pour mobile uniquement */}
                                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 sm:hidden">
                                    <button
                                        onClick={prevSlide}
                                        className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                                        <ChevronLeft className="w-8 h-8 text-black" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                                        <ChevronRight className="w-8 h-8 text-black" />
                                    </button>
                                </div>

                                <div className="overflow-hidden rounded-xl">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{
                                            transform: `translateX(-${currentSlide * (100 / reviewsPerPage)}%)`,
                                        }}>
                                        {reviews.map(review => (
                                            <div
                                                key={review.id}
                                                className="w-full flex-shrink-0 p-2 sm:p-3 md:p-4"
                                                style={{ flex: `0 0 ${100 / reviewsPerPage}%` }}
                                                draggable
                                                onDragStart={e => {
                                                    e.dataTransfer.setData("reviewId", review.id.toString());
                                                }}>
                                                <Review review={review} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`hidden lg:flex min-h-[6rem] sm:min-h-[8rem] w-full border-2 border-dashed rounded-lg 
                                items-center justify-center bg-gray-100 transition-all duration-300 
                                ${isDragOver ? "border-red-500 bg-red-50 scale-105" : "border-gray-400 hover:bg-gray-200"}`}
                                onDragOver={e => {
                                    e.preventDefault();
                                    setIsDragOver(true);
                                }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={e => {
                                    e.preventDefault();
                                    setIsDragOver(false);
                                    const reviewId = parseInt(e.dataTransfer.getData("reviewId"));
                                    if (!isNaN(reviewId)) handleDeleteReview(reviewId);
                                }}>
                                <div className="text-gray-500 text-center p-3 sm:p-4">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <p className="text-xs sm:text-sm md:text-base">{t("reviews.dropToDelete")}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
}
