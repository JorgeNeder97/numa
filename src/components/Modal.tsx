"use client";
import { useEffect } from "react";
import { ModalProps } from "@/models/dataTypes";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);

        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
