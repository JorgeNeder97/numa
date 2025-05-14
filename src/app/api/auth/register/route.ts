import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
    
        const userFound = await prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });
    
        // Este y otros console log son solo para solucionar el problema de abajo...
        console.log(userFound)
    
        // No esta funcionando este if y si entra a el...
        if(userFound) return NextResponse.json({ message: "El email ingresado corresponde a un usuario existente", status: 400 });
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
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

export async function GET(request: NextRequest) {
    try {
        const email = await request.json();

        const itExists = await prisma.user.findFirst({
            where: {
                email: email
            },
        });

        if(!itExists) return NextResponse.json("Email Válido.", { status: 203 });
        
        return NextResponse.json(itExists);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
        else if(error instanceof PrismaClientUnknownRequestError) return NextResponse.json({ message: error.message }, { status: 500 });
    };
};