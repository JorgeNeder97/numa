import { useEffect, useState } from "react";
import { getTransactions } from "@/utils/getTransactions";

interface Transaction {
  id: string;
  amount: number;
  // Agregá otras propiedades si las necesitás
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
        const totalAmount = data.reduce((acc: number, tx: Transaction) => acc + tx.amount, 0);
        setTotal(totalAmount);
      } catch (err) {
        setError("No se pudieron obtener las transacciones");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, total, loading, error };
};

// Luego lo usamos así: const { total, loading, error } = useTransactions();