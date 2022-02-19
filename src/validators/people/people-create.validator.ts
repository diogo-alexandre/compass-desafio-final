import moment from 'moment';
import JoiDate from '@joi/date';
import JoiLib, { ObjectSchema } from 'joi';
import { Middleware } from '@decorators/express';
import { NextFunction, Response, Request } from 'express';

import { CPF } from '../../utils/cpf-cnpj.util';
import { IPeopleDTO } from '../../helpers/interfaces/entities/people.interface';
import BadRequest from '../../errors/http/bad-request.error';

const Joi = JoiLib.extend(JoiDate) as typeof JoiLib;

export class PeopleCreateValidation implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const schema: ObjectSchema<IPeopleDTO> = Joi.object({
        nome: Joi.string()
          .trim()
          .required(),

        cpf: Joi.string()
          .trim()
          .min(11)
          .max(11)
          .custom((value: string, helper) => {
            const message = helper.message({ custom: '"CPF" must be valid' });
            try { return CPF(value).isValid() ? value : message; } catch { return message; }
          })
          .required(),

        data_nascimento: Joi.date()
          .format('DD/MM/YYYY')
          .max(moment().subtract(18, 'years').toDate())
          .message('"data_nascimento" should be greater than 18 year from now')
          .required(),

        email: Joi.string()
          .trim()
          .email()
          .required(),

        senha: Joi.string()
          .min(6)
          .required(),

        habilitado: Joi.string()
          .trim()
          .valid('sim', 'nao')
          .required(),
      });

      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error !== undefined) {
        throw new BadRequest(error.details.map((detail) => ({
          name: String(detail.path),
          description: detail.message,
        })));
      }

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default PeopleCreateValidation;
