import ExpenseIcon from "@/assets/icons/ExpenseIcon";
import Link from "next/link"

const NewExpenseButton = () => {
  return (
    <Link href="/dashboard/transactions/new/expense" className="bg-white min-w-[120px] flex place-items-center gap-[10px] px-[10px] py-[5px] rounded-[5px]">
        <span className="text-darkPrimary text-[1rem]">Nuevo Egreso</span>
        <div className="w-[1px] h-[20px] bg-darkPrimary rounded-[50%]"></div>
        <ExpenseIcon stroke={"#003322"} />
    </Link>
  )
};

export default NewExpenseButton;