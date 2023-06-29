import { DefaultResourceModel } from './'

export interface PublishModel {
  id?: number
  publishedDate: Date
  title: string
  description: string
  productOwner: string
  classification: DefaultResourceModel
  createdAt: Date
  updatedAt: Date
  products: DefaultResourceModel[]
  impactedPlatforms?: DefaultResourceModel[]
}
