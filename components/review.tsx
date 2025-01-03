import React from "react";

interface ReviewProps {
    review: {
        id: number;
        picture: string;
        name: string;
        flag: string;
        country: string;
        stars: number;
        review: string;
    };
}

const Review = React.forwardRef<HTMLDivElement, ReviewProps>(({ review }, ref) => {
    const getStarColor = (rating: number): string => {
        const red = Math.min(255, (255 * (5 - rating)) / 5);
        const green = Math.min(255, 255 * rating * 1.5) / 5; // Further increase green intensity for a lighter color
        const color = `rgb(${red}, ${green}, 0)`;
        return color;
    };

    return (
        <div
            ref={ref}
            className="review-card w-full min-w-[300px] md:w-[400px] p-3 rounded-xl transform 
                       backdrop-blur-lg bg-white/90 shadow-lg border border-gray-100
                       hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center mb-4 justify-between md:flex-row ">
                <div className="flex flex-col items-center md:flex-row gap-3">
                    <div>
                        <img src={review.picture} alt="" width={50} height={50} className="rounded-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-black/90">{review.name}</h3>
                        <p className="text-sm text-black/60 flex items-center">
                            <img src={review.flag} alt="" width={20} height={20} className="mr-2" />
                            {review.country}
                        </p>
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
            <p className="text-sm text-black/70 line-clamp-5 md:line-clamp-none text-justify md:text-left">{review.review}</p>
        </div>
    );
});

Review.displayName = "Review";

export default Review;
