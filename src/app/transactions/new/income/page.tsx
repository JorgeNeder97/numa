"use client";
import { useCategories } from "@/hooks/useCategories";
import { useForm } from "react-hook-form";

const IncomePage = () => {

    const { categories, loading, error } = useCategories();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <div className="w-full flex place-items-center place-content-center py-[50px]">
            <form className="form" onSubmit={onSubmit}>
                <div className="label-input mb-5">
                    <h2 className="w-full text-3xl font-medium">Nuevo Ingreso</h2>
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
                        {...register("category", {
                            required: {
                                value: true,
                                message: "Debes elegir una categoría"
                            }
                        })}
                        defaultValue=""
                    >
                        <option className="font-extralight italic" value="" disabled hidden>Elige una categoría</option>
                        {   
                            categories.length > 0 ? 
                            categories.map((category, i) => (
                                <option key={i} value={category.id}>{category.name}</option>
                            )) : (<option className="italic" disabled>No creaste ninguna categoría aún</option>)
                        }
                    </select>
                    <span className={errors.category ? "error-span" : "opacity-0 h-[10px]"}>{errors?.category?.message?.toString()}</span>
                </div>
                <div className="label-input">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        className="input h-[120px]"
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
        </div>
    );
};

export default IncomePage;
