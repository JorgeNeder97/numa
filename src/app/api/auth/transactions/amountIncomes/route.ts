import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../[...nextauth]/route";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { DateTime } from "luxon";

export async function GET() {
    
    const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    
    const startOfMonth = now.startOf("month").toUTC().toISO();
    const endOfMonth = now.endOf("month").toUTC().toISO();

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    
    try {
        if(startOfMonth && endOfMonth) {
            const incomes = await prisma.transaction.findMany({
                where: {
                    userId: Number(session.user.id),
                    typeId: 1,
                    date: {
                        gte: startOfMonth,
                        lte: endOfMonth,
                    }
                },
                include: {
                    category: true,
                },
            });

            const resume: { [key: string]: number } = {};
    
            incomes.forEach((income) => {
                const category = income.category?.name || "Sin categoría";
                if(!resume[category]) {
                    resume[category] = 0;
                };
                resume[category] += Number(income.amount);
            });
    
            const result = Object.entries(resume).map(([categoryName, total]) => (
                { categoryName, total}
            ));
    
            return NextResponse.json(result);
        }
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};