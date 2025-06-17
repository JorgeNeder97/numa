"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSyncFormWithAutoComplete } from "@/hooks/useSyncFormWithAutoComplete";
import Link from "next/link";

const LoginPage = () => {

    const [backError, setBackError] = useState<string | null>(null);
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const formRef = useSyncFormWithAutoComplete(reset);

    const router = useRouter();
    const onSubmit = handleSubmit(async (data) => {
        setLoadingFetch(true);
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        setLoadingFetch(false);

        if(res?.error) setBackError(res.error);

        else {
            router.push("/bienvenido");
            router.refresh();
        }
    });

    return (
        <div className="w-full min-h-[calc(100vh-150px)] bg-[url('/backgrounds/LastCTA.jpg')] relative bg-cover flex place-content-center lg:gap-[100px] lg:place-items-start lg:place-content-center py-[50px]">
            <form className="form" ref={formRef} onSubmit={onSubmit}>
                <div className="w-full flex flex-col place-items-center gap-[20px]">
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

                    <Link href="/auth/register" className="text-[.875rem] text-white text-right self-end flex flex-col gap-[5px]">
                        <p className="text-neutral-200">¿No tienes una cuenta aún?</p>
                        <p className="underline">Registrate aquí</p>
                    </Link>
                </div>

                <div className="label-input">
                    <button className="primary-button w-full">
                        {
                            loadingFetch ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                            : "Iniciar Sesión"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
