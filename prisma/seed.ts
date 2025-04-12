import { prisma } from "@/libs/prisma";
async function main() {
    const income = await prisma.type.upsert({
        where: { name: "income" },
        update: {},
        create: {
            name: "income",
        },
    });
    const expense = await prisma.type.upsert({
        where: { name: "expense" },
        update: {},
        create: {
            name: "expense",
        },
    });
};

// Continuar con el seeder