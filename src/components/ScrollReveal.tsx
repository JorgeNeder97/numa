"use client";
import { useEffect } from "react";
import revealElements from "@/hooks/scrollReveal";

const ScrollReveal = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        revealElements();
    }, []);

    return null;
};

export default ScrollReveal;
