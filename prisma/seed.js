import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
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
    const male = await prisma.genre.upsert({
        where: { name: "male" },
        update: {},
        create: {
            name: "male",
        },
    });
    const female = await prisma.genre.upsert({
        where: { name: "female" },
        update: {},
        create: {
            name: "female",
        }
    });
};
main()
  .then(() => {
    console.log("Seed completado");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });