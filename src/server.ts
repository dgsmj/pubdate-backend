import 'module-alias/register'
import { ExpressAdapter } from '@/infra/http/expressAdapter'
import {
  HttpController
} from '@/infra/http'
import {
  UsecaseFactory
} from '@/infra/factory'

async function main (): Promise<void> {
  const httpServer = new ExpressAdapter()

  const usecaseFactory = new UsecaseFactory()

  // eslint-disable-next-line no-new
  new HttpController(httpServer, usecaseFactory)
  httpServer.listen(3001)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
