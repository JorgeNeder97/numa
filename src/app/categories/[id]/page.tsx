"use client";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCategory } from "@/hooks/useCategory";
import { CategoryParams } from "@/models/dataTypes";
import { useSession } from "next-auth/react";
import { useTypes } from "@/hooks/useTypes";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

const editCategoryPage: React.FC<CategoryParams> = ({ params }) => {

    // Redirige al usuario
    const router = useRouter();

    // Manejan el Modal y su estilo/contenido
    const [isOpen, setIsOpen] = useState<boolean>(false); 
    const [isError, setIsError] = useState<boolean>(false); 

    // Obtener el id con los params de la url
    const categoryParams = use(params);
    const categoryId = Number(categoryParams.id); 
    
    // Obtener el usuario logueado
    const { data: session, status } = useSession();

    // Obtener el tipo de categoría (ingreso y egreso) y las categorías
    const { types } = useTypes();
    const { category } = useCategory(categoryId);   

    // React-hook-form
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    // Setea automaticamente el tipeId de la categoría
    useEffect(() => {
        if (category?.typeId) {
          setValue("typeId", category.typeId);
        }
    }, [category, setValue]);

    //  OnSubmit...
    const onSubmit = handleSubmit(async (data) => {
        if(status === "authenticated") {
            try {
                const res = await fetch("/api/auth/categories", {
                    method: "PATCH",
                    body: JSON.stringify({
                        id: categoryId,
                        name: data.name,
                        userId: Number(session?.user.id),
                        typeId: Number(data.typeId),
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

        } else return;
    });

    // Redirige al usuario al presionar "continuar" en el modal
    const onContinue = () => {
        setIsOpen(false);
        router.push("/categories")
    }

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-items-center place-content-center py-[50px]">
            <form className="form" onSubmit={onSubmit}>
                <div className="label-input mb-5">
                    <h2 className="w-full text-3xl font-medium">Editar Categoría</h2>
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
                        defaultValue={category?.name}
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
                    >
                        <option className="font-extralight italic" value="" disabled hidden>Elige un tipo de categoría</option>
                        {   
                            types.length > 0 ? 
                            types.map((type, i) => (
                                <option key={i} value={type.id}>{type.name == "income" ? "Ingreso" : "Egreso"}</option>
                            )) : (<option className="italic" disabled>Cargando...</option>)
                        }
                    </select>
                    <span className={errors.typeId ? "error-span" : "opacity-0 h-[10px]"}>{errors?.typeId?.message?.toString()}</span>
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
                            <p className="modal-text-succed text-normal">No se pudo modificar la categoría</p>
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


export default editCategoryPage;