"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DashboardIcon from "@/assets/icons/DashboardIcon";
import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import TransactionsIcon from "@/assets/icons/TransactionsIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";

const Footer = () => {

    const pathname = usePathname();
    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
            router.refresh();
    }, [status]);

    const linkClass = (path: string) =>
    `navigationIconContainer relative flex flex-col items-center ${
        pathname === path
            ? "after:content-[''] after:absolute after:bottom-[-10] after:w-full after:h-[3px] after:bg-white after:rounded-full"
            : ""
    }`;

    if(status === "authenticated")
    return (
        <footer className=" bg-emerald-700 text-white w-full h-[100px] sticky bottom-0 flex px-[20px] place-items-center place-content-around">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
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
            <Link href="" className={linkClass("/dashboard/settings")}>
                <SettingsIcon />
                <span className="navigationIconText">Ajustes</span>
            </Link>
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
