"use client";
import dynamic from "next/dynamic";

// Esto es para que pueda usar scrollreveal sin que me de error 500 al intentar cargar el objeto window
const ScrollReveal = dynamic(() => import("@/components/ScrollReveal"), {ssr: false});

const ScrollRevealClient = () => {
  return <ScrollReveal />;
};

export default ScrollRevealClient;