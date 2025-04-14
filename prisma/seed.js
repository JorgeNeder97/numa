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