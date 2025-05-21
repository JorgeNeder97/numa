"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { useSyncFormWithAutoComplete } from "@/hooks/useSyncFormWithAutoComplete";


const MyAccountPage = () => {

    // React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: session, update } = useSession();
    const user = session?.user;

    const formRef = useSyncFormWithAutoComplete(reset);

    // Maneja el Modal
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Maneja el spinner de carga
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    // Guarda los errores que vienen del backend
    const [errorBackend, setErrorBackend] = useState<string>();
    

    // Permite refrescar la página
    const router = useRouter();

    // Envía la petición PATCH al backend
    const onSubmit = handleSubmit(async (data) => {
        // Spinner de carga
        setLoadingFetch(true);

        const res = await fetch("/api/auth/register", {
            method: "PATCH",
            body: JSON.stringify({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setLoadingFetch(false);

        if(res.ok && res.status === 200) {
            await update();
            setIsOpen(true);
        }
        else {
            const errorMessage = await res.json();
            setErrorBackend(errorMessage.message);
        }
    });

    // Refresca la página
    const onContinue = async () => {
        setIsOpen(false);
        router.refresh();
    };

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-content-center py-[50px]">
            <form className="form" ref={formRef} onSubmit={onSubmit}>
                <div className="w-full flex flex-col place-items-center gap-[20px]">
                    <div className="label-input mb-5">
                        <h2 className="w-full text-3xl font-medium">Datos Personales</h2>
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
                            defaultValue={user?.name}
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
                            defaultValue={user?.lastname}
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
                            defaultValue={user?.email}
                        />
                        <span className={errors.email || errorBackend ? "error-span" : "opacity-0 h-[10px]"}>{errors.email?.message?.toString() || errorBackend || ""}</span>
                    </div>
                </div>

                <div className="label-input">
                    <button className="translate-y-[20px] primary-button w-full">
                        {
                            loadingFetch ? <span className="d-loading d-loading-spinner text-neutral-200"></span>
                            : "Guardar Cambios"
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

export default MyAccountPage;
