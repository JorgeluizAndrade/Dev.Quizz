import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import 'server-only';



export const authPrisma = new PrismaClient();


const prismaClientSingleton = () => {
return new PrismaClient ().$extends(withAccelerate())
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;


const globalForPrisma = globalThis as unknown as {
prisma: PrismaClientSingleton | undefined;
}


const prisma = globalForPrisma.prisma ?? prismaClientSingleton();


export default prisma;

