"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Nav = () => {

    const router = useRouter();
    const {data: session, status} = useSession();
    
    useEffect(() => {
        router.refresh();
    }, [status]);

    const menuMobile = useRef<HTMLDivElement | null>(null);

    const handleMenu = () => {
        const menu = menuMobile.current;
        menu && menu.classList.toggle("translate-x-[0%]");
    };

    return (
        <nav className="h-[80px] sticky top-0 z-[100] flex place-items-center place-content-between bg-emerald-700 pl-[30px] pr-[10px]">
            <Link href="/"><h1 className="text-neutral-200 text-4xl font-semibold">Numa</h1></Link>
            
            <label className="absolute top-[25px] right-6 z-50 d-swap d-swap-rotate lg:hidden outline-none">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onClick={handleMenu} />

                {/* hamburger icon */}
                <svg
                    className="d-swap-off d-fill-current invert"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
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
            <div className="lg:hidden h-[calc(100vh-80px)] w-2/3 max-w-[300px] fixed z-[100] flex place-content-center top-[80px] right-0 translate-x-100 bg-neutral-100 py-[30px] transition-all duration-[.5s] ease-in-out" ref={menuMobile}>
                <ul className="h-[100vh] flex flex-col place-items-center gap-[15px]">
                    {
                        status === "unauthenticated" ? (
                            <>
                                <li>
                                    <Link href="/" className="text-lg">Home</Link>
                                </li>
                                <li>
                                    <Link href="/auth/login" className="text-lg">Acceder</Link>
                                </li>
                                <li>
                                    <Link href="/auth/register" className="text-lg">Registrarse</Link>
                                </li>
                            </>
                        ) : status === "loading" ? (
                            <>
                                <span className="d-loading d-loading-spinner text-primary"></span>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/" className="text-lg">Home</Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="text-lg">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/categories" className="text-lg">Categorías</Link>
                                </li>
                                <li>
                                    <Link href="/transactions" className="text-lg">Transacciones</Link>
                                </li>
                                <li>
                                    <Link href="/transactions/new/income" className="text-lg">Nuevo Ingreso</Link>
                                </li>
                                <li>
                                    <Link href="/transactions/new/expense" className="text-lg">Nuevo Egreso</Link>
                                </li>
                                <li className="text-lg" onClick={() => signOut()}>Cerrar Sesión</li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Nav;