
import { PrismaClient } from "@prisma/client/extension"

const prismaClientSingleton = () => {
    return new PrismaClient();
}

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
    prisma: prismaClientSingleton | undefined;
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
