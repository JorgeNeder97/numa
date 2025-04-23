import ExpenseCategoriesTab from "@/components/ExpenseCategoriesTab";
import IncomeCategoriesTab from "@/components/IncomeCategoriesTab";
import Link from "next/link";

const CategoriesPage = () => {
    return (
        <div className="w-full px-[30px] py-[30px] flex flex-col gap-[20px]">
            <h2 className="text-xl text-center font-light">Categorías</h2>
            <IncomeCategoriesTab />
            <ExpenseCategoriesTab />
            <button className="primary-button">
                <Link href="/categories/newCategory">Nueva Categoría</Link>
            </button>
        </div>
    );
};


export default CategoriesPage;