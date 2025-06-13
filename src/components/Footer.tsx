"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DashboardIcon from "@/assets/icons/DashboardIcon";
import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import TransactionsIcon from "@/assets/icons/TransactionsIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import Image from "next/image";
import GitHub from "@/assets/icons/GitHub";
import revealElements from "@/hooks/scrollReveal";

const Footer = () => {

    const pathname = usePathname();
    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
            router.refresh();
    }, [status]);

    const linkClass = (path: string) =>
    `navigationIconContainer relative flex flex-col items-center ${
        pathname.startsWith(path)
            ? "after:content-[''] after:absolute after:bottom-[-7] after:w-full after:h-[3px] after:bg-white after:rounded-full"
            : ""
    }`;

    const linkDashboard = (path: string) => 
        `navigationIconContainer relative flex flex-col items-center ${
        pathname === path
            ? "after:content-[''] after:absolute after:bottom-[-7] after:w-full after:h-[3px] after:bg-white after:rounded-full"
            : ""
    }`;

    if(status === "authenticated")
    return (
        <footer className={pathname === "/bienvenido" || pathname === "/auth/login" ? "hidden" : `bg-tertiary text-white w-full h-[90px] sticky bottom-0 flex px-[20px] place-items-center place-content-around`}>
            <Link href="/dashboard" className={linkDashboard("/dashboard")}>
                <DashboardIcon />
                <span className="navigationIconText">Dashboard</span>
            </Link>
            <Link href="/dashboard/categories" className={linkClass("/dashboard/categories")}>
                <CategoriesIcon />
                <span className="navigationIconText">Categorías</span>
            </Link>
            <Link href="/dashboard/transactions" className={linkClass("/dashboard/transactions")}>
                <TransactionsIcon />
                <span className="navigationIconText">Transacciones</span>
            </Link>
            <Link href="/dashboard/settings" className={linkClass("/dashboard/settings")}>
                <SettingsIcon />
                <span className="navigationIconText">Ajustes</span>
            </Link>
        </footer>
    );
    else if(status === "loading") return (
        <footer className={pathname === "/bienvenido" ? "hidden" : `bg-black text-white w-full h-[90px] flex px-[20px] place-items-center place-content-center`}>
            <span className="d-loading d-loading-spinner text-primary"></span>
        </footer>
    );
    
    else return (
        <footer className={pathname === "/bienvenido" ? "hidden" : `relative bg-black text-white w-full flex flex-col pl-[3vh] pr-[5px] py-[3vh] gap-[5vh] place-items-center place-content-center`}>
            <div className="w-full flex place-items-start place-content-between gap-[10px]">    
                <div className="w-full flex flex-col place-items-start place-content-center gap-[10px]">
                    <span className="fromLeft text-[1.2rem] font-semibold">Recursos</span>
                    <div className="text-[.875rem] font-light flex flex-col place-items-start gap-[5px]">
                        <a href="/politicas_numa.pdf" download="Políticas_de_Privacidad_Numa.pdf" className="fromLeft">Políticas de Privacidad</a>
                        <a href="mailto:jorge.neder97@gmail.com" className="fromLeft">Contacto</a>
                    </div>
                </div>

                <div className="w-full flex flex-col place-items-center place-content-center gap-[10px]">
                    <span className="fromRight text-[1.2rem] font-semibold">Redes Sociales</span>
                    <Link href="https://github.com/JorgeNeder97" className="fromRight">
                        <GitHub />
                    </Link>
                </div>
            </div>
            <div className="w-full mb-[3vh] flex place-items-center place-content-center gap-[10px]">
                <p className="fromLeftSync text-white text-[1rem] font-normal max-w-[120px]">Designed & Developed by</p>
                <Image src="/mp.png" className="fromRight w-[130px]" width={200} height={120} alt="Jorge Neder" />
            </div>
            <span className="absolute bottom-1 right-3 text-neutral-100 text-[10px]">
                © 2025 Numa. Todos los derechos reservados.
            </span>
        </footer>
    );
};

export default Footer;