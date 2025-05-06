"use client";
import EditIcon from "@/assets/icons/EditIcon";
import { useTransactionsWithCategory } from "@/hooks/useTransactionsWithCategory";
import { formatDate } from "@/utils/general/formatDates";
import { useState } from "react";
import Modal from "./Modal";

const TransactionsTab = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);

    const { transactions, loadingTransactions, transactionsError, refetch } = useTransactionsWithCategory();

    if(transactions.length === 0) return (
        <div className="overflow-x-auto rounded bg-almostwhite shadow-medium">
            <table className="w-full">
                <tbody>
                    <tr><th className="py-5 font-thin italic">No registraste ninguna transacción aún</th></tr> 
                </tbody>
            </table>
        </div>
    );

    const deleteTransaction = async () => {
        try {
            const res = await fetch("/api/auth/transactions", {
                method: "DELETE",
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
    
            // Si es un error cambia el modal y lo muestra
            if(!res || res.status !== 200) {
                setIsError(true);
                setIsModalOpen(true);
            }
              
            // Si es exitoso muestra el modal
            if(res.ok && res.status == 200) setIsModalOpen(true);
            
        } catch (error) {
            if (error instanceof Error) throw new Error("Error: " + error.message);
            console.log(error);
        };
    };

    const onContinue = async () => {
        setIsModalOpen(false);
        setIsOpen(false);
        await refetch();
    }

    return (
        <div className="overflow-x-auto rounded bg-almostwhite shadow-medium">
            <table className="w-full">
                <tbody>
                    {
                        !transactionsError ?
                            loadingTransactions ? 
                                <tr><th className="py-5 font-thin italic">Cargando Transacciones...</th></tr> 
                            : transactions.map((tx, i) => (
                                <tr key={i} className="font-light border-b-1 border-t-1 border-neutral-200">
                                    <td className="w-[80%] text-left text-lg pl-5 pr-5 py-2">{tx.category.name}</td>
                                    <td className="pr-3"><EditIcon className="w-[20px] h-[20px]" onClick={() => {setIsOpen(true); setId(tx.id);}} /></td>
                                    
                                    <td className="w-[80%] text-left pr-5 py-2">
                                        <div className="flex flex-col place-items-end text-sm">
                                            <span className={tx.typeId == 1 ? "text-emerald-500 font-medium text-lg" : "text-red-500 font-medium text-lg"}>{tx.typeId == 1 ? "" : "-"}${tx.amount}</span>
                                            <span>{formatDate(tx.date)}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        : <tr><th>Se produjo un error.</th></tr>
                    }
                </tbody>
            </table>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} exitButton={true} style="Warning">
                {
                    transactions?.map((tx) => ( 
                        tx.id === id &&
                        <div key={tx.id} className="flex flex-col place-content-center gap-[25px] text-white">
                            <div className="flex flex-col place-content-center gap-[15px]">
                                <span className="text-2xl font-bold text-center">{tx.typeId == 1 ? "Ingreso" : "Egreso"}</span>
                                <span className="text-lg text-center border-t-1 border-b-1 py-3"><span className="text-xl font-bold">Categoría</span> <br/> {tx.category.name}</span>
                                <span className="text-lg text-center border-b-1 pb-3"><span className="text-xl font-bold">Descripción</span> <br/> {tx.description}</span>
                                <span className="text-lg text-center"><span className="text-xl font-bold">Monto:</span> {tx.typeId == 1 ? "$" + tx.amount : "-$" + tx.amount}</span>
                            </div>
                            <button className="secondary-button" onClick={() => deleteTransaction()}>Eliminar Transacción</button>
                        </div>
                    ))
                }
            </Modal>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} exitButton={false} style={isError ? "Error" : "Success"}>
                {
                    isError ?
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-text-succed">Operación fallida</span>
                        <p className="modal-text-succed text-normal">No se pudo eliminar la transacción</p>
                        <button className="inverse-secondary-button" onClick={onContinue}>Continuar</button>
                    </div>
                    :
                    <div className="flex flex-col place-content-center gap-[20px]">
                        <span className="modal-text-succed">Operación exitosa</span>
                        <button className="inverse-primary-button" onClick={onContinue}>Continuar</button>
                    </div>
                }
            </Modal>
        </div>
    );
};

export default TransactionsTab;
