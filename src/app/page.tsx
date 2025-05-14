"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const HomePage = () => {

    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === "authenticated") router.push("/bienvenido");
    }, [status]);

    if(status === "loading") return <div className="w-full h-[100vh] bg-tertiary"></div>

    return (
        <div className="min-h-[calc(100vh-80px-70px)]">
            <p>HomePage</p>
        </div>
    );
};

export default HomePage;
