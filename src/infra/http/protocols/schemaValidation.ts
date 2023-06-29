export interface SchemaValidation<T, S> {
  validator: T
  isError: (schema: S, input: object) => SchemaError | null
}

export interface SchemaError {
  [key: string]: string[] | undefined
}
