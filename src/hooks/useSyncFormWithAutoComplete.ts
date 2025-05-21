import { useEffect, useRef } from "react";
import type { UseFormReset } from "react-hook-form";
import { FieldValues } from "react-hook-form";

export function useSyncFormWithAutoComplete<T extends FieldValues>(reset: UseFormReset<T>) {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formRef.current) return;

        const form = formRef.current;

        const handleFocus = () => {
            const formData = new FormData(form);
            const values = Object.fromEntries(formData.entries()) as T;
            reset(values, { keepErrors: true, keepDirty: true });
        };

        // Sincroniza al escribir o presionar Enter sin blur
        form.addEventListener("input", handleFocus);
        form.addEventListener("change", handleFocus);
        form.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleFocus();
        });

        return () => {
            form.removeEventListener("input", handleFocus);
            form.removeEventListener("change", handleFocus);
            form.removeEventListener("keydown", handleFocus);
        };
    }, [reset]);

    return formRef;
};