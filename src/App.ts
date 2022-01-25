import express, { Express } from 'express'

import { Database } from './database'
import { v1 } from './routes/v1'

export class App {
  readonly express: Express

  private constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  static async init (): Promise<Express> {
    const app = new App()

    await Database.init()

    return app.express
  }

  middlewares (): void {
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.json())
  }

  routes (): void {
    this.express.use('/api/v1', v1())
  }
}
