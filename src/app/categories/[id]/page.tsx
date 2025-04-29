"use client";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCategory } from "@/hooks/useCategory";
import { CategoryParams } from "@/models/dataTypes";
import { useSession } from "next-auth/react";
import { useTypes } from "@/hooks/useTypes";

const editCategoryPage: React.FC<CategoryParams> = ({ params }) => {

    const categoryParams = use(params);
    const categoryId = Number(categoryParams.id);
    const { data: session, status } = useSession();

    const { types } = useTypes();
    const { category } = useCategory(categoryId);
    
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (category?.typeId) {
          setValue("typeId", category.typeId);
        }
      }, [category, setValue]);

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

                if(!res || !res.ok) throw new Error("Algo salió mal... al parecer res es undefined o null");
            } catch (error) {
                if(error instanceof Error) console.log(error.message);
            }
        } else return;
    });

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
        </div>
    );
};


export default editCategoryPage;