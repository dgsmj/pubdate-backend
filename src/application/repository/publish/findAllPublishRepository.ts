import { PublishModel } from '@/model'

export interface FindAllPublishRepository {
  findAll(input: FindAllPublishRepository.Input): Promise<FindAllPublishRepository.Output>
}

export namespace FindAllPublishRepository {
  export type Input = {
    limit?: number
    page?: number
    productId?: number
    classificationId?: number
  }
  export type Output = {
    currentPage?: number
    totalPages?: number
    totalCount?: number
    publications?: PublishModel[]
  }
}
