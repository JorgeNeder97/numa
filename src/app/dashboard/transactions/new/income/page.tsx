"use client";
import Modal from "@/components/Modal";
import VolverAtras from "@/components/VolverAtras";
import { useIncomeCategories } from "@/hooks/useIncomeCategories";
import { getActualDate } from "@/utils/general/formatDates";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const IncomePage = () => {

    // Redirige al usuario
    const router = useRouter();

    // Manejan el modal y su estilo/contenido
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isFirst, setIsFirst] = useState<boolean>(false);

    // Maneja el spinner de carga
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    // Obtener las categorías de ingresos
    const { incomeCategories, loadingIncomeCategories, incomeCategoriesError } = useIncomeCategories();
    
    // React-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Verifica que hayan categorías de ingresos
    useEffect(() => {
        if(!loadingIncomeCategories && incomeCategories.length === 0) {
            setIsFirst(true);
            setIsOpen(true);
        }
    }, [loadingIncomeCategories, incomeCategories])

    // OnSubmit...
    const onSubmit = handleSubmit(async (data) => {
        const fecha = getActualDate();
        try {
            // Spinner de carga
            setLoadingFetch(true);

            const res = await fetch("/api/auth/transactions", {
                method: "POST",
                body: JSON.stringify({
                    amount: data.amount,
                    categoryId: data.categoryId,
                    description: data.description,
                    date: fecha,
                    typeId: 1,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            setLoadingFetch(false);

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
        router.push("/dashboard/transactions")
    }

    // Redirige al usuario al presionar "Generar categoría" en el modal
    const handleGenerate = () => {
        setIsOpen(false);
        router.push("/dashboard/categories/newCategory");
    }

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-items-center place-content-center py-[50px]">
            <form className="form" onSubmit={onSubmit}>
                <VolverAtras href="/dashboard/transactions" />
                <div className="w-full flex flex-col place-items-center gap-[20px]">
                    <div className="label-input mb-5">
                        <h2 className="w-full text-3xl font-medium">Nuevo Ingreso</h2>
                    </div>
                    <div className="label-input relative">
                        <label htmlFor="amount" className="label">Monto</label>
                        <p className="absolute top-[38px] lg:top-[36px] left-3 text-lg z-20 text-white">$</p>
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
                                !incomeCategoriesError ?
                                    (loadingIncomeCategories ? 
                                        <option className="loading-option text-black" value="" disabled>Cargando...</option> 
                                    : incomeCategories.length > 0 ? 
                                            incomeCategories.map((category, i) => (<option key={i} className="text-black" value={category.id}>{category.name}</option>)) 
                                        : (<option className="italic text-black" disabled>No creaste ninguna categoría aún</option>)) 
                                : <option className="error-option text-black" value="" disabled>Se produjo un error</option>
                            }
                        </select>
                        <span className={errors.categoryId ? "error-span" : "opacity-0 h-[10px]"}>{errors?.categoryId?.message?.toString()}</span>
                    </div>

                    <div className="label-input">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            className="input h-[100px] py-3"
                            {...register("description")}
                        ></textarea>
                        <span className={errors.description ? "error-span" : "opacity-0 h-[10px]"}>{errors?.description?.message?.toString()}</span>
                    </div>
                </div>

                <button className="primary-button w-full text-[1rem]">
                    {
                        loadingFetch ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                        : "Generar Ingreso"
                    }
                </button>
            </form>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} exitButton={false} style={isError ? "Error" : isFirst ? "Black" : "Success"}>
                {
                    !loadingIncomeCategories && incomeCategories.length === 0 ? 
                        <div className="flex flex-col place-content-center gap-[20px]">
                            <span className="modal-title">No tienes categorías de Ingresos</span>
                            <p className="modal-text">Para generar un nuevo ingreso debes tener al menos una <span className="font-semibold">categoría de ingresos</span></p>
                            <button className="primary-button" onClick={handleGenerate}>Generar categoría</button>
                        </div>
                    :
                    isError ?
                        <div className="flex flex-col place-content-center gap-[20px]">
                            <span className="modal-title">Operación fallida</span>
                            <p className="modal-text">No se pudo generar el Ingreso</p>
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

export default IncomePage;