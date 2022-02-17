import express, { Express } from 'express'

import { Routes } from './routes'
import { Database } from './database'
import { Env } from './utils/env.util'
import { AppOptions } from './helpers/interfaces/app-options.interface'
import { errorHandler } from './middlewares/error-handle.middleware'

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

    options = {
      ...options,
      log: true
    }

    for (const key in options) {
      Env.set(key.includes('_') ? key : `app_${key}`, options[key as keyof AppOptions])
    }

    await Database.init()

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
