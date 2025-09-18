"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import VolverAtras from "@/components/VolverAtras";

const ChangePasswordPage = () => {
    // Trae los datos del usuario en sesión
    const { data: session } = useSession();
    const userId = Number(session?.user.id);

    // Maneja el Modal
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [styleModal, setStyleModal] = useState<"Success" | "Error" | "Black">("Success");

    // Maneja la confirmación de la acción "Eliminar cuenta"
    const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);

    // Maneja el spinner de carga
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    // Permite redirigir
    const router = useRouter();

    // Envía la petición POST al backend
    const onSubmit = async (id: number) => {
        // Spinner de carga
        setLoadingFetch(true);

        const res = await fetch("/api/auth/register", {
            method: "DELETE",
            body: JSON.stringify({
                id: Number(userId),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setLoadingFetch(false);

        if (res.ok && res.status === 200) {
            setStyleModal("Success");
            setIsOpen(true);
            signOut();
        }
        else {
            setStyleModal("Error");
        }
    };

    // Redirige al login
    const onContinue = () => {
        router.push("/");
    };

    return (
        <div className="w-full min-h-[calc(100vh-150px)] flex place-content-center py-[50px]">
            <form className="form">
                <VolverAtras href="/dashboard/settings" />
                <div className="label-input mb-5">
                    <h2 className="w-full text-center text-3xl font-medium">
                        Cerrar Cuenta
                    </h2>
                </div>

                <div className="flex flex-col gap-[10px] place-items-center">
                    <h4 className="text-[1.3rem] text-error">⚠ Atención ⚠</h4>
                    <div className="flex flex-col gap-[3px] place-items-center">
                        <p className="text-center text-[1rem] italic tracking-wide">Estas a punto de eliminar tu cuenta.</p>
                        <p className="text-center text-[1rem] italic tracking-wide">Esta acción es permanente. Todos tus datos, incluyendo tus categorías y transacciones, serán eliminados y no se podrán recuperar.</p>
                    </div>
                </div>

                <div className="label-input">
                    <button type="button" onClick={() => setIsWarningOpen(true)} className="translate-y-[20px] secondary-button w-full">
                        {loadingFetch ? (
                            <span className="d-loading d-loading-spinner text-neutral-200"></span>
                        ) : (
                            "Eliminar Cuenta"
                        )}
                    </button>
                </div>
            </form>

            <Modal
                isOpen={isWarningOpen}
                onClose={() => setIsWarningOpen(false)}
                exitButton={true}
                style={"Black"}
            >
                {
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-title">
                            ¿Estás seguro de que quieres eliminar tu cuenta?
                        </span>
                        <div className="w-full flex place-items-center place-content-center gap-[10px]">
                            <button
                                className="secondary-button"
                                onClick={() => onSubmit(userId)}
                            >
                                Eliminar Cuenta
                            </button>
                            <button
                                className="primary-button"
                                onClick={() => setIsWarningOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                }
            </Modal>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                exitButton={false}
                style={styleModal}
            >
                {
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-title">
                            Operación Exitosa
                        </span>
                        <button
                            className="inverse-primary-button"
                            onClick={onContinue}
                        >
                            Continuar
                        </button>
                    </div>
                }
            </Modal>
        </div>
    );
};

export default ChangePasswordPage;
