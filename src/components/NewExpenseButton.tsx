import ExpenseIcon from "@/assets/icons/ExpenseIcon";
import Link from "next/link";
import { useState } from "react";

const NewExpenseButton = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Link
            href="/dashboard/transactions/new/expense"
            onClick={() => setLoading(true)}
            className="bg-white min-w-[120px] flex place-items-center gap-[10px] px-[10px] py-[5px] rounded-[5px]"
        >
            <span className="text-darkPrimary text-[1rem]">Nuevo Egreso</span>
            <div className="w-[1px] h-[20px] bg-darkPrimary rounded-[50%]"></div>
            <div className="w-[38px] h-[38px] flex place-items-center place-content-center">
                {
                    loading ? <span className="d-loading d-loading-spinner text-darkPrimary"></span>
                    : <ExpenseIcon stroke={"#003322"} />
                }
            </div>
            
        </Link>
    );
};

export default NewExpenseButton;
