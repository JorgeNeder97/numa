import ExpenseCategoriesTab from "@/components/ExpenseCategoriesTab";
import IncomeCategoriesTab from "@/components/IncomeCategoriesTab";
import Link from "next/link";

const CategoriesPage = () => {
    return (
        <div className="w-full px-[30px]">
            <h2>Categorías</h2>
            <IncomeCategoriesTab />
            <ExpenseCategoriesTab />
            <div>
                <Link href="/categories/newCategory">Nueva Categoría</Link>
            </div>
        </div>
    );
};


export default CategoriesPage;