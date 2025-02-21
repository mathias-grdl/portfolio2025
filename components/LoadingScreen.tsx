'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './theme/language-selector';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                const next = Math.min(prev + Math.random() * 15, 100);
                if (next === 100) {
                    clearInterval(timer);
                    // Attendre que la barre soit à 100% avant de démarrer l'animation de sortie
                    setTimeout(() => {
                        gsap.to('.loading-screen', {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => setIsLoading(false)
                        });
                    }, 300); // Petit délai pour voir le 100%
                }
                return next;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="loading-screen fixed inset-0 z-50 bg-white dark:bg-zinc-900 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-xl px-4">
                <div className="absolute top-0 right-0 py-3 px-5">
                    <LanguageSelector />
                </div>
                <div className="space-y-4 text-center w-full">
                    <h1 className="loading-text text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {t('loader.title')}
                    </h1>
                    <p className="loading-text text-xl text-zinc-600 dark:text-zinc-400">
                        {t('loader.subtitle')}
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
                    <span className="text-zinc-400">{t('loader.tags.react')}</span>
                    <span className="text-zinc-400">{t('loader.tags.next')}</span>
                    <span className="text-zinc-400">{t('loader.tags.typescript')}</span>
                </div>
            </div>
        </div>
    );
}
