"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";


const RegisterPage = () => {

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
        else {
            const errorMessage = await res.json();
            setErrorBackend(errorMessage.message);
        }
    });

    // Redirige al login
    const onContinue = () => {
        router.push("/auth/login");
    };

    // Se usa para comparar las contraseñas
    const pass = watch("password");

    return (
        <div className="w-full min-h-[calc(100vh-150px)] bg-[url('/backgrounds/LastCTA.jpg')] relative bg-cover flex place-content-center lg:gap-[100px] lg:place-items-start lg:place-content-center py-[50px]">
            <form className="form from" onSubmit={onSubmit}>
                <div className="w-full flex flex-col place-items-center gap-[20px]">
                    <div className="label-input mb-5 lg:hidden">
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
                            })}
                        />
                        <span className={errors.email || errorBackend ? "error-span" : "opacity-0 h-[10px]"}>{errors.email?.message?.toString() || errorBackend || ""}</span>
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

            <div className="hidden w-[40%] max-w-[450px] lg:flex flex-col place-items-start place-content-center gap-[45px]">
                <h4 className="text-[2rem] max-w-[450px] text-neutral-100 leading-[35px] font-bold">Registrate y empezá a formar parte de Numa</h4>
                <p className="text-[1rem] max-w-[410px] text-neutral-200 tracking-wide leading-[25px] text-justify">Sabemos que cada comienzo puede ser el primer paso hacia algo grande. Con Numa vas a poder llevar un control claro y sencillo de tus finanzas: registrá tus ingresos y egresos, y visualizá tus gastos mensuales en un gráfico fácil de entender.</p>
                <h4 className="text-[2rem] max-w-[450px] text-neutral-100 leading-[35px] font-bold">Tomá el control de tus finanzas, sin complicaciones</h4>
                <p className="text-[1rem] max-w-[410px] text-neutral-200 tracking-wide leading-[25px] text-justify">No necesitás ser un experto para organizar tus cuentas. Numa está pensado para ayudarte a entender en qué se va tu plata, cómo podés mejorar tus hábitos y tomar decisiones más conscientes. Es simple, rápido y pensado para vos.</p>
                <p className="text-[1.1rem] max-w-[410px] text-white font-medium tracking-wide">Tu recorrido hacia unas finanzas más ordenadas empieza acá</p>
                
            </div>

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
