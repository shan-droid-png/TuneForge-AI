import { PrismaClient } from "@prisma/client";

const prismaGlobal = globalThis;

export const prisma =
    prismaGlobal.__tuneforgePrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    prismaGlobal.__tuneforgePrisma = prisma;
}