import { Request, NextFunction } from 'express';
import { Middleware } from '@decorators/express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import JWT from '../utils/jwt.util';
import BadRequest from '../errors/http/bad-request.error';
import Unauthorized from '../errors/http/unauthorized.error';

import { Response } from '../helpers/interfaces/response.interface';

class Authenticate implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const auth = req.headers.authorization;

      if (auth === undefined) {
        res.setHeader('WWW-Authenticate', 'Bearer');
        throw new Unauthorized('Bearer Token is necessary to access this route');
      }

      const [type, token] = auth.split(' ');

      if (type.toLocaleLowerCase() !== 'bearer') {
        throw new BadRequest('Authorization type should be "bearer"');
      }

      JWT.verify(token);

      return next();
    } catch (err) {
      let localError = err;

      if (err instanceof TokenExpiredError) {
        localError = new Unauthorized('The access token provided is expired');
      } else if (err instanceof JsonWebTokenError) {
        localError = new BadRequest('The request signature is invalid');
      }

      return next(localError);
    }
  }
}

export default Authenticate;
