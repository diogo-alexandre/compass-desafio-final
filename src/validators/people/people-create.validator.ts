import moment from 'moment'
import JoiDate from '@joi/date'
import JoiLib, { ObjectSchema } from 'joi'
import { NextFunction, Response, Request } from 'express'

import { Middleware } from '@decorators/express'
import { BadRequest } from '../../errors/http/bad-request.error'
import { isCPF } from '../../utils/is-cpf.util'
import { IPeopleDTO } from '../../helpers/interfaces/people.interface'

const Joi = JoiLib.extend(JoiDate) as typeof JoiLib

export class PeopleCreateValidation implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: ObjectSchema<IPeopleDTO> = Joi.object({
        nome: Joi.string().trim().required(),
        cpf: Joi.string().trim().min(11).max(11).custom((value: string, helper) => {
          return (!isCPF(value) ? helper.message({ custom: '"cpf" field must be valid' }) : value)
        }).required(),
        data_nascimento: Joi.date().format('DD/MM/YYYY').max(moment().subtract(18, 'years').toDate())
          .message('"data_nascimento" should be greater than 18 year from now').required(),
        email: Joi.string().trim().email().required(),
        senha: Joi.string().trim().required(),
        habilitado: Joi.string().trim().valid('sim', 'nao').required()
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
