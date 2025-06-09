"use client";
import { useEffect } from "react";
import revealElements from "@/hooks/scrollReveal";

const ScrollReveal = () => {
    useEffect(() => {
        revealElements();
    }, []);

    return null;
};

export default ScrollReveal;
