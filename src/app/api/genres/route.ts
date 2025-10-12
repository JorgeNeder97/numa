import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export async function GET() {
    try {
        const genres = await prisma.genre.findMany();

        return NextResponse.json(genres);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};