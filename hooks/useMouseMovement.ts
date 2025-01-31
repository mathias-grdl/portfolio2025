import { useEffect } from "react";

const useMouseMovement = (isMouseInSection: boolean, setMousePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isMouseInSection) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMouseInSection]);
};

export default useMouseMovement;
