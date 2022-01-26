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
        acessorios: Joi.string().custom((value, helper) => {
          const acessorios = value.split(',')

          req.query.acessorios = acessorios.map((descricao: string) => {
            return {
              descricao: descricao.trim()
            }
          })

          return value
        })
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
