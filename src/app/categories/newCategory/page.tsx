"use client";
import { useForm } from "react-hook-form";

const newCategoryPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data);
            const res = await fetch("/api/auth/categories", {
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className="w-full flex place-items-center place-content-center py-[50px]">
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
                <button className="primary-button">
                    Guardar
                </button>
            </form>
        </div>
    );
};


export default newCategoryPage;