import { useEffect, useState } from "react";
import { getCategory } from "@/utils/getCategories";
import { Category } from "@/models/categories";

export const useCategory = (id: number) => {
    const [category, setCategory] = useState<Category>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategory(id);
                setCategory(data);
            } catch (error) {
                setError("No se puedo obtener la categoría.");
                console.log(error);                
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, []);

    return { category, loading, error };
};