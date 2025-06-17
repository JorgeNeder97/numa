"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Nav = () => {

    const pathname = usePathname();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const router = useRouter();
    const {data: session, status} = useSession();
    
    useEffect(() => {
        router.refresh();
    }, [status]);

    useEffect(() => {
        setIsChecked(false);
    }, [pathname])

    const toggleMenu = () => setIsChecked(prev => !prev);

    return (
        <nav className={pathname === "/bienvenido" ? "hidden" : `h-[80px] lg:h-[65px] w-full z-[300] sticky top-0 flex place-items-center place-content-between bg-tertiary`}>
            <div className="h-[80px] lg:h-[65px] relative z-[200] flex place-items-center place-content-between bg-tertiary pl-[30px] pr-[10px]">
                <Link href="/"><h1 className="text-neutral-200 text-4xl lg:text-[1.8rem] font-semibold">Numa</h1></Link>
            </div>
            <div className="hidden lg:block absolute top-[0px] right-[30px] z-[200]">
                {status === "unauthenticated" ?
                    <ul className="w-full h-[65px] flex place-items-center gap-[20px]">
                        <Link href="/" className="text-[1rem] text-white hover:text-primary hover:translate-x-[1px] transition-all duration-[.3s] ease-in-out">Inicio</Link>
                        <Link href="/auth/login" className="text-[1rem] text-white hover:text-primary hover:translate-x-[1px] transition-all duration-[.3s] ease-in-out">Acceder</Link>
                        <Link href="/auth/register" className="text-[1rem] text-white hover:text-primary hover:translate-x-[1px] transition-all duration-[.3s] ease-in-out">Registrarse</Link>
                    </ul>
                : status === "authenticated" ?
                    <ul className="w-full h-[65px] flex place-items-center gap-[20px]">
                        <Link href="/" className="text-[1rem] text-white">Inicio</Link>
                        <span className="text-[1rem] text-white hover:cursor-pointer" onClick={() => signOut()}>Cerrar Sesión</span>
                    </ul>
                : ""
                }

            </div>
            <label className="absolute top-[25px] right-6 z-[250] d-swap d-swap-rotate lg:hidden outline-none">

                <input type="checkbox" onChange={toggleMenu} checked={isChecked} />

                <svg
                    className="d-swap-off d-fill-current invert"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                <svg
                    className="d-swap-on d-fill-current invert"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512">
                    <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
            </label>
            <div className={(isChecked ? "translate-y-[0%]" : "translate-y-[-100%]") + ` lg:hidden h-[200px] z-[100] w-2/3 max-w-[300px] fixed rounded-bl-[100%] flex place-content-center top-[79px] right-0 bg-tertiary transition-all duration-[.5s] ease-in-menu`}>
                <ul className="h-[130px] flex flex-col place-items-start place-content-center gap-[15px] pl-[80px]">
                    {
                        status === "unauthenticated" ? (
                            <>
                                <li>
                                    <Link href="/" className="text-xl text-white">Inicio</Link>
                                </li>
                                <li>
                                    <Link href="/auth/login" className="text-xl text-white">Acceder</Link>
                                </li>
                                <li>
                                    <Link href="/auth/register" className="text-xl text-white">Registrarse</Link>
                                </li>
                            </>
                        ) : status === "loading" ? (
                            <>
                                <span className="d-loading d-loading-spinner text-primary"></span>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/" className="text-xl text-white">Inicio</Link>
                                </li>
                                <li className="text-xl text-white" onClick={() => signOut()}>Cerrar Sesión</li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Nav;