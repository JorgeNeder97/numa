import { useEffect, useState } from "react";
import { getExpensesAmount, getIncomesAmount } from "@/utils/getAmountByCategory";

export const useAmountPerCategory = (type:number) => {
    const [amountPerCategory, setAmountPerCategory] = useState<{categoryName:string, total:number}[]>([]);
    const [loadingAmountPerCategory, setLoadingAmountPerCategory] = useState<boolean>(true);
    const [amountPerCategoryError, setAmountPerCategoryError] = useState<string | null>(null);

    useEffect(() => {
        if(type === 0) {
            const fetchIncomes = async () => {
                try {
                    const data = await getIncomesAmount();
                    setAmountPerCategory(data);
                } catch (error) {
                    setAmountPerCategoryError("No se puedieron obtener los montos de los ingresos.");
                    console.log(error);
                } finally {
                    setLoadingAmountPerCategory(false);
                }
            }

            fetchIncomes();
        } else if(type === 1) {
            const fetchExpenses = async () => {
                try {
                    const data = await getExpensesAmount();
                    setAmountPerCategory(data);
                } catch (error) {
                    setAmountPerCategoryError("No se puedieron obtener los montos de los egresos.");
                    console.log(error);
                } finally {
                    setLoadingAmountPerCategory(false);
                }
            }

            fetchExpenses();
        };
    }, []);

    return { amountPerCategory, loadingAmountPerCategory, amountPerCategoryError };
};