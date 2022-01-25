import { Router } from 'express'
import { CarRoutes } from './car.routes'

export const v1 = (): Router => {
  const router = Router()

  router.use('/car', CarRoutes.handle())

  return router
}
