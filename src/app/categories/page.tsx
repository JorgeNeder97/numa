import ExpenseCategoriesTab from "@/components/ExpenseCategoriesTab";
import IncomeCategoriesTab from "@/components/IncomeCategoriesTab";
import Link from "next/link";

const CategoriesPage = () => {
    return (
        <div className="w-full min-h-[calc(100vh-150px)] px-[30px] py-[30px] flex flex-col gap-[20px]">
            <h2 className="text-xl text-center font-light">Categorías</h2>
            <IncomeCategoriesTab />
            <ExpenseCategoriesTab />
            <Link href="/categories/newCategory" className="primary-button">Nueva Categoría</Link>
        </div>
    );
};


export default CategoriesPage;