import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { ICar } from '../../models/car.model'
import { Middleware } from '@decorators/express'

export class CarFindAllValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<ICar> = Joi.object({
        _id: Joi.string(),
        modelo: Joi.string(),
        cor: Joi.string(),
        ano: Joi.number().max(new Date().getFullYear()).min(1950),
        quantidadePassageiros: Joi.number(),
        acessorios: Joi.string().custom((value, helper) => {
          const acessorios = value.split(',')

          req.query.acessorios = acessorios.map((descricao: string) => {
            return {
              descricao: descricao.trim()
            }
          })

          return value
        }),
        limit: Joi.number().min(0),
        offset: Joi.number().min(0)
      })

      const { error } = schema.validate(req.query)

      if (error != null) {
        throw Error()
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
