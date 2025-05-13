import CategoriesIcon from "@/assets/icons/CategoriesIcon";
import Link from "next/link"

const NewCategoryButton = () => {
    return (
        <Link href="/dashboard/categories/newCategory" className="bg-tertiary w-full flex place-items-center place-content-center gap-[10px] px-[10px] py-[10px] rounded-[5px]">
            <span className="text-white text-[1rem]">Nueva Categoría</span>
            <div className="w-[1px] h-[20px] bg-white rounded-[50%]"></div>
            <CategoriesIcon />
        </Link>
    )
};

export default NewCategoryButton;