import { useEffect, useState } from "react";
import { getLastExpense, getLastIncome } from "@/utils/getTransactions";
import { TransactionCategory } from "@/models/dataTypes";


export const useLastTransaction = (type:number) => {
    const [lastTransaction, setLastTransaction] = useState<TransactionCategory | null>(null);
    const [loadingLastTransaction, setLoadingLastTransaction] = useState<boolean>(true);
    const [lastTransactionError, setLastTransactionError] = useState<string | null>(null);

    useEffect(() => {
        if(type === 1) {
            const fetchIncome = async () => {
                try {
                    const data = await getLastIncome();
                    setLastTransaction(data);
                } catch (error) {
                    setLastTransactionError("No se puedo obtener el último ingreso.");
                    console.log(error);
                } finally {
                    setLoadingLastTransaction(false);
                }
            }

            fetchIncome();
        } else if (type === 2) {
            const fetchExpense = async () => {
                try {
                    const data = await getLastExpense();
                    setLastTransaction(data);
                } catch (error) {
                    setLastTransactionError("No se puedo obtener el último egreso.");
                    console.log(error);
                } finally {
                    setLoadingLastTransaction(false);
                }
            }

            fetchExpense();
        }
    }, []);

    return { lastTransaction, loadingLastTransaction, lastTransactionError };
};