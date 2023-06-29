import { DefaultResourceModel, PublishModel } from '@/model'

export const findAllPublishHelper = (input: Input[]): PublishModel[] => {
  return input.map(item => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      productOwner: item.productOwner,
      publishedDate: item.publishedDate,
      classification: {
        id: item.FkPublishClassification.id,
        description: item.FkPublishClassification.description
      },
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      products: item.FkPublishHasProduct?.map(product => ({
        id: product.FkProduct.id,
        description: product.FkProduct.description
      })) ?? [],
      impactedPlatforms: item.FkPublishHasImpactedPlatforms?.map(platform => ({
        id: platform.FkImpactPlatform.id,
        description: platform.FkImpactPlatform.description
      })) ?? []
    }
  })
}

type Input = {
  id: number
  title: string
  description: string
  productOwner: string
  publishedDate: Date
  createdAt: Date
  updatedAt: Date
  FkPublishHasProduct: Array<{
    FkProduct: DefaultResourceModel
  }>
  FkPublishClassification: DefaultResourceModel
  FkPublishHasImpactedPlatforms?: Array<{
    FkImpactPlatform: DefaultResourceModel
  }>
}
