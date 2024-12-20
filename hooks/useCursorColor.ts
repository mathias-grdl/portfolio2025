import { useEffect } from "react";

const useCursorColor = (hoveredIndex: number, colors: string[], setCursorColor: React.Dispatch<React.SetStateAction<string>>) => {
    useEffect(() => {
        setCursorColor(colors[hoveredIndex]);
    }, [hoveredIndex, colors]);
};

export default useCursorColor;
