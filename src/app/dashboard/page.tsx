"use client";
import { useTransactions } from "@/hooks/useTransactions";
import { formatDateToText, getActualDate } from "@/utils/formatDates";
import { DateTime } from "luxon";

const DashboardPage = () => {

    const fechaActual = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const fecha = fechaActual.setLocale('es').toFormat("dd 'de' LLLL 'del' yyyy");

    const { transactions, total, loadingTransactions, transactionsError } = useTransactions();
    console.log(transactions);

    return (
        <div>
            <p>Dashboard Page</p>
            <div className="d-stats d-stats-vertical ">
                <div className="d-stat">
                    <div className="d-stat-title text-sm">Saldo disponible</div>
                    <div className="d-stat-value font-normal">$ {loadingTransactions ? <span className="loading loading-spinner text-success"></span> : transactionsError ? "X" : total}</div>
                    <div className="d-stat-desc">{fecha}</div>
                </div>

                <div className="d-stat">
                    <div className="d-stat-title">New Users</div>
                    <div className="d-stat-value">4,200</div>
                    <div className="d-stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="d-stat">
                    <div className="d-stat-title">New Registers</div>
                    <div className="d-stat-value">1,200</div>
                    <div className="d-stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
            <p>Monto: {loadingTransactions ? <span className="loading loading-spinner text-success"></span> : transactionsError ? "X" : total}</p>
        </div>
    );
};

export default DashboardPage;