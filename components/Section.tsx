import React, { ReactNode } from "react";

interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className, children }) => {
    return (
        <section id={id} className={`h-full md:h-screen my-3 lg:my-5 ${className}`}>
            {children}
        </section>
    );
};

export default Section;
