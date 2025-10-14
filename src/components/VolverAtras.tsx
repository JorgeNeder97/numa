import BackButton from "@/assets/icons/BackButton";
import Link from "next/link";
import React, { useState } from "react";

const VolverAtras = ({ href } : { href: string }) => {

    const [loadingBack, setLoadingBack] = useState<boolean>(false);

    return (
        <Link
            href={href}
            onClick={() => setLoadingBack(true)}
            className="w-[40px] h-[40px] lg:hidden absolute top-2 right-2 flex place-items-center place-content-center"
        >
            {loadingBack ? (
                <div className="w-[33.32px] h-[33.33px] rounded-xl bg-white flex place-items-center place-content-center">
                    <span className="d-loading d-loading-spinner text-tertiary"></span>
                </div>
            ) : (
                <BackButton />
            )}
        </Link>
    );
};

export default VolverAtras;
