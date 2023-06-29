import { z, AnyZodObject } from 'zod'
import { SchemaValidation, SchemaError } from './protocols/schemaValidation'

export class ZodAdapter implements SchemaValidation<typeof z, AnyZodObject> {
  validator = z

  isError (schema: AnyZodObject, input: object): SchemaError | null {
    try {
      schema.parse(input)
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten()?.fieldErrors
      }
      return null
    }
  }
}
