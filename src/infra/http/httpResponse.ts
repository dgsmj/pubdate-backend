import { HttpResponse } from './protocols'
import { SchemaError } from './protocols/schemaValidation'

export const created = (data: Record<string, unknown>): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const unprocessableContent = (
  error: SchemaError | Error | string[] | null
): HttpResponse => ({
  statusCode: 422,
  body: error
})
