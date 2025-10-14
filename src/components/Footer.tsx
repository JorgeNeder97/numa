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
        <>
            {/* Autenticado En Mobile */}
            <footer className={pathname === "/bienvenido" || pathname === "/auth/login" || pathname === "/auth/register" ? "hidden" : `lg:hidden bg-tertiary text-white w-full h-[90px] sticky bottom-0 flex px-[20px] place-items-center place-content-around`}>
                <Link href="/dashboard" className={linkDashboard("/dashboard")}>
                    <DashboardIcon width="38px" height="38px" stroke="white" />
                    <span className="navigationIconText">Dashboard</span>
                </Link>
                <Link href="/dashboard/categories" className={linkClass("/dashboard/categories")}>
                    <CategoriesIcon width="28px" height="28px" stroke="white" />
                    <span className="navigationIconText">Categorías</span>
                </Link>
                <Link href="/dashboard/transactions" className={linkClass("/dashboard/transactions")}>
                    <TransactionsIcon width="38px" height="38px" stroke="white" />
                    <span className="navigationIconText">Transacciones</span>
                </Link>
                <Link href="/dashboard/settings" className={linkClass("/dashboard/settings")}>
                    <SettingsIcon width="38px" height="38px" stroke="white" />
                    <span className="navigationIconText">Ajustes</span>
                </Link>
            </footer>
            {/* Autenticado En Desktop (footer normal) */}
            <footer className={pathname === "/bienvenido" || pathname === "/auth/login" || pathname === "/auth/register" || pathname.startsWith("/dashboard") ? "hidden" : `hidden relative bg-tertiary text-white w-full lg:flex flex-col md:flex-row pl-[3vh] md:pl-[50px] pr-[5px] py-[3vh] gap-[5vh] place-items-center place-content-center md:place-content-between`}>
            <div className="w-full md:w-[53%] flex place-items-start place-content-between md:place-content-start gap-[10px] md:gap-[20px]">    
                <div className="w-full md:w-[50%] flex flex-col place-items-start place-content-center gap-[10px]">
                    <span className="text-[1.2rem] font-semibold">Recursos</span>
                    <div className="text-[.875rem] font-light flex flex-col place-items-start gap-[5px]">
                        <a href="/politicas_numa.pdf" download="Políticas_de_Privacidad_Numa.pdf" className="text-grayBackground hover:text-white transition-all duration-[.3s] ease-in-out">Políticas de Privacidad</a>
                        <a href="mailto:jorge.neder97@gmail.com" className="text-grayBackground hover:text-white transition-all duration-[.3s] ease-in-out">Contacto</a>
                    </div>
                </div>

                <div className="w-full md:w-[50%] flex flex-col md:pr-[0] pr-[3vh] place-items-end place-content-center">
                    <div className="flex flex-col place-items-center place-content-center gap-[10px]">
                        <span className="text-[1.2rem] font-semibold">Redes Sociales</span>
                        <Link href="https://github.com/JorgeNeder97" target="_blank">
                            <GitHub />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="self-start md:w-[40%] mb-[3vh] md:pr-[10px] flex place-items-center place-content-center md:place-content-end gap-[10px]">
                <p className="text-white text-[1rem] font-normal max-w-[120px]">Designed & Developed by</p>
                <Image src="/mp.png" className="w-[130px]" width={200} height={120} alt="Jorge Neder" />
            </div>
            <span className="absolute bottom-1 right-3 text-neutral-100 text-[10px]">
                © 2025 Numa. Todos los derechos reservados.
            </span>
        </footer>
        </>
    );
    else if(status === "loading") return (
        <footer className={pathname === "/bienvenido"  ? "hidden" : `bg-tertiary text-white w-full h-[90px] flex px-[20px] place-items-center place-content-center`}>
            <span className="d-loading d-loading-spinner text-white"></span>
        </footer>
    );
    
    else return (
        <footer className={pathname === "/bienvenido" || pathname === "/auth/login" || pathname === "/auth/register" ? "hidden" : ` relative bg-tertiary text-white w-full flex flex-col md:flex-row pl-[3vh] md:pl-[50px] pr-[5px] py-[3vh] gap-[5vh] place-items-center place-content-center md:place-content-between`}>
            <div className="w-full md:w-[53%] flex place-items-start place-content-between md:place-content-start gap-[10px] md:gap-[20px]">    
                <div className="w-full md:w-[50%] flex flex-col place-items-start place-content-center gap-[10px]">
                    <span className="text-[1.2rem] font-semibold">Recursos</span>
                    <div className="text-[.875rem] font-light flex flex-col place-items-start gap-[5px]">
                        <a href="/politicas_numa.pdf" download="Políticas_de_Privacidad_Numa.pdf" className="text-grayBackground hover:text-white transition-all duration-[.3s] ease-in-out">Políticas de Privacidad</a>
                        <a href="mailto:jorge.neder97@gmail.com" className="text-grayBackground hover:text-white transition-all duration-[.3s] ease-in-out">Contacto</a>
                    </div>
                </div>

                <div className="w-full md:w-[50%] flex flex-col md:pr-[0] pr-[3vh] place-items-end place-content-center">
                    <div className="flex flex-col place-items-center place-content-center gap-[10px]">
                        <span className="text-[1.2rem] font-semibold">Redes Sociales</span>
                        <Link href="https://github.com/JorgeNeder97" target="_blank">
                            <GitHub />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="self-start md:w-[40%] mb-[3vh] md:pr-[10px] flex place-items-center place-content-center md:place-content-end gap-[10px]">
                <p className="text-white text-[1rem] font-normal max-w-[120px]">Designed & Developed by</p>
                <Image src="/mp.png" className="w-[130px]" width={200} height={120} alt="Jorge Neder" />
            </div>
            <span className="absolute bottom-1 right-3 text-neutral-100 text-[10px]">
                © 2025 Numa. Todos los derechos reservados.
            </span>
        </footer>
    );
};

export default Footer;