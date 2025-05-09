"use client";
import CountUp from "@/components/CountUp";
import FewTransactionsTab from "@/components/FewTransactionsTab";
import LastExpense from "@/components/LastExpense";
import LastIncome from "@/components/LastIncome";
import NewExpenseButton from "@/components/NewExpenseButton";
import NewIncomeButton from "@/components/NewIncomeButton";
import TransactionsPie from "@/components/TransactionsPie";
import { useTransactions } from "@/hooks/useTransactions";
import { getFormatedActualDate } from "@/utils/general/formatDates";

const DashboardPage = () => {

    // Obtener la fecha actual formateada
    const fecha = getFormatedActualDate();

    // Obtener el monto total
    const { total, loadingTransactions, transactionsError } = useTransactions();
    
    return (
        <div className="w-full min-h-[calc(100vh-150px)] pt-[30px] flex flex-col gap-[20px]">
            <div className="bg-almostwhite flex flex-col gap-[40px]">
                <section className="w-full bg-white flex place-items-start place-content-between rounded-b-3xl border-b-4 border-emerald-400">
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
                    <div className="w-full h-[100px] pr-[15px] flex place-content-end">
                        <span className="text-[.835rem]">{fecha}</span>
                    </div>
                </section>

                <section className="flex bg-almostwhite place-items-center place-content-around">
                    <NewIncomeButton />
                    <NewExpenseButton />
                </section>

                <section className="w-full bg-white flex py-[20px] px-[25px] place-items-start place-content-between gap-[30px]">
                    <LastIncome />
                    <LastExpense />
                </section>
            </div>

            <TransactionsPie type={2} />

            <FewTransactionsTab />
        </div>
    );
};

export default DashboardPage;