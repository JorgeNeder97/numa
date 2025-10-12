import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardIcon from "@/assets/icons/DashboardIcon";
import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import TransactionsIcon from "@/assets/icons/TransactionsIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";

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
                <div className="flex flex-col place-items-center">
                    <Image src="/favicon.ico" alt="Numa Logo" width={70} height={70} className="w-[70px] h-[70px] mb-[10px]" />
                    <h2 className="text-neutral-200 text-4xl font-semibold">Numa</h2>
                </div>
                <span className="text-white text-[.875rem]">Hola, {session.user?.name}</span>
                <div className="w-[250px] translate-y-[10px] border-white/50 border-b-[.5px]"></div>
            </div>
            <div className="w-full flex place-items-center place-content-center">
                <ul className="flex flex-col place-items-center translate-x-[-10px]">
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard" className="translate-x-[-4px] flex place-items-center place-content-center gap-[5px] text-white">
                            <DashboardIcon className="width-[30px] h-[30px] mb-[7px] " /> 
                            Dashboard
                        </Link>
                    </li>
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard/categories" className="flex place-items-center place-content-center gap-[5px] text-white">
                            <CategoriesIcon className="width-[20px] h-[20px]" /> 
                            Categorías
                        </Link>
                    </li>
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard/transactions" className="translate-x-[9px] flex place-items-center place-content-center text-white">
                            <TransactionsIcon className="width-[25px] h-[25px]" /> 
                            Transacciones
                        </Link>
                    </li>
                    <li className="h-[40px] flex place-items-center">
                        <Link href="/dashboard/settings" className="translate-x-[-14px] flex place-items-center place-content-center gap-[1px] text-white">
                            <SettingsIcon className="width-[20px] h-[20px]" /> 
                            Ajustes
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full relative h-full">
                <span className="absolute bottom-4 right-6 text-[1rem] text-white/90 hover:cursor-pointer hover:text-white transition-all duration-[.3s] ease-in-out" onClick={() => signOut()}>Cerrar Sesión</span>
            </div>
        </div>
    );
};

export default Aside;
