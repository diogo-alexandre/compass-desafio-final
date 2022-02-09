import Joi from 'joi'
import { isValidObjectId } from 'mongoose'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../../errors/http/bad-request.error'

export class ParamCardIdAndAcessorioIdValidator implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object({
        carId: Joi.string()
          .custom((value, helper) => {
            return isValidObjectId(value) ? value : helper.message({ custom: '"carId" field is not a valid id' })
          })
          .required(),

        acessorioId: Joi.string()
          .custom((value, helper) => {
            return isValidObjectId(value) ? value : helper.message({ custom: '"acessorioId" field is not a valid id' })
          })
          .required()
      })

      const { error } = schema.validate(req.params, { abortEarly: false })

      if (error !== undefined) {
        throw new BadRequest(error.details.map(({ message }) => ({ message })))
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
