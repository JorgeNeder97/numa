import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: Number(session.user.id)
            },
        });

        if(transactions) return NextResponse.json(transactions);
        else {
            const monto = 0;
            return NextResponse.json(monto);
        }
    } catch (error) {
        
    }
}