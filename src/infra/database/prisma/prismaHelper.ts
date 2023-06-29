import prisma from './client'

export const PrismaHelper = {
  prisma,
  async connect(): Promise<void> {
    await this.prisma.$connect()
  },
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
  }
}
