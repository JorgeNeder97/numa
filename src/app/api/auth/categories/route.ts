import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Category } from "@/models/categories";


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

export async function POST(data:{name:string}) {
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
    }
}