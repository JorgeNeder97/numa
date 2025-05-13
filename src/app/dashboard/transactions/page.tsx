"use client";
import PageTransition from "@/components/PageTransition";
import TransactionsTab from "@/components/TransactionsTab";

const TransactionsPage = () => {
    return (
        <PageTransition>
            <div className="w-full min-h-[calc(100vh-150px)] px-[10px] py-[30px] flex flex-col gap-[30px]">
                <h3 className="text-[1.5rem] text-center text-darkPrimary font-semibold">Transacciones</h3>
                <TransactionsTab />
            </div>
        </PageTransition>
    );
};

export default TransactionsPage;