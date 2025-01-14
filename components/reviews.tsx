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

    const [reviewsPerPage, setReviewsPerPage] = useState(1);
    useEffect(() => {
        const updateReviewsPerPage = () => {
            setReviewsPerPage(window.innerWidth >= 1024 ? 3 : 1);
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
            <Section className="h-full lg:h-screen">
                <div className="flex items-center justify-center h-[697px]">
                    <div className="flex flex-col w-full max-w-7xl container mx-auto py-5">
                        <div className="my-8 text-center">
                            <Typography variant="h2">{t("reviews.title")}</Typography>
                            <span className="text-sm text-gray-600">{t("reviews.totalReviews", { count: reviews.length })}</span>
                        </div>
                        {reviews.length === 0 ? (
                            <div className="flex flex-col items-center gap-4">
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
                            <div className="flex flex-col gap-8 items-center">
                                <div className="relative w-full mx-auto lg:mx-0">
                                    <div className="overflow-hidden">
                                        <div
                                            className="flex transition-transform duration-500 ease-in-out"
                                            style={{
                                                transform: `translateX(-${currentSlide * 100}%)`,
                                            }}>
                                            {reviews.map(review => (
                                                <div
                                                    key={review.id}
                                                    className="w-full flex-shrink-0 p-5"
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

                                    <div className="flex justify-center gap-4 mt-4 lg:mt-0 lg:absolute lg:w-[calc(100%+6rem)] lg:left-[-3rem] lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:justify-between">
                                        <button onClick={prevSlide} className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                                            <ChevronLeft className="w-8 h-8 text-gray-800" />
                                        </button>
                                        <button onClick={nextSlide} className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all">
                                            <ChevronRight className="w-8 h-8 text-gray-800" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className={`hidden lg:flex h-32 w-full border-2 border-dashed border-gray-400 rounded-lg 
                                items-center justify-center bg-gray-100 self-start transition-all duration-300 
                                ${isDragOver ? "border-red-500 bg-red-50 scale-105" : "hover:bg-gray-200"}`}
                                    onDragOver={e => {
                                        e.preventDefault();
                                        e.dataTransfer.dropEffect = "move";
                                        setIsDragOver(true);
                                    }}
                                    onDragEnter={e => {
                                        e.preventDefault();
                                        setIsDragOver(true);
                                    }}
                                    onDragLeave={e => {
                                        e.preventDefault();
                                        setIsDragOver(false);
                                    }}
                                    onDrop={e => {
                                        e.preventDefault();
                                        setIsDragOver(false);
                                        const reviewId = parseInt(e.dataTransfer.getData("reviewId"));
                                        if (!isNaN(reviewId)) {
                                            handleDeleteReview(reviewId);
                                        }
                                    }}>
                                    <div className="text-gray-500 text-center">
                                        <svg
                                            className="w-8 h-8 mx-auto mb-2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <p>{t("reviews.dropToDelete")}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
}
