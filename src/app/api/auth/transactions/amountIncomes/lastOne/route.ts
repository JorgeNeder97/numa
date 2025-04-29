import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../[...nextauth]/route";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { DateTime } from "luxon";

export async function GET() {

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        const lastIncome = await prisma.transaction.findFirst({
            where: {
                userId: Number(session.user.id),
                typeId: 1,
            },
            include: {
                category: true,
            },
            orderBy: {
                date: "desc",
            },
        });

        return NextResponse.json(lastIncome);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};