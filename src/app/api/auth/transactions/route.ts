import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
    
    const data = await request.json();

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        const nuevaTransaccion = await prisma.transaction.create({ 
            data: {
                amount: Number(data.amount),
                categoryId: Number(data.categoryId),
                userId: Number(session.user.id),
                typeId: Number(data.typeId),
                description: data.description,
                date: data.date,
            }
        });

        return NextResponse.json(nuevaTransaccion);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};

export async function DELETE(request: NextRequest) {
    
    const data = await request.json();

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        // Lo hacemos así porque "delete" solo recibe una condicion en el where

        const transaction = await prisma.transaction.findFirst({
            where: {
                id: data.id,
                userId: Number(session.user.id),
            },
        });

        if(!transaction) return NextResponse.json({ message: "La transacción no fue encontrada" }, { status: 404 });


        const transaccionEliminada = await prisma.transaction.delete({
            where: { id: data.id },
        });

        return NextResponse.json(transaccionEliminada);
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};