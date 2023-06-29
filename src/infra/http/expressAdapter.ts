/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpServer } from '@/infra/http/protocols'
import express, { Request, Response } from 'express'
import cors from 'cors'

export class ExpressAdapter implements HttpServer {
  app: any

  constructor () {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, res: Response) {
      try {
        const output = await callback(req.params, req.body, req.query, req.headers)
        if (output.statusCode) {
          return res
            .status(output.statusCode)
            .json(output?.body)
        }
        res.json(output)
      } catch (error: any) {
        res.status(422).json({
          message: error.message
        })
      }
    })
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`)
    })
  }
}
