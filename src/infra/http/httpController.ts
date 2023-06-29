/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpServer } from '@/infra/http/protocols'
import { UsecaseFactory } from '@/infra/factory'
import { created, unprocessableContent } from './httpResponse'
import { makeCreatePublishValidation } from '../factory/createPublishValidation'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HttpController {
  constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on('post', '/publish', async (params: any, body: any) => {
      const validation = makeCreatePublishValidation()
      const isError = validation.validate(body)
      if (isError) return unprocessableContent(isError)
      const createPublish = usecaseFactory.createPublish()
      const output = await createPublish.execute(body)
      return created(output)
    })

    httpServer.on('get', '/publish', async (params: any, body: any, query: any) => {
      const createPublish = usecaseFactory.findAllPublish()
      const output = await createPublish.execute(query)
      return output
    })
  }
}
