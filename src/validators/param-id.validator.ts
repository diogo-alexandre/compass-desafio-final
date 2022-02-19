import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/http/bad-request.error';

function IdParamValidation(
  ...keys: string[]
): (new () => { [key in keyof Middleware]: Middleware[key] }) {
  return class Base implements Middleware {
    use(req: Request, res: Response, next: NextFunction): void {
      try {
        const schema: Joi.PartialSchemaMap = {};

        keys.forEach((key) => {
          schema[key] = Joi.string()
            .custom((value, helper) => (isValidObjectId(value) ? value : helper.message({ custom: 'Id field is not valid' })))
            .required();
        });

        const { error } = Joi.object(schema).validate(req.params, { abortEarly: false });

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
  };
}

export default IdParamValidation;
