import { useEffect, useState } from "react";
import { getTransactions } from "@/utils/getTransactions";
import { Transaction } from "@/models/dataTypes";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
                const totalAmount = data.reduce((acc:number, tx:Transaction) => acc + Number(tx.amount), 0);
                totalAmount > 0 ? setTotal(totalAmount) : setTotal(0);
            } catch (error) {
                setError("No se pudieron obtener las transacciones.");
                console.log(error);
            } finally {
                setLoading(false);
            };
        };

        fetchTransactions();
    }, []);

    return { transactions, total, loading, error };
};