import TransactionsTab from "@/components/TransactionsTab";

const TransactionsPage = () => {
    return (
        <div className="w-full min-h-[calc(100vh-150px)] px-[10px] py-[30px] flex flex-col gap-[30px]">
            <p className="text-xl text-center font-light">Transacciones</p>
            <TransactionsTab />
        </div>
    );
};

export default TransactionsPage;