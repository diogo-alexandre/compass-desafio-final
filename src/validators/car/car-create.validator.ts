import Joi from 'joi'
import { NextFunction, Response, Request } from 'express'

import { Middleware } from '@decorators/express'
import { ICarDTO } from '../../helpers/interfaces/entities/car.interface'
import { BadRequest } from '../../errors/http/bad-request.error'
import { CarConstant } from '../../constants/car.constant'

export class CarCreateValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<ICarDTO> = Joi.object({
        modelo: Joi.string()
          .trim()
          .required(),

        cor: Joi.string()
          .trim()
          .required(),

        ano: Joi.number()
          .max(CarConstant.MAX_YEAR)
          .min(CarConstant.MIN_YEAR)
          .required(),

        quantidadePassageiros: Joi.number()
          .positive()
          .required(),

        acessorios: Joi.array()
          .min(1)
          .items(Joi.object({
            descricao: Joi.string()
              .trim()
              .required()
          }))
          .unique((a, b) => a.descricao === b.descricao)
          .required()
      })

      const { error } = schema.validate(req.body, { abortEarly: false })

      if (error !== undefined) {
        throw new BadRequest(error.details.map(detail => {
          return {
            name: String(detail.path),
            description: detail.message
          }
        }))
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
