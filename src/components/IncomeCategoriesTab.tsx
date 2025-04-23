"use client";
import { useIncomeCategories } from "@/hooks/useIncomeCategories";
import Link from "next/link";

const IncomeCategoriesTab = () => {
    const { incomeCategories, loadingIncomeCategories, incomeCategoriesError } = useIncomeCategories();

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
        <div className="overflow-x-auto rounded bg-almostwhite shadow-medium">
            <table className="w-full rounded overflow-visible">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-left text-xl pl-5 py-5 text-emerald-500">Ingresos</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !incomeCategoriesError ?
                            loadingIncomeCategories ? 
                                <tr><th className="py-5 font-thin italic">Cargando Categorías...</th></tr> 
                            : incomeCategories.map((cat, i) => (
                                <tr key={i} className="font-light">
                                    <td className="w-[80%] text-left pl-5 py-5">{cat.name}</td>
                                    <td className="pr-5 py-5 hover:cursor-pointer"><Link href={`/categories/${cat.id}`}>Edit</Link></td>
                                    <td className="pr-5 py-5 hover:cursor-pointer" onClick={() => deleteCategory(cat.id)}>Delete</td>
                                </tr>
                            ))
                        : <tr><th>Se produjo un error.</th></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default IncomeCategoriesTab;
