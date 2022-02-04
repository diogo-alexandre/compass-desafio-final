import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { Middleware } from '@decorators/express'
import { ICarDTO } from '../../helpers/interfaces/car.interface'
import { BadRequest } from '../../errors/http/bad-request.error'
import { CarConstant } from '../../constants/car.constant'

export class CarFindAllValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<ICarDTO> = Joi.object({
        modelo: Joi.string()
          .trim(),

        cor: Joi.string()
          .trim(),

        ano: Joi.number()
          .max(CarConstant.MAX_YEAR)
          .min(CarConstant.MIN_YEAR),

        quantidadePassageiros: Joi.number(),

        acessorios: Joi.array()
          .min(1)
          .items(Joi.string().trim().required()),

        limit: Joi.number()
          .min(1),

        offset: Joi.number()
          .min(1)
      })

      const { error } = schema.validate(req.query, { abortEarly: false })

      if (error !== undefined) {
        throw new BadRequest(error.details.map(({ message }) => ({ message })))
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
