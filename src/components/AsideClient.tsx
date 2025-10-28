"use client";
import dynamic from "next/dynamic";

// Esto es para que pueda usar scrollreveal sin que me de error 500 al intentar cargar el objeto window
const Aside = dynamic(() => import("@/components/Aside"), {ssr: false});

const AsideClient = () => {
  return <Aside />;
};

export default AsideClient;