import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { Middleware } from '@decorators/express'
import { ICar } from '../../helpers/interfaces/car.interface'

export class CarFindAllValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<ICar> = Joi.object({
        modelo: Joi.string(),
        cor: Joi.string(),
        ano: Joi.number().max(new Date().getFullYear()).min(1950),
        quantidadePassageiros: Joi.number(),
        acessorios: Joi.array().items(Joi.string().trim()),
        limit: Joi.number().min(1),
        offset: Joi.number().min(1)
      })

      const { error } = schema.validate(req.query)

      if (error != null) {
        throw Error()
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
