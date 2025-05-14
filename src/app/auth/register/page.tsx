"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useEmailForValidation } from "@/hooks/useEmailsForValidation";


const RegisterPage = () => {

    // Maneja el Modal
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Maneja el spinner de carga
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    

    // React Hook Form
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // Permite redirigir
    const router = useRouter();

    // Envía la petición POST al backend
    const onSubmit = handleSubmit(async (data) => {
        // Spinner de carga
        setLoadingFetch(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setLoadingFetch(false);

        if(res.ok && res.status === 200) setIsOpen(true);
    });

    // Redirige al login
    const onContinue = () => {
        router.push("/auth/login");
    };

    // Se usa para comparar las contraseñas
    const pass = watch("password");

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-content-center py-[50px]">
            <form className="form" onSubmit={onSubmit}>
                <div className="w-full flex flex-col place-items-center gap-[20px]">
                    <div className="label-input mb-5">
                        <h2 className="w-full text-3xl font-medium">Registrarse</h2>
                    </div>
                    <div className="label-input">
                        <label htmlFor="name" className="label">Nombre</label>
                        <input 
                            type="text" 
                            className="input" 
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Debes ingresar tu nombre",
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Debes ingresar un nombre válido",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Debes ingresar un nombre válido",
                                },
                            })}    
                        />
                        <span className={errors.name ? "error-span" : "opacity-0 h-[10px]"}>{errors.name?.message?.toString() || ""}</span>
                    </div>
                    <div className="label-input">
                        <label htmlFor="lastname" className="label">Apellido</label>
                        <input 
                            type="text" 
                            className="input" 
                            {...register("lastname", {
                                required: {
                                    value: true,
                                    message: "Debes ingresar tu apellido",
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Debes ingresar un apellido válido",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Debes ingresar un apellido válido",
                                },
                            })}    
                        />
                        <span className={errors.lastname ? "error-span" : "opacity-0 h-[10px]"}>{errors.lastname?.message?.toString() || ""}</span>
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
                                // Ver la forma de avisar al frontend si existe o no un usuario con ese email
                                // validate: (value) => {
                                    // Verifica si existe algun usuario con el mismo email
                                    // const { userWithThatEmail, loadingUserWithThatEmail, userWithThatEmailError } = useEmailForValidation(value);
                                    // if(!loadingUserWithThatEmail && userWithThatEmail)
                                // }
                            })}
                        />
                        <span className={errors.email ? "error-span" : "opacity-0 h-[10px]"}>{errors.email?.message?.toString() || ""}</span>
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
                        />
                        <span className={errors.password ? "error-span" : "opacity-0 h-[10px]"}>{errors.password?.message?.toString() || ""}</span>
                    </div>
                    <div className="label-input">
                        <label htmlFor="confirmPassword" className="label">Confirmar contraseña</label>
                        <input 
                            type="password" 
                            className="input" 
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
                            : "Registrarse"
                        }
                    </button>
                </div>
            </form>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} exitButton={false} style="Success">
                {
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-title">Operación exitosa</span>
                        <button className="inverse-primary-button" onClick={onContinue}>Continuar</button>
                    </div>
                }
            </Modal>
        </div>
    );
};

export default RegisterPage;
