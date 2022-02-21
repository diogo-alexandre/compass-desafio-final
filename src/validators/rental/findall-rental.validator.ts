import Joi from 'joi';
import { Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';

import { CNPJ } from '../../utils/cpf-cnpj.util';
import { IRentalDTO } from '../../helpers/interfaces/entities/rental.interface';
import { IAdress } from '../../helpers/interfaces/entities/adress.interface';
import BadRequest from '../../errors/http/bad-request.error';

class FindAllRentalValidation implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const schema = Joi.object<IRentalDTO & { limit: number, offset: number } & IAdress>({
        nome: Joi.string()
          .trim(),

        cnpj: Joi.string()
          .trim()
          .custom((value, helper) => {
            const message = helper.message({ custom: '"CNPJ" must be valid' });
            try { return (CNPJ(value).isValid()) ? value : message; } catch { return message; }
          }),

        atividades: Joi.string()
          .trim(),

        cep: Joi.string()
          .trim(),

        logradouro: Joi.string()
          .trim(),

        complemento: Joi.string()
          .trim(),

        bairro: Joi.string()
          .trim(),

        number: Joi.string()
          .trim(),

        localidade: Joi.string()
          .trim(),

        uf: Joi.string()
          .trim(),

        limit: Joi.number()
          .min(1),

        offset: Joi.number()
          .min(1),
      });

      const { error } = schema.validate(req.query, { abortEarly: false });

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

export default FindAllRentalValidation;
