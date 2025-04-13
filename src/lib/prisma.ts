// creating a singleton instance of PrismaClient
import { PrismaClient } from "@/generated/prisma"

// access Node.js's global object, which persists across module reloads.
// this is a common pattern to store persistent values.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// check if there's already a Prisma client instance in the global object.
// If not, it create a new one.
const prisma = globalForPrisma.prisma || new PrismaClient()

// store the prisma client instance in the global object for reuse.
// In production, this step is less important because the code doesn't get hot-reloaded.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
