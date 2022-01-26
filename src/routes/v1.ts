import { Router } from 'express'
import { attachControllers } from '@decorators/express'

import { CarController } from '../controller/car.controller'

export const V1 = {
  handle (): Router {
    const router = Router()

    attachControllers(router, [
      CarController
    ])

    return router
  }
}
