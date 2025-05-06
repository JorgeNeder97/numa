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
        <div className="fixed inset-0 z-[200px] flex items-center justify-center bg-black/50">
            <div className={`rounded-lg shadow-lg p-6 relative w-8/12 max-w-md animate-fadeIn ${style === "Success" ? "bg-emerald-700" : style === "Error" ? "bg-red-700" : style === "Warning" ? "bg-emerald-700" : ""}`}>
                {
                    exitButton ? 
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-neutral-200 hover:text-white"
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
