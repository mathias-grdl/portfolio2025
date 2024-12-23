import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
    children: ReactNode;
    className?: string;
}

const TextReveal = ({ children, className = "" }: TextRevealProps) => {
    const textContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (textContainerRef.current) {
            const text = textContainerRef.current.textContent || "";
            const words = text.split(" ");
            textContainerRef.current.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");

            const wordElements = textContainerRef.current.querySelectorAll(".word");

            gsap.set(wordElements, {
                display: "inline-block",
                opacity: 0.2,
                paddingRight: "4px",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                    toggleActions: "play reverse play reverse",
                    preventOverlaps: true,
                },
            });

            wordElements.forEach((word, i) => {
                tl.to(
                    word,
                    {
                        color: "black",
                        opacity: 1,
                        duration: 0.2,
                        ease: "none",
                    },
                    i * 0.02
                );
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [children]);

    return (
        <div ref={textContainerRef} className={className}>
            {children}
        </div>
    );
};

export default TextReveal;
