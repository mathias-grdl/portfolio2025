import { useEffect } from "react";

const useKeyboardNavigation = (handlePrevSlide: () => void, handleNextSlide: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                handlePrevSlide();
            } else if (event.key === "ArrowRight") {
                handleNextSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handlePrevSlide, handleNextSlide]);
};

export default useKeyboardNavigation;
