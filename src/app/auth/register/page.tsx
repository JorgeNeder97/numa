"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGenres } from "@/hooks/useGenres";
import { useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";


const RegisterPage = () => {

    // Maneja el Modal
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Maneja el spinner de carga
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    // Guarda los errores que vienen del backend
    const [errorBackend, setErrorBackend] = useState<string>();

    // React Hook Form
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // Hook de géneros
    const { genres, loadingGenres, genresError } = useGenres();

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
                genreId: Number(data.genreId),
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
        <div className="w-full min-h-[100vh] bg-tertiary relative bg-cover flex place-content-center lg:gap-[100px] lg:place-items-start lg:place-content-center pt-[100px] py-[50px]">
            <Link href="/" className="absolute text-grayBackground top-[20px] right-[40px] lg:top-[20px] lg:right-[40px] hover:cursor-pointer hover:text-white transition-all duration-[.3s] ease-in-out">Volver</Link>
            <form className="form" onSubmit={onSubmit}>
                <div className="w-full flex flex-col place-items-center gap-[20px]">
                    <div className="label-input mb-5 lg:hidden">
                        <h2 className="w-full text-3xl font-medium">Registrarse</h2>
                    </div>
                    <div className="label-input">
                        <label htmlFor="name" className="label">Nombre</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Ingresa tu nombre aquí"
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
                            placeholder="Ingresa tu apellido aquí"
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
                        <label htmlFor="genreId" className="label">Género</label>
                        <select
                            className="input"
                            {...register("genreId", {
                                required: {
                                    value: true,
                                    message: "Debes elegir una opción"
                                }
                            })}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>Selecciona tu género</option>
                            {   
                                !genresError ?
                                    loadingGenres ?
                                        <option className="loading-option" value="" disabled>Cargando...</option>
                                    :
                                        genres.length > 0 ? 
                                            genres.map((genre, i) => (<option className="text-black" key={i} value={genre.id}>{genre.name == "male" ? "Masculino" : "Femenino"}</option>)) 
                                        : (<option className="italic text-black" disabled>Aún no existe ningun tipo...</option>)
                                : <option className="error-option text-black" value="" disabled>Se produjo un error.</option>
                            }
                        </select>
                        
                        <span className={errors.genreId ? "error-span" : "opacity-0 h-[10px]"}>{errors?.genreId?.message?.toString()}</span>
                    </div>
                    <div className="label-input">
                        <label htmlFor="email" className="label">Email</label>
                        <input 
                            type="email" 
                            className="input" 
                            placeholder="Ingresa tu email aquí"
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
                            placeholder="Ingresa tu contraseña aquí"
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
                            placeholder="Confirma tu contraseña aquí"
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
