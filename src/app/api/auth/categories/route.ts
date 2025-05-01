import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";


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
                typeId: Number(data.typeId),
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
                userId: Number(data.userId),
            },
            data: {
                name: data.name,
                typeId: Number(data.typeId),
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
        // Lo hacemos así porque "delete" solo recibe una condicion en el where

        const categoria = await prisma.category.findFirst({
            where: {
                id: data.id,
                userId: Number(session.user.id),
            },
        });

        if(!categoria) return NextResponse.json({ message: "La categoría no fue encontrada o pertenece a mas de un usuario" }, { status: 404 });


        const categoriaEliminada = await prisma.category.delete({
            where: { id: data.id },
        });

        return NextResponse.json(categoriaEliminada);
    } catch (error) {
        console.log(error);
        
    // 
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code == "P2003") return NextResponse.json({ message: "La categoría no se puede eliminar debido a que ya está en uso" }, { status: 403 });
        }
        if(error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};