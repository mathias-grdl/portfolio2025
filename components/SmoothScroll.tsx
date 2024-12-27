"use client";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function SmoothScroll({ children }: Props) {
    useSmoothScroll();
    return <>{children}</>;
}
