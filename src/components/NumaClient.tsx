"use client";
import dynamic from "next/dynamic";

// Esto es para que pueda usar scrollreveal sin que me de error 500 al intentar cargar el objeto window
const Numa = dynamic(() => import("@/components/Numa"), {ssr: false});

const NumaClient = () => {
  return <Numa />;
};

export default NumaClient;