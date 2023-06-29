import { Usecase } from '@/application/usecase/protocol'
import { CreatePublishUsecase } from '@/application/usecase/publish/createPublishUsecase'
import { FindAllPublishUsecase } from '@/application/usecase/publish/findAllPublishUsecase'
import { PublishRepositoryPrisma } from '../repository/prisma/publishRepository'

export class UsecaseFactory {
  createPublish (): Usecase {
    const publishRepository = new PublishRepositoryPrisma()
    return new CreatePublishUsecase(publishRepository)
  }

  findAllPublish (): Usecase {
    const publishRepository = new PublishRepositoryPrisma()
    return new FindAllPublishUsecase(publishRepository)
  }
}
