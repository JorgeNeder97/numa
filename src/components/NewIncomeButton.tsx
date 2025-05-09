import IncomeIcon from "@/assets/icons/IncomeIcon"
import Link from "next/link"

const NewIncomeButton = () => {
  return (
    <Link href="/dashboard/transactions/new/income" className="bg-tertiary min-w-[150px] flex place-items-center gap-[10px] px-[10px] py-[5px] rounded-[5px]">
        <span className="text-white text-sm">Nuevo Ingreso</span>
        <div className="w-[1px] h-[20px] bg-neutral-200 rounded-[50%]"></div>
        <IncomeIcon />
    </Link>
  )
};

export default NewIncomeButton;