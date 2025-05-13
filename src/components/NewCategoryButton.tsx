"use state";
import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import Link from "next/link"
import { useState } from "react";

const NewCategoryButton = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Link href="/dashboard/categories/newCategory" onClick={() => setLoading(true)} className="bg-tertiary w-full h-[50px] flex place-items-center place-content-center gap-[10px] px-[10px] py-[10px] rounded-[5px]">
            <span className="text-white text-[1rem]">Nueva Categoría</span>
            <div className="w-[1px] h-[20px] bg-white rounded-[50%]"></div>
            <div className="w-[38px] h-[38px] flex place-items-center place-content-center">
                {
                    loading ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                    : <CategoriesIcon />
                }
            </div>
        </Link>
    )
};

export default NewCategoryButton;