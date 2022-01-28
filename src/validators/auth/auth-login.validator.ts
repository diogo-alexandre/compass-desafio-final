import Joi from 'joi'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../../errors/http/bad-request.error'

export class AuthLoginValidator implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        senha: Joi.string().min(6).required()
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
