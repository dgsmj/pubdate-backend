import { ZodAdapter } from '../http/zodAdapter'
import { CreatePublishValidation } from '../validation/createPublishValidation'

export const makeCreatePublishValidation = (): CreatePublishValidation => {
  const zodAdapter = new ZodAdapter()
  return new CreatePublishValidation(zodAdapter)
}
