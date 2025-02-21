import React from "react";
import { Typography } from "./ui/typography";
import { useTranslation } from "react-i18next";

interface ReviewProps {
    review: {
        id: number;
        picture: string;
        name: string;
        flag: string;
        country: string;
        stars: number;
        review?: string;
    };
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Review = React.forwardRef<HTMLDivElement, ReviewProps>(({ review, draggable, onDragStart }, ref) => {
    const { t } = useTranslation();

    const getStarColor = (rating: number): string => {
        const red = Math.min(255, (255 * (5 - rating)) / 5);
        const green = Math.min(255, 255 * rating * 1.5) / 5;
        const color = `rgb(${red}, ${green}, 0)`;
        return color;
    };

    return (
        <div
            ref={ref}
            draggable={draggable}
            onDragStart={onDragStart}
            className="review-card w-full p-3 rounded-xl transform 
                       backdrop-blur-lg bg-white/90 shadow-lg border border-gray-100
                       hover:shadow-xl transition-all duration-300 hover:-translate-y-2 
                       cursor-grab active:cursor-grabbing min-h-[350px]">
            <div className="flex flex-col items-center mb-4">
                <div className="flex flex-col items-center gap-3">
                    <div>
                        <img src={review.picture} alt="" width={50} height={50} className="rounded-full object-cover" />
                    </div>
                    <div>
                        <Typography variant="lead">{review.name}</Typography>
                        <Typography variant="small" className="text-black/60 flex items-center">
                            <img src={review.flag} alt="" width={20} height={20} className="mr-2" />
                            {review.country}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="relative">
                            <span
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{
                                    width: `${Math.min(1, Math.max(0, review.stars - i)) * 100}%`,
                                    color: getStarColor(review.stars),
                                    display: "inline-block",
                                }}>
                                ★
                            </span>
                            <span className="text-gray-300">★</span>
                        </span>
                    ))}
                </div>
            </div>
            <Typography variant="p" className="text-sm text-black/70 line-clamp-5 lg:line-clamp-none text-center">
                {t(`reviews.items.${review.id}`)}
            </Typography>
        </div>
    );
});

Review.displayName = "Review";

export default Review;
