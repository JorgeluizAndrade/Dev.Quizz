import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import 'server-only';

const isTestEnv = process.env.NODE_ENV === "test";

export const authPrisma = new PrismaClient();

const prismaClientSingleton = () => {
  const client = new PrismaClient();
  return isTestEnv ? client : client.$extends(withAccelerate());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;
