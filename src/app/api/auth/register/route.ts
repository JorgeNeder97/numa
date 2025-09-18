import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
    
        const userFound = await prisma.user.findFirst({
            where: {
                email: {
                    equals: data.email,
                    mode: 'insensitive',
                },
            },
        });
    
        if(userFound) return NextResponse.json({ message: "El email pertenece a una cuenta existente" }, { status: 400 });
        const hashedPassword = await bcrypt.hash(data.password, 12);
    
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: hashedPassword,
            },
        });
    
        // Declaro una variable password y desestructuro newUser en user (ya sin password) para
        // poder enviar los datos al frontend sin la contraseña
        const {password: _, ...user} = newUser;
        return NextResponse.json(user);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();
    
        const userFound = await prisma.user.findFirst({
            where: {
                email: {
                    equals: data.email,
                    mode: "insensitive",
                },
            },
        });
    
        if(!userFound) return NextResponse.json("El usuario que intentas modificar no existe", { status: 400 });
        
        const userModified = await prisma.user.update({
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
            },
            where: {
                id: userFound.id
            },
        });
    
        return NextResponse.json(userModified);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};

export async function DELETE(request: NextRequest) {
    try {
        const data = await request.json();
    
        const userDeleted = await prisma.user.delete({
            where: {
                id: data.id,
            },
        });
    
        if(!userDeleted) return NextResponse.json("El usuario no existe", { status: 400 });
        
        return NextResponse.json(userDeleted);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
}