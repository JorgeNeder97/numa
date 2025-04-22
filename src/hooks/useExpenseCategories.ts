import { useEffect, useState } from "react";
import { getExpenseCategories } from "@/utils/getCategories";
import { Category } from "@/models/dataTypes";

export const useExpenseCategories = () => {
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [loadingExpenseCategories, setLoadingExpenseCategories] = useState<boolean>(true);
    const [expenseCategoriesError, setExpenseCategoriesError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpenseCategories = async () => {
            try {
                const data = await getExpenseCategories();
                setExpenseCategories(data);
            } catch (error) {
                setExpenseCategoriesError("No se puedieron obtener las categorías.");
                console.log(error);                
            } finally {
                setLoadingExpenseCategories(false);
            }
        };

        fetchExpenseCategories();
    }, []);

    return { expenseCategories, loadingExpenseCategories, expenseCategoriesError };
};