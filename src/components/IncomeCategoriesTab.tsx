"use client";
import { useIncomeCategories } from "@/hooks/useIncomeCategories";
import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";

const IncomeCategoriesTab = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const { incomeCategories, loadingIncomeCategories, incomeCategoriesError, refetch } = useIncomeCategories();

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
            if(res && res.status === 403) {
                setIsError(true);
                setIsOpen(true);
            }
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
                            : incomeCategories.length > 0 ? 
                                incomeCategories.map((cat, i) => (
                                    <tr key={i} className="font-light border-b-1 border-t-1 border-neutral-200">
                                        <td className="w-[80%] text-left pl-5 pr-5 py-5">{cat.name}</td>
                                        <td className="pr-5 py-5"><Link href={`/categories/${cat.id}`}><EditIcon className="w-[20px] h-[20px] hover:cursor-pointer" /></Link></td>
                                        <td className="pr-5 py-5"><DeleteIcon className="w-[25px] h-[25px] translate-y-[-1px] hover:cursor-pointer" onClick={() => deleteCategory(cat.id)} /></td>
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
                            <span className="modal-text-succed">Operación fallida</span>
                            <p className="modal-text-succed text-normal">La categoría que intentas eliminar se encuentra en uso</p>
                            <button className="inverse-secondary-button" onClick={onContinue}>Continuar</button>
                        </div>
                    :
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-text-succed">Operación exitosa</span>
                        <button className="inverse-primary-button" onClick={onContinue}>Continuar</button>
                    </div>
                }
            </Modal>
        </div>
    );
};

export default IncomeCategoriesTab;
