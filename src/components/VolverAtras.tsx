import BackButton from "@/assets/icons/backButton";
import Link from "next/link";
import React, { useState } from "react";

const VolverAtras = ({ href } : { href: string }) => {

    const [loadingBack, setLoadingBack] = useState<boolean>(false);

    return (
        <Link
            href={href}
            onClick={() => setLoadingBack(true)}
            className="w-[40px] h-[40px] absolute top-2 right-2 flex place-items-center place-content-center"
        >
            {loadingBack ? (
                <div className="w-[33.32px] h-[33.33px] rounded-xl bg-tertiary flex place-items-center place-content-center">
                    <span className="d-loading d-loading-spinner text-neutral-200"></span>
                </div>
            ) : (
                <BackButton />
            )}
        </Link>
    );
};

export default VolverAtras;
