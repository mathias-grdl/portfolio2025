import React, { ReactNode } from "react";

interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className, children }) => {
    return (
        <section id={id} className={`min-h-screen ${className}`}>
            {children}
        </section>
    );
};

export default Section;
