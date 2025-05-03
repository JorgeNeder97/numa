"use client";
import Modal from "@/components/Modal";
import { useExpenseCategories } from "@/hooks/useExpenseCategories";
import { getActualDate } from "@/utils/general/formatDates";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ExpensePage = () => {

    // Redirige al usuario
    const router = useRouter();

    // Manejan el modal y su estilo/contenido
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Obtener las categorías de egresos
    const { expenseCategories, loadingExpenseCategories, expenseCategoriesError } = useExpenseCategories();
    
    // React-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // onSubmit...
    const onSubmit = handleSubmit(async (data) => {
        const fecha = getActualDate();
        try {
            const res = await fetch("/api/auth/transactions", {
                method: "POST",
                body: JSON.stringify({
                    amount: data.amount,
                    categoryId: data.categoryId,
                    description: data.description,
                    date: fecha,
                    typeId: 2,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            // Si es un error cambia el modal y lo muestra
            if(!res || res.status !== 200) {
                setIsError(true);
                setIsOpen(true);
            }
              
            // Si es exitoso muestra el modal
            if(res.ok && res.status == 200) setIsOpen(true);
            
        } catch (error) {
            if(error instanceof Error) console.log(error.message);
        }
    });

    // Redirige al usuario al presionar "continuar" en el modal
    const onContinue = () => {
        setIsOpen(false);
        router.push("/transactions")
    }

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-items-center place-content-center py-[50px]">
            <form className="form" onSubmit={onSubmit}>
                <div className="label-input mb-5">
                    <h2 className="w-full text-3xl font-medium">Nuevo Egreso</h2>
                </div>
                <div className="label-input relative">
                    <label htmlFor="amount" className="label">Monto</label>
                    <p className="absolute top-[29px] left-3 text-lg z-20 text-white">$</p>
                    <input 
                        type="text" 
                        className="input pl-[25px]" 
                        {...register("amount", {
                            required: {
                                value: true,
                                message: "Debes ingresar un monto",
                            },
                            pattern: {
                                value: /^\d+(?:[.,]\d{1,2})?$/g,
                                message: "Debes ingresar un monto válido"
                            }
                        })}
                    />
                    <span className={errors.amount ? "error-span" : "opacity-0 h-[10px]"}>{errors?.amount?.message?.toString()}</span>
                </div>
                <div className="label-input">
                    <label htmlFor="category">Categoría</label>
                    <select
                        className="input"
                        {...register("categoryId", {
                            required: {
                                value: true,
                                message: "Debes elegir una categoría"
                            }
                        })}
                        defaultValue=""
                    >
                        <option className="font-extralight italic" value="" disabled hidden>Elige una categoría</option>
                        {   
                            !expenseCategoriesError ?
                                (loadingExpenseCategories ?
                                    <option className="loading-option" value="" disabled>Cargando...</option>
                                : expenseCategories.length > 0 ? 
                                        expenseCategories.map((category, i) => (<option key={i} value={category.id}>{category.name}</option>)) 
                                    : (<option className="italic" disabled>No creaste ninguna categoría aún</option>))
                            : <option className="error-select" value="" disabled>Se produjo un error.</option>
                        }
                    </select>
                    <span className={errors.categoryId ? "error-span" : "opacity-0 h-[10px]"}>{errors?.categoryId?.message?.toString()}</span>
                </div>

                <div className="label-input">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        className="input h-[120px] py-3"
                        {...register("description", {
                            required: {
                                value: true,
                                message: "Debes agregar una descripción al ingreso"
                            }
                        })}
                    ></textarea>
                    <span className={errors.description ? "error-span" : "opacity-0 h-[10px]"}>{errors?.description?.message?.toString()}</span>
                </div>

                <button className="primary-button">
                    Guardar
                </button>
            </form>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} exitButton={false} style={isError ? "Error" : "Success"}>
                {
                    isError ?
                        <div className="flex flex-col place-content-center gap-[20px]">
                            <span className="modal-text-succed">Operación fallida</span>
                            <p className="modal-text-succed text-normal">No se pudo generar el Egreso</p>
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


export default ExpensePage;