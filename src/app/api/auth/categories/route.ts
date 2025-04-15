import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";


export async function GET() {
    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        const categories = await prisma.category.findMany({
            where: {
                userId: Number(session.user.id),
            },
        });

        return NextResponse.json(categories);
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
        const nuevaCategoria = await prisma.category.create({
            data: {
                name: data.name,
                userId: Number(session.user.id)
            }
        });

        return NextResponse.json(nuevaCategoria);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};

export async function PATCH(request: NextRequest) {

    const data = await request.json();

    if(!data) return NextResponse.json({ message: "No se enviaron datos" }, { status: 400 });

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    try {
        const res = await prisma.category.update({
            where: {
                id: data.id,
                userId: data.userId,
            },
            data: {
                name: data.name,
            },
        });

        return NextResponse.json(res);
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
        const categoriaEliminada = await prisma.category.delete({
            where: {
                id: data.id,
                userId: Number(session.user.id),
            },
        });

        return NextResponse.json(categoriaEliminada);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};