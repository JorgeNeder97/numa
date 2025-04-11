"use client";
import { useTransactions } from "@/hooks/useTransactions";

const DashboardPage = () => {

    const { total, loading, error } = useTransactions();

    return (
        <div>
            <p>Dashboard Page</p>
            <p>Monto: {loading ? <span className="loading loading-spinner text-success"></span> : error ? "X" : total}</p>
        </div>
    );
};

export default DashboardPage;