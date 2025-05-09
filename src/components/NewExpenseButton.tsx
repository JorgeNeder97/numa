import ExpenseIcon from "@/assets/icons/ExpenseIcon";
import Link from "next/link"

const NewExpenseButton = () => {
  return (
    <Link href="/dashboard/transactions/new/expense" className="bg-error min-w-[150px] flex place-items-center gap-[10px] px-[10px] py-[5px] rounded-[5px]">
        <span className="text-white text-sm">Nuevo Egreso</span>
        <div className="w-[1px] h-[20px] bg-neutral-200 rounded-[50%]"></div>
        <ExpenseIcon />
    </Link>
  )
};

export default NewExpenseButton;