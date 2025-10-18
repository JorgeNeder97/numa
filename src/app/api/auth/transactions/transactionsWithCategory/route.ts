import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export async function GET() {

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: Number(session.user.id)
            },
            include: {
                category: true,
            },
            orderBy: {
                date: "desc",
            },
        });

        if(transactions) return NextResponse.json(transactions);
        else {
            const monto = 0;
            return NextResponse.json(monto);
        }
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};
