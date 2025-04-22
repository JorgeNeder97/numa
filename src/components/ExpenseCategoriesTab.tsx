"use client";
import { useExpenseCategories } from "@/hooks/useExpenseCategories";
import Link from "next/link";

const ExpenseCategoriesTab = () => {
    const { expenseCategories, loadingExpenseCategories, expenseCategoriesError } = useExpenseCategories();

    const deleteCategory = async(id: number) => {
        try {
            const res = await fetch("/api/auth/categories", {
                method: "DELETE",
                body: JSON.stringify({
                    id
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
    
            if(!res || !res.ok) alert("No se pudo eliminar la categoría");
            alert("Categoria eliminada");
        } catch (error) {
            if(error instanceof Error) console.log(error.message);
        }
    }

    return (
        <div className="overflow-x-auto rounded border border-black bg-white shadow-2xs">
            <table className="w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-left pl-5">Egresos</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !expenseCategoriesError ?
                            loadingExpenseCategories ? 
                                <tr><th>Cargando Categorías...</th></tr> 
                            : expenseCategories.map((cat, i) => (
                                <tr key={i}>
                                    <td className="w-[80%] text-left pl-5">{cat.name}</td>
                                    <td className="pr-5"><Link href={`/categories/${cat.id}`}>Edit</Link></td>
                                    <td className="pr-5" onClick={() => deleteCategory(cat.id)}>Delete</td>
                                </tr>
                            ))
                        : <tr><th>Se produjo un error.</th></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseCategoriesTab;
