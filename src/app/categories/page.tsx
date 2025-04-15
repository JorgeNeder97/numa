import CategoriesTab from "@/components/CategoriesTab";
import Link from "next/link";

const CategoriesPage = () => {
    return (
        <div className="w-full px-[30px]">
            <h2>Categories Page</h2>
            <CategoriesTab />
            <div>
                <Link href="/categories/newCategory">Nueva Categoría</Link>
            </div>
        </div>
    );
};


export default CategoriesPage;