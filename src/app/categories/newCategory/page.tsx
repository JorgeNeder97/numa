"use client";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { useTypes } from "@/hooks/useTypes";
import { useRouter } from "next/navigation";

const newCategoryPage = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { types, loadingTypes, typesError } = useTypes();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await fetch("/api/auth/categories", {
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                    typeId: data.typeId,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if(res.ok && res.status == 200) setIsOpen(true);
        } catch (error) {
            if(error instanceof Error) console.log(error.message);
        }
    });

    const onContinue = () => {
        setIsOpen(false);
        router.push("/categories")
    }

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-items-center place-content-center py-[30px]">
            <form className="form" onSubmit={onSubmit}>
                <div className="label-input mb-5">
                    <h2 className="w-full text-3xl font-medium">Nueva Categoría</h2>
                </div>
                <div className="label-input relative">
                    <label htmlFor="name" className="label">Nombre</label>
                    <input 
                        type="text" 
                        className="input" 
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Debes ingresar un nombre",
                            },
                        })}
                    />
                    <span className={errors.name ? "error-span" : "opacity-0 h-[10px]"}>{errors?.name?.message?.toString()}</span>
                </div>

                <div className="label-input">
                    <label htmlFor="typeId">Tipo de categoría</label>
                    <select
                        className="input"
                        {...register("typeId", {
                            required: {
                                value: true,
                                message: "Debes elegir una opción"
                            }
                        })}
                        defaultValue=""
                    >
                        <option className="font-extralight italic" value="" disabled hidden>Elige un tipo de categoría</option>
                        {   
                            !typesError ?
                                loadingTypes ?
                                    <option className="loading-option" value="" disabled>Cargando...</option>
                                :
                                    types.length > 0 ? 
                                        types.map((type, i) => (<option key={i} value={type.id}>{type.name == "income" ? "Ingreso" : "Egreso"}</option>)) 
                                    : (<option className="italic" disabled>Aún no existe ningun tipo...</option>)
                            : <option className="error-option" value="" disabled>Se produjo un error.</option>
                        }
                    </select>
                    <span className={errors.typeId ? "error-span" : "opacity-0 h-[10px]"}>{errors?.typeId?.message?.toString()}</span>
                </div>

                <button className="primary-button">
                    Guardar
                </button>
            </form>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} exitButton={false}>
                <div className="flex flex-col place-content-center gap-[20px]">
                    <span className="modal-text-succed">Operación exitosa</span>
                    <button className="inverse-primary-button" onClick={onContinue}>Continuar</button>
                </div>
            </Modal>
        </div>
    );
};


export default newCategoryPage;