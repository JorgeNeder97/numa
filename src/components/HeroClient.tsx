"use client";
import dynamic from "next/dynamic";

// Esto es para que pueda usar scrollreveal sin que me de error 500 al intentar cargar el objeto window
const Hero = dynamic(() => import("@/components/Hero"), {ssr: false});

const HeroClient = () => {
  return <Hero />;
};

export default HeroClient;

// Por las dudas, si ves que tienes problemas con el objeto windows utiliza este componente