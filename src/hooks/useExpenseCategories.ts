import { useEffect, useState } from "react";
import { getExpenseCategories } from "@/utils/getCategories";
import { Category } from "@/models/dataTypes";

export const useExpenseCategories = () => {
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpenseCategories = async () => {
            try {
                const data = await getExpenseCategories();
                setExpenseCategories(data);
            } catch (error) {
                setError("No se puedieron obtener las categorías.");
                console.log(error);                
            } finally {
                setLoading(false);
            }
        };

        fetchExpenseCategories();
    }, []);

    return { expenseCategories, loading, error };
};