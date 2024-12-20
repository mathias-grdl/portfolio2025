import { useRef, useEffect, useState } from "react";

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const [showText, setShowText] = useState(true);
    const [hasDrawn, setHasDrawn] = useState(false);

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.fill();

        setShowText(true);
        setHasDrawn(false);
    };

    const initCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Ajouter les styles nécessaires pour le tactile
        canvas.style.touchAction = 'none'; // Empêche le scroll/zoom par défaut
        
        initCanvas();

        const handlePointerDown = (e: PointerEvent) => {
            e.preventDefault(); // Empêche les actions par défaut
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            if (clickX >= 0 && clickX <= rect.width && clickY >= 0 && clickY <= rect.height) {
                isDrawing.current = true;
                setShowText(false);
                canvas.setPointerCapture(e.pointerId);
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            e.preventDefault();
            if (!isDrawing.current) return;
            
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            setHasDrawn(true);

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            let x, y;
            // Gestion spécifique pour le touch
            if (e.pointerType === 'touch') {
                x = (e.clientX - rect.left) * scaleX;
                y = (e.clientY - rect.top) * scaleY;
            } else {
                x = (e.clientX - rect.left) * scaleX;
                y = (e.clientY - rect.top) * scaleY;
            }

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 50, 0, Math.PI * 2);
            ctx.fill();
        };

        const handlePointerUp = (e: PointerEvent) => {
            e.preventDefault();
            isDrawing.current = false;
            canvas.releasePointerCapture(e.pointerId);
        };

        // Désactiver le menu contextuel sur mobile
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerup", handlePointerUp);

        return () => {
            canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

    return {
        canvasRef,
        showText,
        hasDrawn,
        resetCanvas
    };
};
