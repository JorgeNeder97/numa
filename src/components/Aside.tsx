import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardIcon from "@/assets/icons/DashboardIcon";
import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import TransactionsIcon from "@/assets/icons/TransactionsIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import path from 'path';

const Aside = () => {

    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [status]);

    if(status === "authenticated")
    return (
        <div className="hidden lg:flex flex-col lg:fixed gap-[40px] top-0 left-0 z-[50] w-[300px] h-[100vh] bg-tertiary-light">
            <div className="w-full flex flex-col place-items-center gap-[30px] pt-[50px]">
                <Link href="/" className="flex flex-col place-items-center">
                    <Image src="/favicon.ico" alt="Numa Logo" width={70} height={70} className="w-[70px] h-[70px] mb-[10px]" />
                    <h2 className="text-neutral-200 text-4xl font-semibold">Numa</h2>
                </Link>
                <span className="text-white text-[.875rem]">Hola, {session.user?.name}</span>
                <div className="w-[250px] translate-y-[10px] border-white/50 border-b-[.5px]"></div>
            </div>
            <div className="w-full flex place-items-center place-content-center">
                <ul className="flex flex-col place-items-start">
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard" className={`flex place-items-center place-content-center gap-[5px] ${pathname === "/dashboard" ? "text-white" : "text-white/50"}`}>
                            <div className="w-[30px] flex place-items-end place-content-center">
                                <DashboardIcon className="mb-[7px]" width="30px" height="30px" stroke={pathname === "/dashboard" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"} /> 
                            </div>
                            Dashboard
                        </Link>
                    </li>
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard/categories" className={`flex place-items-center place-content-center gap-[5px] ${pathname === "/dashboard/categories" ? "text-white" : "text-white/50"}`}>
                            <div className="w-[30px] flex place-items-end place-content-center">
                                <CategoriesIcon width="20px" height="20px" stroke={pathname === "/dashboard/categories" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"} /> 
                            </div>
                            Categorías
                        </Link>
                    </li>
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard/transactions" className={`flex place-items-center place-content-center gap-[5px] ${pathname === "/dashboard/transactions" ? "text-white" : "text-white/50"}`}>
                            <div className="w-[30px] flex place-items-end place-content-center">
                                <TransactionsIcon width="25px" height="25px" stroke={pathname === "/dashboard/transactions" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"} /> 
                            </div>
                            Transacciones
                        </Link>
                    </li>
                    <li className="h-[40px] w-[150px] flex place-items-center">
                        <Link href="/dashboard/settings" className={`flex place-items-center place-content-center gap-[5px] ${pathname === "/dashboard/settings" ? "text-white" : "text-white/50"}`}>
                            <div className="w-[30px] flex place-items-end place-content-center">
                                <SettingsIcon width="20px" height="20px" stroke={pathname === "/dashboard/settings" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"} /> 
                            </div>
                            Ajustes
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full relative h-full">
                <span className="absolute bottom-4 right-6 text-[1rem] text-white/50 hover:cursor-pointer hover:text-white transition-all duration-[.3s] ease-in-out" onClick={() => signOut()}>Cerrar Sesión</span>
            </div>
        </div>
    );
};

export default Aside;
