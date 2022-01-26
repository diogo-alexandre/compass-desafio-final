import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { Middleware } from '@decorators/express'
import { ICar } from '../../helpers/interfaces/car.interface'

export class CarCreateValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<ICar> = Joi.object({
        modelo: Joi.string().trim().required(),
        cor: Joi.string().trim().required(),
        ano: Joi.number().max(new Date().getFullYear()).min(1950).required(),
        quantidadePassageiros: Joi.number().positive().required(),
        acessorios: Joi.array().min(1).items(Joi.object({
          descricao: Joi.string().trim().required()
        })).unique((a, b) => a.descricao === b.descricao).required()
      })

      const { error } = schema.validate(req.body)

      console.log(error)

      if (error != null) {
        throw Error()
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
