import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { Middleware } from '@decorators/express'
import { ICar } from '../../helpers/interfaces/car.interface'
import { BadRequest } from '../../errors/http/bad-request.error'

export class CarUpdateValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<Partial<ICar>> = Joi.object().keys({
        modelo: Joi.string().trim(),
        cor: Joi.string().trim(),
        ano: Joi.number().max(new Date().getFullYear()).min(1950),
        quantidadePassageiros: Joi.number().positive(),
        acessorios: Joi.array().min(1).items(Joi.object({
          descricao: Joi.string().trim()
        })).unique((a, b) => a.descricao === b.descricao)
      })

      const { error } = schema.validate(req.body)

      if (error !== undefined) {
        throw new BadRequest(error.details[0].message)
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
