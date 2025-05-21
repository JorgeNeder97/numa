"use client";

import FadeContent from "@/components/FadeContent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Bienvenido = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/dashboard");
        }, 4500);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-full h-[100vh] bg-tertiary text-white text-[3rem] font-bold flex flex-col place-items-center place-content-center">
                <div className="w-full flex flex-col place-items-center place-content-center gap-[10px] translate-y-[-50px]">
                    <FadeContent
                        blur={true}
                        duration={1000}
                        delay={500}
                        easing="ease-out"
                        initialOpacity={0}
                    >
                        Numa
                    </FadeContent>
                    <FadeContent
                        blur={true}
                        duration={1000}
                        delay={2500}
                        easing="ease-out"
                        initialOpacity={0}
                        className="text-[1rem]"
                    >
                        Invertí en vos
                    </FadeContent>
                </div>
            </div>
        </motion.div>
    );
};

export default Bienvenido;
