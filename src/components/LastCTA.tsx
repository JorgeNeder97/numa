"use client";
import Link from "next/link";
import { useState } from "react";

const LastCTA = () => {

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-backgroundMockup flex flex-col place-items-center place-content-center gap-[5vh]">
            <div className="flex flex-col place-items-center place-content-center gap-[20px] text-primary">
                <h3 className="fromTop font-bold text-[2rem]">
                    Invertí en vos hoy
                </h3>
                <span className="fromTop font-light tracking-wide leading-[22px] text-center text-[1rem] w-[270px]">
                    Probá numa gratis y empezá a mejorar tu bienestar financiero
                </span>
            </div>

            <Link
                href="/auth/register"
                onClick={() => setLoading(true)}
                className="fromTop text-[1rem] primary-button py-[8px] w-[45vw] max-w-[180px] min-h-[25px] h-[40px] flex place-content-center place-items-center"
            >
                {loading ? (
                    <span className="d-loading d-loading-spinner text-neutral-200"></span>
                ) : (
                    "Comenzar ahora"
                )}
            </Link>
        </div>
    );
};

export default LastCTA;
