import { SchemaObjectValidation } from '@/application/validation'
import { impactPlatformEnum, productEnum, publishClassificationEnum } from '@/enum'
import { SchemaError } from '../http/protocols/schemaValidation'
import { ZodAdapter } from '../http/zodAdapter'

export class CreatePublishValidation implements SchemaObjectValidation {
  constructor(
    private readonly validationAdapter: ZodAdapter
  ) {}

  validate (input: Record<string, unknown> | unknown[]): SchemaError | null {
    const { validator, isError } = this.validationAdapter
    const schema = validator.object({
      title: validator.string(),
      description: validator.string(),
      classificationId: validator.nativeEnum(publishClassificationEnum),
      productOwner: validator.string(),
      publishedDate: validator.string(),
      products: validator.object({
        id: validator.nativeEnum(productEnum)
      }).array().min(1),
      impactedPlatforms: validator.object({
        id: validator.nativeEnum(impactPlatformEnum)
      }).array().min(1)
    }).required()
    return isError(schema, input)
  }
}
