'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // gsap.from('.loading-text', {
        //     y: 50,
        //     opacity: 0,
        //     duration: 0.5,
        //     stagger: 0.2
        // });

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    gsap.to('.loading-screen', {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => setIsLoading(false)
                    });
                    return 100;
                }
                return Math.min(prev + Math.random() * 10, 100);
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="loading-screen fixed inset-0 z-50 bg-white dark:bg-zinc-900 flex items-center justify-center">
            <div className="relative flex flex-col items-center w-full max-w-xl px-4">
                <div className="space-y-4 text-center w-full">
                    <h1 className="loading-text text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Mathias Grondziel
                    </h1>
                    <p className="loading-text text-xl text-zinc-600 dark:text-zinc-400">
                        Votre expérience est en cours de chargement...
                    </p>
                </div>

                <div className="loading-text mt-12 w-full max-w-[300px] mx-auto">
                    <div className="relative">
                        <div className="h-[2px] w-full bg-zinc-200 dark:bg-zinc-700">
                            <div
                                className="h-full bg-zinc-900 dark:bg-white transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="absolute -right-2 top-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

                <div className="loading-text mt-16 flex gap-6 text-sm tracking-wider">
                    <span className="text-zinc-400">REACTJS</span>
                    <span className="text-zinc-400">NEXTJS</span>
                    <span className="text-zinc-400">TYPESCRIPT</span>
                </div>
            </div>
        </div>
    );
}
