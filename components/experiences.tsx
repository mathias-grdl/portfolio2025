import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Experiences() {
    const [visibleImage, setVisibleImage] = useState<string | null>("image1");
    const [filter, setFilter] = useState<string>("All");

    const experiences = [
        {
            id: "image1",
            yearRange: "2024 - 2025",
            title: "Radio Analyzer",
            imageUrl: "https://img.static-kl.com/images/media/14503BF4-AEAD-481C-8987FC06F3D8C704?w=1280",
            type: "Developer",
            description:
                "En tant que développeur ReactJS chez Radio Analyzer, j'ai travaillé sur une plateforme SaaS innovante dédiée à l'analyse des radios. Mon rôle consistait à concevoir et implémenter des interfaces dynamiques et intuitives permettant aux utilisateurs d'accéder à des données détaillées sur les musiques les plus diffusées, les tendances et d'autres métriques clés. J'ai également collaboré avec l'équipe backend pour optimiser l'intégration des API et garantir la performance de l'application.",
            btnName: "En savoir plus",
            btnLink: "https://radioanalyzer.com/",
            localisation: "Aalborg, Danmark",
            localisationLink: "https://maps.app.goo.gl/Xmw69RrVu6f7g8Gr9",
        },
        {
            id: "image2",
            yearRange: "2023 - 2025",
            title: "Freelance",
            imageUrl:
                "https://images.unsplash.com/photo-1609185271997-ec976c17a0bc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Developer",
            description:
                "Durant ma période en freelance, j'ai conçu et développé des projets variés en WordPress et ReactJS, répondant aux besoins spécifiques de mes clients. J'ai créé des sites vitrines, des e-commerces et des applications interactives, en assurant une expérience utilisateur fluide et des performances optimales. Cette expérience m'a permis de perfectionner ma capacité à gérer des projets de bout en bout, de la conception à la mise en production, tout en m'adaptant aux demandes variées des clients.",
            btnName: "En savoir plus",
            btnLink: "https://fr.fiverr.com/mathias_grdl",
            localisation: "Perpignan, France",
            localisationLink: "https://maps.app.goo.gl/XMS3wHD4gtgjTh949",
        },
        {
            id: "image3",
            yearRange: "2022 - 2023",
            title: "Kori",
            imageUrl:
                "https://images.unsplash.com/photo-1722605267048-a5389a97b20c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Developer",
            description:
                "Chez Kori, j'ai occupé le poste de développeur WordPress, où j'ai contribué à la création et à la maintenance de sites web professionnels. J'étais en charge de l'installation et de la personnalisation de thèmes, ainsi que de l'intégration de fonctionnalités spécifiques pour répondre aux besoins des utilisateurs finaux. Mon rôle impliquait également une veille technologique pour garantir que les projets respectaient les normes actuelles du web.",
            btnName: "En savoir plus",
            btnLink: "https://www.agence-kori.fr/",
            localisation: "Perpignan, France",
            localisationLink: "https://maps.app.goo.gl/XMS3wHD4gtgjTh949",
        },
        {
            id: "image4",
            yearRange: "2021 - 2022",
            title: "Vendeur polyvalent",
            imageUrl:
                "https://images.unsplash.com/photo-1724599685287-299a6412b92a?q=80&w=1820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Other",
            description:
                "En tant que vendeur polyvalent dans une jardinerie, j'étais responsable de plusieurs aspects de la gestion quotidienne. Je m'occupais de la mise en rayon des produits, de l'entretien des plantes et du conseil client, en les orientant vers les solutions adaptées à leurs besoins. Cette expérience m'a permis de développer mes compétences en relation client et en gestion de stock.",
            localisation: "Tours, France",
            localisationLink: "https://maps.app.goo.gl/sWHUhPvJCDXNgZuf8",
        },
        {
            id: "image5",
            yearRange: "2018 - 2022",
            title: "Uber Eats",
            imageUrl:
                "https://images.unsplash.com/photo-1643549811064-adf938a5ca40?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "Other",
            description:
                "En travaillant comme livreur pour Uber Eats, j'assurais la livraison rapide et efficace de repas tout en respectant les consignes de sécurité et en garantissant la satisfaction des clients. Ce poste nécessitait une bonne gestion du temps, une connaissance approfondie de la ville et une grande réactivité pour résoudre les éventuels problèmes rencontrés lors des livraisons.",
            localisation: "Angers, France",
            localisationLink: "https://maps.app.goo.gl/rZLxanLae3eHcG3T7",
        },
    ];

    const handleImageVisibility = (imageId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setVisibleImage(imageId);
    };

    const renderImageSection = (
        imageId: string,
        yearRange: string,
        title: string,
        imageUrl: string,
        description: string,
        btnName?: string,
        btnLink?: string,
        localisation?: string,
        localisationLink?: string
    ) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
                <a
                    href="#"
                    className={`my-2 md:my-5 ps-2 ${visibleImage === imageId ? "active text-blue-500 border-s-2 border-s-blue-500" : ""}`}
                    onClick={e => handleImageVisibility(imageId, e)}>
                    <span>{yearRange}</span>
                    <h3 className={`text-3xl ${visibleImage === imageId ? "active text-blue-500" : ""}`}>{title}</h3>
                </a>
            </div>
            <div className="flex justify-center items-center">
                {visibleImage === imageId ? (
                    <>
                        <img src={imageUrl} alt="" className="object-cover w-full h-[300px] md:h-screen md:absolute md:top-0 md:w-[220px] xl:w-[400px]" />
                    </>
                ) : (
                    <div className="h-full md:top-0"></div>
                )}
            </div>
            {visibleImage === imageId && (
                <>
                    <div className="my-2 md:my-5 md:absolute md:top-0 md:right-0 ">
                        <Link href={localisationLink} target="_blank" className="flex gap-1">
                            <MapPin />
                            {localisation}
                        </Link>
                    </div>
                    <div className="md:absolute md:top-1/4 md:right-0 md:w-[220px] lg:w-[300px]">
                        <p>{description}</p>
                        {btnName && btnLink && (
                            <div className="flex justify-center pt-5">
                                <Button asChild>
                                    <Link target="_blank" href={btnLink}>
                                        {btnName}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );

    const filteredExperiences = filter === "All" ? experiences : experiences.filter(exp => exp.type === filter);

    return (
        <section id="experiences" className="bg-slate-100 dark:bg-black h-full md:h-screen flex flex-col container mx-auto">
            <div className="gap-4 md:h-screen">
                <div className="relative w-full pt-5">
                    <div className="flex gap-2 pt-5">
                        <button className={filter === "All" ? "active text-blue-500 border-b-2 border-b-blue-500" : ""} onClick={() => setFilter("All")}>
                            All
                        </button>
                        <button
                            className={filter === "Developer" ? "active text-blue-500 border-b-2 border-b-blue-500" : ""}
                            onClick={() => setFilter("Developer")}>
                            Developer
                        </button>
                    </div>
                    {filteredExperiences.map(exp => (
                        <div key={exp.id}>
                            {renderImageSection(
                                exp.id,
                                exp.yearRange,
                                exp.title,
                                exp.imageUrl,
                                exp.description,
                                exp.btnName,
                                exp.btnLink,
                                exp.localisation,
                                exp.localisationLink
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
