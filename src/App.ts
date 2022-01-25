import express, { Express } from 'express'
import { Database } from './database'

export class App {
  readonly express: Express

  private constructor () {
    this.express = express()
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
}
