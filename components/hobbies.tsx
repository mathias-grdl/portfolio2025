import React, { useMemo } from "react";
import Section from "./Section";

export default function Hobbies() {
    const locations = {
        oslo: [
            "https://plus.unsplash.com/premium_photo-1697729977121-26f13fd5434c",
            "https://images.unsplash.com/photo-1672088405259-e4c639f31cf0",
            "https://plus.unsplash.com/premium_photo-1733266925298-35d9f8da58d0",
            "https://images.unsplash.com/photo-1589109140056-ce37139fb73b",
        ],
        paris: ["https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455", "https://images.unsplash.com/photo-1454386608169-1c3b4edc1df8"],
        copenhagen: ["https://plus.unsplash.com/premium_photo-1691414363231-836e2e1bf0ed", "https://images.unsplash.com/photo-1639748217730-abf25c3ea593"],
        cyprus: [
            "https://images.unsplash.com/photo-1534005647778-e5cfd1de5432",
            "https://plus.unsplash.com/premium_photo-1670689708164-cd483d6f9e40",
            "https://images.unsplash.com/photo-1699803895016-72cabdd79107",
            "https://images.unsplash.com/photo-1534005647778-e5cfd1de5432",
            "https://plus.unsplash.com/premium_photo-1670689708164-cd483d6f9e40",
            "https://images.unsplash.com/photo-1699803895016-72cabdd79107",
        ],
        finland: [
            "https://images.unsplash.com/photo-1560911081-2ed36c817b06",
            "https://images.unsplash.com/photo-1729268691867-d48ca0fea146",
            "https://images.unsplash.com/photo-1729268695827-4f31046edfe1",
        ],
        krakow: ["https://plus.unsplash.com/premium_photo-1689248943653-37ab70151a9f"],
    };

    // Créer un tableau plat de toutes les images avec des identifiants uniques
    const allImages = useMemo(() => {
        const images = Object.entries(locations).flatMap(([location, urls]) => urls.map((url, index) => ({ url, id: `${location}-${index}` })));
        return images;
    }, []);

    return (
        <Section id="hobbies" className="relative w-full">
            <div className="w-full h-full overflow-auto p-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 auto-rows-[200px]">
                    {allImages.map(({ url, id }) => (
                        <div key={id} className="relative w-full h-full">
                            <img
                                src={`${url}?w=200&h=200&fit=crop`}
                                alt={`Travel photo ${id}`}
                                className="w-full h-full object-cover rounded-lg"
                                loading="lazy"
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
