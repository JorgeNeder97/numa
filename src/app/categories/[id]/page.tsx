"use client";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useCategory } from "@/hooks/useCategory";
import { CategoryParams } from "@/models/categories";
import { useSession } from "next-auth/react";

const editCategoryPage: React.FC<CategoryParams> = ({ params }) => {

    const categoryParams = use(params);
    const categoryId = Number(categoryParams.id);
    const { data: session, status } = useSession();

    const { category, loading, error } = useCategory(categoryId);
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        if(status === "authenticated") {
            try {
                const res = await fetch("/api/auth/categories", {
                    method: "PATCH",
                    body: JSON.stringify({
                        id: categoryId,
                        name: data.name,
                        userId: Number(session?.user.id),
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
        <div className="w-full flex place-items-center place-content-center py-[50px]">
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
                <button className="primary-button">
                    Guardar
                </button>
            </form>
        </div>
    );
};


export default editCategoryPage;