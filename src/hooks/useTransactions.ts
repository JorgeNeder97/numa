"use client";
import { useEffect, useState } from "react";
import { getTransactions } from "@/utils/getTransactions";
import { Transaction } from "@/models/dataTypes";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loadingTransactions, setLoadingTransactions] = useState<boolean>(true);
    const [transactionsError, setTransactionsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
                const totalAmount = data.reduce((acc:number, tx:Transaction) => {
                    // Check if it's an expense or an income, if it's an expense substract, otherwise plus
                   return tx.typeId && tx.typeId == 1 ? acc + Number(tx.amount) : acc - Number(tx.amount);
                }, 0);
                if(totalAmount > 0) setTotal(totalAmount);
                else setTotal(0);
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