import { CreatePublishRepository, FindAllPublishRepository } from '@/application/repository'
import { PrismaHelper } from '@/infra/database/prisma'
import { findAllPublishHelper } from './helper/findAllPublishHelper'

export class PublishRepositoryPrisma implements CreatePublishRepository, FindAllPublishRepository {
  async create(
    input: CreatePublishRepository.Input
  ): Promise<CreatePublishRepository.Output> {
    const { prisma } = PrismaHelper
    const uniqueProducts = [...new Set(input.products.map((item) => item.id))]
    const uniqueImpactedPlatforms = [...new Set(input.impactedPlatforms?.map((item) => item.id))]
    const productsData = uniqueProducts.map(id => ({ productId: id }))
    const impactedPlatformsData = uniqueImpactedPlatforms?.map(id => ({ impactPlatformId: id })) ?? []
    const result = await prisma.publish.create({
      data: {
        title: input.title,
        description: input.description,
        publishedDate: new Date(input.publishedDate),
        publishClassificationId: input.classificationId,
        productOwner: input.productOwner,
        FkPublishHasProduct: {
          createMany: {
            data: productsData
          }
        },
        FkPublishHasImpactedPlatforms: {
          createMany: {
            data: impactedPlatformsData
          }
        }
      },
      select: {
        id: true
      }
    })
    return result
  }

  async findAll(
    input: FindAllPublishRepository.Input
  ): Promise<FindAllPublishRepository.Output> {
    const { prisma } = PrismaHelper
    const conditions = []
    if (input.productId && Number.isInteger(+input.productId)) {
      conditions.push({
        FkPublishHasProduct: {
          some: { productId: +input.productId }
        }
      })
    }
    if (input.classificationId && Number.isInteger(+input.classificationId)) {
      conditions.push({
        publishClassificationId: +input.classificationId
      })
    }
    const page = +input.page! || 1
    const limit = +input.limit! || 10
    const totalCount = await prisma.publish.count({
      where: { AND: [...conditions] }
    })
    const publications = await prisma.publish.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { AND: [...conditions] },
      select: {
        id: true,
        title: true,
        description: true,
        publishedDate: true,
        productOwner: true,
        createdAt: true,
        updatedAt: true,
        FkPublishHasProduct: {
          select: {
            FkProduct: {
              select: {
                id: true,
                description: true
              }
            }
          }
        },
        FkPublishClassification: {
          select: {
            id: true,
            description: true
          }
        },
        FkPublishHasImpactedPlatforms: {
          select: {
            FkImpactPlatform: {
              select: {
                id: true,
                description: true
              }
            }
          }
        }
      },
      orderBy: {
        publishedDate: 'desc'
      }
    })
    const formattedPublications = findAllPublishHelper(publications)
    return {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      publications: formattedPublications
    }
  }
}
