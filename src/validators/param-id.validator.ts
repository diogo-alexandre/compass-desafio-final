import { isValidObjectId } from 'mongoose'
import Joi, { LanguageMessages } from 'joi'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

export class ParamIdValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object({
        id: Joi.string().custom((value, helper) => {
          if (!isValidObjectId(value)) {
            return helper.message('Field id is not a valid id' as unknown as LanguageMessages)
          } else {
            req.query._id = value
            return value
          }
        }).required()
      })

      const { error } = schema.validate(req.params)

      if (error != null) {
        throw Error()
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
