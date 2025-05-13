"use client";
import { useExpenseCategories } from "@/hooks/useExpenseCategories";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";

const ExpenseCategoriesTab = () => {

    const router = useRouter();

    const [isError, setIsError] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { expenseCategories, loadingExpenseCategories, expenseCategoriesError, refetch } = useExpenseCategories();

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
            if(res && res.status === 403) setIsError(true);
            if(!res || !res.ok) console.log("Se produjo un error");
            setIsOpen(true);
        } catch (error) {
            if(error instanceof Error) console.log(error.message);
        }
    }

    const onContinue = async () => {
        setIsOpen(false);
        await refetch();
    }

    return (
        <div className="overflow-x-auto rounded bg-almostwhite shadow-medium">
            <table className="w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-left text-xl pl-5 py-5 text-red-400">Egreso</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !expenseCategoriesError ?
                            loadingExpenseCategories ? 
                                <tr><th className="py-5 font-thin italic flex place-items-center place-content-center gap-[10px]"><span className="d-loading d-loading-spinner text-primary"></span> Cargando Categorías...</th></tr> 
                            : expenseCategories.length > 0 ? 
                                expenseCategories.map((cat, i) => (
                                    <tr key={i} className="font-light border-b-1 border-t-1 border-neutral-200">
                                        <td className="w-[80%] text-left pl-5 pr-5 py-5">{cat.name}</td>
                                        <td className="pr-5 py-5"><Link href={`/dashboard/categories/${cat.id}`}><EditIcon className="w-[20px] h-[20px] hover:cursor-pointer" /></Link></td>
                                        <td className="pr-5 py-5"><DeleteIcon className="w-[25px] h-[25px] hover:cursor-pointer" onClick={() => deleteCategory(cat.id)} /></td>
                                    </tr>
                                ))
                            : <tr className="font-thin italic"><td className="text-left pl-5 py-5">No creaste ninguna categoría aún</td></tr>
                        : <tr><th>Se produjo un error.</th></tr>
                    }
                </tbody>
            </table>

            <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)} exitButton={false} style={isError ? "Error" : "Success"}>
                {
                    isError ?
                        <div className="flex flex-col place-content-center gap-[20px]">
                            <span className="modal-title">Operación fallida</span>
                            <p className="modal-text">La categoría que intentas eliminar se encuentra en uso</p>
                            <button className="inverse-secondary-button" onClick={onContinue}>Continuar</button>
                        </div>
                    :
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-title">Operación exitosa</span>
                        <button className="inverse-primary-button" onClick={onContinue}>Continuar</button>
                    </div>
                }
            </Modal>
        </div>
    );
};

export default ExpenseCategoriesTab;
