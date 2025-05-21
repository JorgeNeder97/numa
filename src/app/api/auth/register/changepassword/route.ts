import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();

        const userFound = await prisma.user.findFirst({
            where: {
                id: data.id,
            },
        });

        if (!userFound) return NextResponse.json("El usuario no existe", { status: 404 });

        if(bcrypt.compareSync(data.password, userFound?.password)) {
            const passwordHashed = bcrypt.hashSync(data.newPassword, 12)
            const userModified = await prisma.user.update({
                data: {
                    password: data.newPassword
                },
                where: {
                    id: userFound.id
                },
            });

            return NextResponse.json(userModified);
        }

        else return NextResponse.json({ message: "La contraseña ingresada es incorrecta" }, { status: 400 });


    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if (error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    }
}