import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { ICar } from '../../models/car.model'
import { Middleware } from '@decorators/express'

export class CarCreateValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<ICar> = Joi.object({
        modelo: Joi.string().required(),
        cor: Joi.string().required(),
        ano: Joi.number().max(new Date().getFullYear()).required(),
        quantidadePassageiros: Joi.number().required(),
        acessorios: Joi.array().items(Joi.object({
          descricao: Joi.string().required()
        }))
      })

      const { error } = schema.validate(req.body)

      if (error != null) {
        throw Error()
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
