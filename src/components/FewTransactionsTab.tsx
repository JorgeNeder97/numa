"use client";
import { useFewTransactionsWithCategory } from "@/hooks/useFewTransactionsWithCategory";
import { formatDate } from "@/utils/general/formatDates";

const FewTransactionsTab = () => {
    const { transactions, loadingTransactions, transactionsError } = useFewTransactionsWithCategory();

    return (
        <div className="overflow-x-auto rounded bg-almostwhite shadow-medium">
            <table className="w-full">
                <tbody>
                    {
                        !transactionsError ?
                            loadingTransactions ? 
                                <tr><th className="py-5 font-thin italic">Cargando Últimas Transacciones...</th></tr> 
                            : transactions.map((tx, i) => (
                                <tr key={i} className="font-light border-b-1 border-t-1 border-neutral-200">
                                    <td className="w-[80%] text-left text-lg pl-5 pr-5 py-2">{tx.category.name}</td>
                                    <td className="w-[80%] text-left pr-5 py-2">
                                        <div className="flex flex-col place-items-end text-sm">
                                            <span className={tx.typeId == 1 ? "text-emerald-500 font-medium text-lg" : "text-red-500 font-medium text-lg"}>{tx.typeId == 1 ? "" : "-"}${tx.amount}</span>
                                            <span>{formatDate(tx.date)}</span>
                                        </div>
                                        
                                    </td>
                                    {/* <td className="pr-5 py-5 hover:cursor-pointer"><Link href={`/categories/${tx.id}`}>Edit</Link></td>
                                    <td className="pr-5 py-5 hover:cursor-pointer" onClick={() => deleteCategory(tx.id)}>Delete</td> */}
                                </tr>
                            ))
                        : <tr><th>Se produjo un error.</th></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FewTransactionsTab;
