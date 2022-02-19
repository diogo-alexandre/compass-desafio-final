import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { Middleware } from '@decorators/express'
import { BadRequest } from '../../errors/http/bad-request.error'
import { IAcessorio } from '../../helpers/interfaces/entities/acessorio.interface'

export class CarUpdateAccessoryValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: Joi.ObjectSchema<IAcessorio> = Joi.object({
        descricao: Joi.string()
          .trim()
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
