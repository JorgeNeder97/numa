"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import VolverAtras from "@/components/VolverAtras";
import VolverAtrasButton from "@/components/VolverAtrasButton";


const ChangePasswordPage = () => {

    // Trae los datos del usuario en sesión
    const { data: session } = useSession();
    const userId = session?.user?.id;

    // Maneja el Modal
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Maneja el spinner de carga
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    // Guarda los errores que vienen del backend
    const [errorBackend, setErrorBackend] = useState<string>();

    // React Hook Form
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // Permite redirigir
    const router = useRouter();

    // Envía la petición POST al backend
    const onSubmit = handleSubmit(async (data) => {
        // Spinner de carga
        setLoadingFetch(true);

        const res = await fetch("/api/auth/register/changepassword", {
            method: "PATCH",
            body: JSON.stringify({
                id: Number(userId),
                password: data.password,
                newPassword: data.newPassword,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setLoadingFetch(false);

        if(res.ok && res.status === 200) setIsOpen(true);
        else {
            const errorMessage = await res.json();
            setErrorBackend(errorMessage.message);
        };
    });

    // Redirige al login
    const onContinue = () => {
        router.push("/dashboard/settings");
    };

    // Se usa para comparar las contraseñas
    const pass = watch("newPassword");

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-content-center lg:place-content-start lg:pt-0 py-[50px]">
            <div className="hidden lg:flex lg:absolute lg:z-[100] lg:top-[30px] lg:right-[50px]">
                <VolverAtrasButton href="/dashboard/settings" />
            </div>
            <form className="form lg:mt-[30px]" onSubmit={onSubmit}>
                <VolverAtras href="/dashboard/settings" />
                <div className="w-full flex flex-col place-items-center lg:place-items-start gap-[20px]">
                    <div className="label-input mb-5">
                        <h2 className="w-full text-3xl font-medium">Cambiar Contraseña</h2>
                    </div>

                    <div className="label-input">
                        <label htmlFor="password" className="label">Contraseña Actual</label>
                        <input 
                            type="password" 
                            className="input input-dashboard-lg" 
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Debes ingresar tu contraseña actual",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Debes ingresar una contraseña válida"
                                }
                            })}
                            onChange={()=> setErrorBackend("")}
                        />
                        <span className={errors.password || errorBackend ? "error-span" : "opacity-0 h-[10px]"}>{errors.password?.message?.toString() || errorBackend || ""}</span>
                    </div>
                    
                    <div className="label-input">
                        <label htmlFor="newPassword" className="label">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            className="input input-dashboard-lg" 
                            {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: "Debes ingresar una contraseña",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Debes ingresar una contraseña válida"
                                }
                            })}
                        />
                        <span className={errors.newPassword ? "error-span" : "opacity-0 h-[10px]"}>{errors.newPassword?.message?.toString() || ""}</span>
                    </div>

                    <div className="label-input">
                        <label htmlFor="confirmPassword" className="label">Confirmar contraseña</label>
                        <input 
                            type="password" 
                            className="input input-dashboard-lg" 
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Debes confirmar la contraseña",
                                },
                                validate: (value) => {
                                    if(pass === value) return true;
                                    return "Las contraseñas no coinciden";
                                }
                            })}
                        />
                        <span className={errors.confirmPassword ? "error-span" : "opacity-0 h-[10px]"}>{errors.confirmPassword?.message?.toString() || ""}</span>
                    </div>
                </div>

                <div className="label-input">
                    <button className="translate-y-[20px] primary-button w-full">
                        {
                            loadingFetch ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                            : "Cambiar Contraseña"
                        }
                    </button>
                </div>
            </form>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} exitButton={false} style="Success">
                {
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-title">Contraseña Actualizada</span>
                        <button className="inverse-primary-button" onClick={onContinue}>Continuar</button>
                    </div>
                }
            </Modal>
        </div>
    );
};

export default ChangePasswordPage;
