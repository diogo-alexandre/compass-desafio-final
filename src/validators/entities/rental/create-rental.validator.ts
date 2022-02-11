import Joi from 'joi'
import { Middleware } from '@decorators/express'
import { Request, Response, NextFunction } from 'express'

import { CNPJ } from '../../../utils/cpf-cnpj.util'
import { BadRequest } from '../../../errors/http/bad-request.error'
import { IRentalDTO } from '../../../helpers/interfaces/entities/rental.interface'

export class CreateRentalValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object<IRentalDTO>({
        nome: Joi.string()
          .trim()
          .required(),

        cnpj: Joi.string()
          .trim()
          .custom((value, helper) => {
            const message = helper.message({ custom: '"CNPJ" must be valid' })
            try { return (CNPJ(value).isValid()) ? value : message } catch { return message }
          })
          .required(),

        atividades: Joi.string()
          .trim()
          .required(),

        endereco: Joi.array()
          .items(Joi.object({
            cep: Joi.string()
              .trim()
              .regex(/[0-9]{5}[-]?[0-9]{2}/)
              .required()
              .messages({
                'string.pattern.base': '$label with value $value must be on formart: 12345-000 or 12345000'
              }),

            number: Joi.string()
              .trim()
              .required(),

            complemento: Joi.string()
              .trim(),

            isFilial: Joi.boolean()
              .required()
          }))
          .min(1)
          .unique((a, b) => {
            return a.isFilial === false && b.isFilial === false
          })
          .required()
          .messages({
            'array.unique': 'There can only exist one "endereco" with "isFilial" field equals "false"'
          })
      })

      const { error } = schema.validate(req.body, { abortEarly: false })

      if (error !== undefined) {
        throw new BadRequest(error.details.map(detail => {
          const { label, value } = detail.context as { label: string, value: string }
          const message = detail.message.replace(/\$label/, `"${label}"`).replace(/\$value/, `"${value}"`)

          return { message }
        }))
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
