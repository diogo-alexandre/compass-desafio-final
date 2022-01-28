import { Router } from 'express'
import { attachControllers } from '@decorators/express'

import { CarController } from '../controllers/car.controller'
import { PeopleController } from '../controllers/people.controller'
import { AuthController } from '../controllers/auth.controller'

export const V1 = {
  handle (): Router {
    const router = Router()

    attachControllers(router, [
      CarController,
      PeopleController,
      AuthController
    ])

    return router
  }
}
