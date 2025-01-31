import { useCallback } from 'react';
import Lenis from "@studio-freight/lenis";

export const useScrollToSection = (lenis: Lenis | null) => {
    const scrollToSection = useCallback((sectionId: string) => {
        if (!lenis) return;
        
        const element = document.querySelector(sectionId) as HTMLElement;
        if (!element) return;

        lenis.scrollTo(element, {
            offset: 0,
            immediate: false,
            duration: 1.2,
        });
    }, [lenis]);

    return scrollToSection;
};
