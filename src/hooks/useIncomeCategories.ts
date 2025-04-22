import { useEffect, useState } from "react";
import { getIncomeCategories } from "@/utils/getCategories";
import { Category } from "@/models/dataTypes";

export const useIncomeCategories = () => {
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
    const [loadingIncomeCategories, setLoadingIncomeCategories] = useState<boolean>(true);
    const [incomeCategoriesError, setIncomeCategoriesError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIncomeCategories = async () => {
            try {
                const data = await getIncomeCategories();
                setIncomeCategories(data);
            } catch (error) {
                setIncomeCategoriesError("No se puedieron obtener las categorías.");
                console.log(error);                
            } finally {
                setLoadingIncomeCategories(false);
            }
        };

        fetchIncomeCategories();
    }, []);

    return { incomeCategories, loadingIncomeCategories, incomeCategoriesError };
};