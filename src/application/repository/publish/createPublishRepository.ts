export interface CreatePublishRepository {
  create(input: CreatePublishRepository.Input): Promise<CreatePublishRepository.Output>
}

export namespace CreatePublishRepository {
  export type Input = {
    title: string
    description: string
    productOwner: string
    classificationId: number
    publishedDate: string
    products: Array<{
      id: number
    }>
    impactedPlatforms?: Array<{
      id: number
    }>
  }
  export type Output = {
    id: number
  }
}
