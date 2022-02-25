import Joi from 'joi';
import { Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';

import { CNPJ } from '../../utils/cpf-cnpj.util';
import { IRentalDTO } from '../../helpers/interfaces/entities/rental.interface';
import BadRequest from '../../errors/http/bad-request.error';
import CEP from '../../utils/cep.util';

class CreateRentalValidation implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object<IRentalDTO>({
        nome: Joi.string()
          .trim()
          .required(),

        cnpj: Joi.string()
          .trim()
          .custom((value, helper) => {
            const message = helper.message({ custom: '"CNPJ" must be valid' });
            try { return (CNPJ(value).isValid()) ? value : message; } catch { return message; }
          })
          .required(),

        atividades: Joi.string()
          .trim()
          .required(),

        endereco: Joi.array()
          .items(Joi.object({
            cep: Joi.string()
              .trim()
              .custom(async (value, helper) => {
                const message = helper.message({ custom: '"CEP" must be valid' });
                try {
                  CEP(value);
                  return value;
                } catch { return message; }
              })
              .required(),

            number: Joi.string()
              .trim()
              .required(),

            complemento: Joi.string()
              .trim(),

            isFilial: Joi.boolean()
              .required(),
          }))
          .min(1)
          .unique((a, b) => a.isFilial === false && b.isFilial === false)
          .required()
          .messages({
            'array.unique': 'There can only exist one "endereco" with "isFilial" field equals "false"',
          }),
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

export default CreateRentalValidation;
