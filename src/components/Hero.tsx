"use client";
import Link from "next/link";
import { useState } from "react";

const Hero = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="w-full grid grid-cols-[20px_1fr_1.5fr_1fr_1fr_20px] md:grid-cols-[50px_1fr_1.5fr_1fr_1fr_50px] lg:grid-cols-[100px_1fr_1.5fr_1fr_1fr_100px] grid-rows-3 translate-y-[-30px]">
                <div className="col-span-5 col-start-2 row-start-1 mb-[clamp(10px,5vh,50px)] flex flex-col place-content-end">
                    <h2 className="fromLeft max-w-[300px] sm:max-w-[400px] text-tertiary font-bold text-[2rem] sm:text-[2.2rem] md:text-[2.3rem]">Cultivá tu bienestar financiero</h2>
                </div>
            <div className="col-span-2 col-start-2 row-start-2 mb-[clamp(20px,7vh,100px)]">
                <p className="fromLeft max-w-[180px] sm:max-w-[280px] text-tertiary tracking-wider text-[1rem] sm:text-[1.2rem] lg:tracking-wide">Controlá tus ingresos y egresos, analizá tus hábitos y mejorá tu salud financiera desde hoy</p>
            </div>
            <div className="col-span-3 col-start-2 row-start-3 flex flex-col place-content-center gap-[20px]">
                <Link 
                    href="/auth/register" 
                    onClick={() => setLoading(true)}
                    className="fromLeft text-[1rem] sm:text-[1.2rem] primary-button py-[8px] w-[45vw] max-w-[180px] min-h-[25px] h-[40px] flex place-content-center place-items-center"
                >
                    { loading ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                    : "Probar Gratis" }
                </Link>
                <Link href="/#funcionalidades" className="fromLeft text-[1rem] sm:text-[1.2rem] inverse-primary-button py-[8px] w-[50vw] max-w-[200px] sm:max-w-[230px] min-w-[185px] min-h-[25px] h-[40px] flex place-content-center place-items-center">
                    Ver Funcionalidades
                </Link>
            </div>
        </div>
    );
};

export default Hero;