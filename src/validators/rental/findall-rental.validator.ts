import Joi from 'joi'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

import { CNPJ } from '../../utils/cpf-cnpj.util'
import { BadRequest } from '../../errors/http/bad-request.error'
import { IRentalDTO } from '../../helpers/interfaces/entities/rental.interface'

export class FindAllRentalValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object<IRentalDTO & { limit: number, offset: number }>({
        nome: Joi.string()
          .trim(),

        cnpj: Joi.string()
          .trim()
          .custom((value, helper) => {
            const message = helper.message({ custom: '"CNPJ" must be valid' })
            try { return (CNPJ(value).isValid()) ? value : message } catch { return message }
          }),

        atividades: Joi.string()
          .trim(),

        endereco: Joi.array()
          .items(Joi.object({
            cep: Joi.string()
              .trim()
              .regex(/[0-9]{5}[-]?[0-9]{2}/)
              .messages({
                'string.pattern.base': '$label with value $value must be on formart: 12345-000 or 12345000'
              }),

            number: Joi.string()
              .trim(),

            complemento: Joi.string()
              .trim(),

            isFilial: Joi.boolean()
          }))
          .min(1)
          .unique((a, b) => {
            return a.isFilial === false && b.isFilial === false
          })
          .messages({
            'array.unique': 'There can only exist one "endereco" with "isFilial" field equals "false"'
          }),

        limit: Joi.number()
          .min(1),

        offset: Joi.number()
          .min(1)
      })

      const { error } = schema.validate(req.query, { abortEarly: false })

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
