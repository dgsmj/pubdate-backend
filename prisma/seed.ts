import {
  impactPlatform,
  product,
  publishClassification
} from './seeders'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.impactPlatform.createMany({
    data: impactPlatform,
    skipDuplicates: true
  })
  await prisma.product.createMany({
    data: product,
    skipDuplicates: true
  })
  await prisma.publishClassification.createMany({
    data: publishClassification,
    skipDuplicates: true
  })
}

main()
  // eslint-disable-next-line no-console
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
