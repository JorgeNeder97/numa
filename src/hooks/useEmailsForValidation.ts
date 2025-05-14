import { User } from "@/models/dataTypes";
import { useEffect, useState } from "react";
import { getEmails } from "@/utils/getValidationData";

export const useEmailForValidation = (email: string) => {
    const [userWithThatEmail, setUserWithThatEmail] = useState<User | string>();
    const [loadingUserWithThatEmail, setLoadingUserWithThatEmail] = useState<boolean>(true);
    const [userWithThatEmailError, setUserWithThatEmailError] = useState<string | null>(null);

    const fetchEmailForValidation = async () => {
        try {
            const data = await getEmails(email);
            setUserWithThatEmail(data);
        } catch (error) {
            setUserWithThatEmailError("No se pudo buscar un usuario por email.");
            console.log(error);
        } finally {
            setLoadingUserWithThatEmail(false);
        }
    }

    useEffect(() => {
        fetchEmailForValidation();
    }, []);

    return { userWithThatEmail, loadingUserWithThatEmail, userWithThatEmailError };
};