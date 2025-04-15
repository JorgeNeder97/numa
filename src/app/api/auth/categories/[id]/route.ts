import { prisma } from "@/libs/prisma";
import { CategoryParams } from "@/models/categories";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: CategoryParams) {
    const { id } = await params;

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!category) return NextResponse.json({ message: "No se encontró la categoría" }, { status: 400 });

        return NextResponse.json(category);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if (error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};