import { useEffect, useState } from "react";
import { getFewTransactionsWithCategory } from "@/utils/getTransactions";
import { TransactionCategory } from "@/models/dataTypes";

export const useFewTransactionsWithCategory = () => {
    const [transactions, setTransactions] = useState<TransactionCategory[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loadingTransactions, setLoadingTransactions] = useState<boolean>(true);
    const [transactionsError, setTransactionsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getFewTransactionsWithCategory();
                setTransactions(data);
                const totalAmount = data.reduce((acc:number, tx:TransactionCategory) => {
                    // Check if it's an expense or an income, if it's an expense substract, otherwise plus
                   return tx.typeId && tx.typeId == 1 ? acc + Number(tx.amount) : acc - Number(tx.amount);
                }, 0);
                totalAmount > 0 ? setTotal(totalAmount) : setTotal(0);
            } catch (error) {
                setTransactionsError("No se pudieron obtener las transacciones.");
                console.log(error);
            } finally {
                setLoadingTransactions(false);
            };
        };

        fetchTransactions();
    }, []);

    return { transactions, total, loadingTransactions, transactionsError };
};