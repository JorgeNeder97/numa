"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Footer = () => {

    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
            router.refresh();
    }, [status]);

    if(status === "authenticated")
    return (
        <footer className="relative bg-emerald-700 text-white w-full h-[70px] flex px-[20px] place-items-center place-content-around">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
        </footer>
    );
    else if(status === "loading") return <span className="d-loading d-loading-spinner text-primary"></span>
    
    else return (
        <footer className="relative bg-emerald-700 w-full h-[70px] flex px-[20px] place-items-center">
            <h2 className="text-white text-4xl font-semibold">Numa</h2>
            <span className="absolute bottom-1 right-2 text-neutral-100 text-[10px]">
                © 2025 Numa. Todos los derechos reservados.
            </span>
        </footer>
    );
};

export default Footer;
