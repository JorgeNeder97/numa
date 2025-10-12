"use client";
import ExpenseCategoriesTab from "@/components/ExpenseCategoriesTab";
import IncomeCategoriesTab from "@/components/IncomeCategoriesTab";
import NewCategoryButton from "@/components/NewCategoryButton";
import PageTransition from "@/components/PageTransition";

const CategoriesPage = () => {
    return (
        <PageTransition>
            <div className="w-full min-h-[calc(100vh-150px)] px-[30px] py-[30px] flex flex-col place-items-center gap-[20px]">
                <h3 className="text-[1.5rem] text-center text-darkPrimary font-semibold">Categorías</h3>
                <IncomeCategoriesTab />
                <ExpenseCategoriesTab />
                <NewCategoryButton />
            </div>
        </PageTransition>
    );
};


export default CategoriesPage;