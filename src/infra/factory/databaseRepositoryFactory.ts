import { PublishRepositoryPrisma } from '@/infra/repository/prisma/publishRepository'

export class DatabasePublishRepositoryFactory {
  createPublishRepository(): PublishRepositoryPrisma {
    return new PublishRepositoryPrisma()
  }
}
