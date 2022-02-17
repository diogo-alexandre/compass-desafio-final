import Joi from 'joi'
import { isValidObjectId } from 'mongoose'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors/http/bad-request.error'

export const IdParamValidation = (...keys: string[]): (new () => { [key in keyof Middleware]: Middleware[key] }) => {
  return class Base implements Middleware {
    use (req: Request, res: Response, next: NextFunction): void {
      try {
        const schema: Joi.PartialSchemaMap = {}

        keys.forEach(key => {
          schema[key] = Joi.string()
            .custom((value, helper) => {
              return isValidObjectId(value) ? value : helper.message({ custom: 'Id field is not valid' })
            })
            .required()
        })

        const { error } = Joi.object(schema).validate(req.params, { abortEarly: false })

        if (error !== undefined) {
          throw new BadRequest(error.details.map(({ message }) => ({ message })))
        }

        return next()
      } catch (error) {
        return next(error)
      }
    }
  }
}
