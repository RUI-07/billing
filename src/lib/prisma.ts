import {PrismaClient} from '@prisma/client'

// @ts-ignore
export const prisma: PrismaClient = global.prisma || new PrismaClient({
  log: ['query']
})

// @ts-ignore
if (process.env.NODE_ENV === 'development') global.prisma = prisma
