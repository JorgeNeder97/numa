import IncomeIcon from "@/assets/icons/IncomeIcon";
import Link from "next/link";
import { useState } from "react";

const NewIncomeButton = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Link
            href="/dashboard/transactions/new/income"
            onClick={() => setLoading(true)}
            className="bg-tertiary min-w-[120px] h-[50px] flex place-items-center gap-[10px] px-[10px] py-[5px] rounded-[5px]"
        >
            <span className="text-white text-[1rem]">Nuevo Ingreso</span>
            <div className="w-[1px] h-[20px] bg-neutral-200 rounded-[50%]"></div>
            <div className="w-[38px] h-[38px] flex place-items-center place-content-center">
                {
                    loading ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                    : <IncomeIcon stroke="white" />
                }
            </div>
        </Link>
    );
};

export default NewIncomeButton;
