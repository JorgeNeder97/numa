"use state";
import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import Link from "next/link"
import { useState } from "react";

const NewCategoryButton = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Link href="/dashboard/categories/newCategory" onClick={() => setLoading(true)} className="bg-tertiary w-full lg:max-w-[300px] h-[50px] flex place-items-center place-content-center gap-[10px] px-[10px] py-[10px] rounded-[5px] shadow-button hover:bg-tertiary-hover transition-all duration-[.3s] ease-in-out">
            <span className="text-white text-[1rem]">Nueva Categoría</span>
            <div className="w-[1px] h-[20px] bg-white rounded-[50%]"></div>
            <div className="w-[38px] h-[38px] flex place-items-center place-content-center">
                {
                    loading ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                    : <CategoriesIcon width="28px" height="28px" stroke="white" />
                }
            </div>
        </Link>
    )
};

export default NewCategoryButton;