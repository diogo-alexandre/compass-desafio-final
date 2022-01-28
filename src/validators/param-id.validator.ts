import Joi from 'joi'
import { isValidObjectId } from 'mongoose'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors/http/bad-request.error'

export class ParamIdValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object({
        id: Joi.string().custom((value, helper) => {
          return isValidObjectId(value) ? value : helper.message({ custom: 'Id field is not valid' })
        }).required()
      })

      const { error } = schema.validate(req.params)

      if (error !== undefined) {
        throw new BadRequest(error.details[0].message)
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
