"use client";
import { useEffect } from "react";
import { ModalProps } from "@/models/dataTypes";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, exitButton, style }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);

        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/50">
            <div className={`rounded-lg shadow-lg p-6 relative w-[90%] max-w-md animate-fadeIn ${style === "Success" ? "bg-tertiary" : style === "Error" ? "bg-error" : style === "Warning" ? "bg-darkPrimary" : style === "Black" ? "bg-black" : ""}`}>
                {
                    exitButton ? 
                        <button
                            onClick={onClose}
                            className="absolute top-[15px] right-[15px] text-neutral-200 hover:text-white"
                        >
                            ✖
                        </button>
                    : ""
                }
                {children}
            </div>
        </div>
    );
};

export default Modal;
