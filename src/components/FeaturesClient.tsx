"use client";
import dynamic from "next/dynamic";

// Esto es para que pueda usar scrollreveal sin que me de error 500 al intentar cargar el objeto window
const Features = dynamic(() => import("@/components/Features"), {ssr: false});

const FeaturesClient = () => {
  return <Features />;
};

export default FeaturesClient;