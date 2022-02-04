import express, { Express } from 'express'

import { Database } from './database'
import { AppOptions } from './helpers/interfaces/app-options.interface'
import { errorHandler } from './middlewares/error-handle.middleware'
import { Routes } from './routes'

export class App {
  readonly express: Express

  private constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
    this.requestErrorHandler()
  }

  static async init (options?: AppOptions): Promise<Express> {
    const app = new App()

    await Database.init(options?.db_uri)

    return app.express
  }

  middlewares (): void {
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.json())
  }

  routes (): void {
    this.express.use('/api', Routes.handle())
  }

  requestErrorHandler (): void {
    this.express.use(errorHandler)
  }
}
