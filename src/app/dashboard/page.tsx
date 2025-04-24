"use client";
import CountUp from "@/components/CountUp";
import { useTransactions } from "@/hooks/useTransactions";
import { getFormatedActualDate } from "@/utils/formatDates";

const DashboardPage = () => {

    const fecha = getFormatedActualDate();

    const { total, loadingTransactions, transactionsError } = useTransactions();
    
    return (
        <div className="w-full py-[30px] flex flex-col gap-[20px]">
            <div className="w-full flex place-items-start place-content-between">
                <div className="h-[100px] pl-5 flex flex-col place-items-start gap-[10px]">
                    <div className="d-stat-title text-sm">Saldo disponible</div>
                    <div className="d-stat-value font-normal">
                        $ {loadingTransactions ? 
                            <span className="loading loading-spinner text-success"></span> 
                        : transactionsError ? 
                            "X" 
                        : <CountUp from={0} to={total} separator="." direction="up" duration={.3} className="count-up-text" />}
                    </div>
                </div>
                <div className="w-full h-[100px] pr-[5px] flex place-content-end">
                    <span className="text-[.835rem]">{fecha}</span>
                </div>
            </div>

                {/* <div className="d-stat">
                    <div className="d-stat-value">4,200</div>
                    <div className="d-stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="d-stat">
                    <div className="d-stat-title">New Registers</div>
                    <div className="d-stat-value">1,200</div>
                    <div className="d-stat-desc">↘︎ 90 (14%)</div>
                </div> */}
        </div>
    );
};

export default DashboardPage;