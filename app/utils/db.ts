import { PrismaClient } from '@prisma/client';

// Create a new PrismaClient instance if it doesn't exist yet
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global object for the Prisma client in development (avoiding multiple instances in hot reloading)
declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

// Reuse the Prisma client globally in development mode
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Store Prisma client instance in the global scope only for development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
