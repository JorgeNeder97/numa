import { useEffect, useState } from "react";
import { getCategories } from "@/utils/getCategories";
import { Category } from "@/models/categories";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategroies = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                setError("No se puedieron obtener las transacciones.");
                console.log(error);                
            } finally {
                setLoading(false);
            }
        };

        fetchCategroies();
    }, []);

    return { categories, loading, error };
};