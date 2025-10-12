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
import PageTransition from "@/components/PageTransition";

const DashboardPage = () => {

    // Obtener la fecha actual formateada
    const fecha = getFormatedActualDate();

    // Obtener el monto total
    const { total, loadingTransactions, transactionsError } = useTransactions();
    
    return (
        <PageTransition>
            <div className="w-full min-h-[calc(100vh-150px)] pt-[30px] flex flex-col gap-[20px] place-content-between">

                <div className="bg-lightGray flex flex-col place-items-center gap-[40px]">

                    <section className="w-full h-[90px] bg-white flex place-items-start place-content-between rounded-b-3xl border-b-4 border-tertiary-light shadow-md">
                        <div className="h-[100px] pl-5 flex flex-col place-items-start gap-[10px]">
                            <div className="d-stat-title text-[.875rem]">Saldo disponible</div>
                            <div className="d-stat-value font-normal">
                                $ {loadingTransactions ? 
                                    <span className="loading loading-spinner text-success"></span> 
                                : transactionsError ? 
                                    "X" 
                                : <CountUp from={0} to={total} separator="." direction="up" duration={.08} className="count-up-text" />}
                            </div>
                        </div>
                        <div className="w-full h-[100px] pr-[15px] flex place-content-end">
                            <span className="text-[.875rem]">{fecha}</span>
                        </div>
                    </section>

                    <section className="w-full flex place-items-center place-content-around gap-[10px] px-[10px]">
                        <NewIncomeButton />
                        <NewExpenseButton />
                    </section>

                    <section className="w-full bg-white pt-[40px] pb-[20px] px-[25px] ">
                        <div className="flex place-items-start place-content-between gap-[30px]">
                            <LastIncome />
                            <LastExpense />
                        </div>
                    </section>

                </div>
                
                <div className="w-full flex place-content-center">
                    <hr className="w-[90%] text-neutral-400 rounded-full text-center" />
                </div>

                <TransactionsPie type={2} />

                <FewTransactionsTab />

            </div>
        </PageTransition>
    );
};

export default DashboardPage;