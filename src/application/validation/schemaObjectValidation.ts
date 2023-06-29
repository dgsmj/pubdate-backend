import { SchemaError } from '@/infra/http/protocols/schemaValidation'

export interface SchemaObjectValidation {
  validate (input: Record<string, unknown> | unknown[]): SchemaError | null
}
