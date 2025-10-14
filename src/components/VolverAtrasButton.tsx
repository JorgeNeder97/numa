import Link from "next/link";
import React from "react";

const VolverAtrasButton = ({ href }: { href: string }) => {
    return (
        <Link
            href={href}
            className="bg-white lg:bg-tertiary-hover flex place-items-center pl-[30px] hover:cursor-pointer text-center w-[140px] rounded-lg h-[40px] relative text-white text-xl font-semibold group"
        >
            <div className="bg-tertiary-light rounded-lg h-[40px] w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-[.3s] ease-in-out">
                <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#FFFFFF"
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    ></path>
                    <path
                        fill="#FFFFFF"
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    ></path>
                </svg>
            </div>
            <p className="translate-x-4 text-sm">Volver Atras</p>
        </Link>
    );
};

export default VolverAtrasButton;