import { Usecase } from '@/application/usecase/protocol'
import { FindAllPublishRepository } from '@/application/repository'

export class FindAllPublishUsecase implements Usecase {
  constructor (readonly findAllPublishRepository: FindAllPublishRepository) {}

  async execute(
    input: FindAllPublishRepository.Input
  ): Promise<FindAllPublishRepository.Output> {
    const publish = await this.findAllPublishRepository.findAll(input)
    return publish
  }
}
