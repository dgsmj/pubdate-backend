import { Usecase } from '@/application/usecase/protocol'
import { CreatePublishRepository } from '@/application/repository'

export class CreatePublishUsecase implements Usecase {
  constructor (
    readonly createPublishRepository: CreatePublishRepository
  ) {}

  async execute(
    input: CreatePublishRepository.Input
  ): Promise<CreatePublishRepository.Output> {
    const publish = await this.createPublishRepository.create(input)
    return publish
  }
}
