"use client";
import dynamic from "next/dynamic";

// Esto es para que pueda usar scrollreveal sin que me de error 500 al intentar cargar el objeto window
const Footer = dynamic(() => import("@/components/Footer"), {ssr: false});

const FooterClient = () => {
  return <Footer />;
};

export default FooterClient;