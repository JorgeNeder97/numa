"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {

    const [backError, setBackError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = handleSubmit(async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if(res?.error) setBackError(res.error);

        else {
            router.push("/dashboard");
            router.refresh();
        }
    });

    return (
        <div className="w-full flex place-content-center py-[50px]">
            <form className="form" onSubmit={onSubmit}>
                <div className="label-input mb-5">
                    <h2 className="w-full text-3xl font-medium">Acceso</h2>
                </div>
                <div className="label-input">
                    <label htmlFor="email" className="label">Email</label>
                    <input 
                        type="email" 
                        className="input" 
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Debes ingresar tu email",
                            },
                            maxLength: {
                                value: 50,
                                message: "Debes ingresar un email válido",
                            },
                        })}
                        onChange={() => setBackError(null)}
                    />
                    <span className={errors.email || backError ? "error-span" : "opacity-0 h-[10px]"}>{errors.email?.message?.toString() || ""}{backError === "No se encontró el usuario." && backError}</span>
                </div>
                <div className="label-input">
                    <label htmlFor="password" className="label">Contraseña</label>
                    <input 
                        type="password" 
                        className="input" 
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Debes ingresar una contraseña",
                            },
                            minLength: {
                                value: 6,
                                message: "Debes ingresar una contraseña válida"
                            }
                        })}
                        onChange={() => setBackError(null)}
                    />
                    <span className={errors.password || backError ? "error-span" : "opacity-0 h-[10px]"}>{errors.password?.message?.toString() || ""}{backError === "La contraseña ingresada es incorrecta." && backError}</span>
                </div>

                <div className="label-input">
                    <button className="translate-y-[20px] primary-button w-full">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
