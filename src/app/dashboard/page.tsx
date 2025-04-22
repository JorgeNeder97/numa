"use client";
import { useTransactions } from "@/hooks/useTransactions";

const DashboardPage = () => {

    const { transactions, total, loadingTransactions, transactionsError } = useTransactions();
    console.log(transactions);

    return (
        <div>
            <p>Dashboard Page</p>
            <p>Monto: {loadingTransactions ? <span className="loading loading-spinner text-success"></span> : transactionsError ? "X" : total}</p>
        </div>
    );
};

export default DashboardPage;