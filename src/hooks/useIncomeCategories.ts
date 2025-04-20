import { useEffect, useState } from "react";
import { getIncomeCategories } from "@/utils/getCategories";
import { Category } from "@/models/dataTypes";

export const useIncomeCategories = () => {
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIncomeCategories = async () => {
            try {
                const data = await getIncomeCategories();
                setIncomeCategories(data);
            } catch (error) {
                setError("No se puedieron obtener las categorías.");
                console.log(error);                
            } finally {
                setLoading(false);
            }
        };

        fetchIncomeCategories();
    }, []);

    return { incomeCategories, loading, error };
};