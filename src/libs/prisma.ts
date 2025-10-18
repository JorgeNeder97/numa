import { PrismaClient } from "@prisma/client";

// Definimos un "global" que permita reutilizar la instancia en desarrollo
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Si ya existe una instancia global la usa, sino crea una nueva.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"], // log útil durante desarrollo (es opcional)
  });

// En desarrollo guardamos la instancia en globalThis
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
