import CountUp from "./CountUp";
import { formatDate } from "@/utils/general/formatDates";
import { truncateString } from "@/utils/general/strings";
import { useLastTransaction } from "@/hooks/useLastTransaction";

const LastIncome = () => {

    const { lastTransaction, loadingLastTransaction, lastTransactionError } = useLastTransaction(1);

    if(!lastTransaction) return (
        <div className="h-[100px] flex flex-col flex-1 min-w-0 place-items-start gap-[10px]">
            <div className="d-stat-title text-sm">Último Ingreso</div>
            <div className="d-stat-value font-normal">
                ${" "}
                <CountUp
                    from={0}
                    to={0}
                    separator="."
                    direction="up"
                    duration={0.3}
                    className="count-up-text"
                />
            </div>
        </div>
    );


    return (
        <div className="h-[100px] flex flex-col flex-1 min-w-0 place-items-start gap-[10px]">
            {
                loadingLastTransaction ? (
                    <span className="loading loading-spinner text-success"></span>
                ) : lastTransactionError ? (
                    "X"
                ) : lastTransaction && (
                    <>
                        <div className="d-stat-title text-sm">Último Ingreso - {formatDate(lastTransaction.date)}</div>
                        <div className="d-stat-value font-normal text-emerald-700">
                            +${" "}
                            <CountUp
                            from={0}
                            to={lastTransaction.amount}
                            separator="."
                            direction="up"
                            duration={0.3}
                            className="count-up-text"
                        />
                        </div>
                        <div className="d-stat-desc text-[16px]">{truncateString(lastTransaction.category.name, 20)}</div>
                    </>
                )
            }
        </div>
    );
};

export default LastIncome;
