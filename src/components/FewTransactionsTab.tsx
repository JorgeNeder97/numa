"use client";
import { useFewTransactionsWithCategory } from "@/hooks/useFewTransactionsWithCategory";
import { formatDate } from "@/utils/general/formatDates";

const FewTransactionsTab = () => {
    const { transactions, loadingTransactions, transactionsError } = useFewTransactionsWithCategory();

    return (
        <div className="w-full overflow-x-auto rounded bg-almostwhite ">
            <table className="w-full">
                <tbody>
                    {
                        !transactionsError ?
                            loadingTransactions ? 
                                <tr><th className="py-5 font-thin italic flex place-items-center place-content-center gap-[10px]"><span className="d-loading d-loading-spinner text-primary"></span> Cargando Últimas Transacciones...</th></tr> 
                            : transactions.length != 0 ? 
                                transactions.map((tx, i) => (
                                    <tr key={i} className="font-light border-b-1 border-t-1 border-neutral-200">
                                        <td className="w-[80%] text-left text-[16px] pl-5 pr-5 py-2">{tx.category.name}</td>
                                        <td className="w-[80%] text-left pr-5 py-2">
                                            <div className="flex flex-col place-items-end text-sm">
                                                <span className={tx.typeId == 1 ? "text-tertiary font-medium text-lg" : "text-error font-medium text-lg"}>{tx.typeId == 1 ? "" : "-"}${tx.amount}</span>
                                                <span>{formatDate(tx.date)}</span>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                ))
                            : <tr><th className="py-5 font-thin italic">No se registró ninguna transacción aún</th></tr> 
                        : <tr><th>Se produjo un error.</th></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FewTransactionsTab;
