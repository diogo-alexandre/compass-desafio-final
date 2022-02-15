import JWT, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Middleware } from '@decorators/express'
import { Request, NextFunction } from 'express'

import { Response } from '../helpers/interfaces/response.interface'
import { env } from '../utils/env.util'
import { RuntimeError } from '../errors/runtime.error'
import { HttpCode } from '../constants/http-code.contant'
import { BadRequest } from '../errors/http/bad-request.error'
import { Unauthorized } from '../errors/http/unauthorized.error'

export class Authenticate implements Middleware {
  use (req: Request, res: Response, next: NextFunction): void {
    try {
      const auth = req.headers.authorization

      if (auth === undefined) {
        return res.status(HttpCode.FORBIDDEN).end()
      }

      const [, token] = auth.split(' ')
      const secret = env('SECRET')

      if (secret === undefined) {
        throw new RuntimeError('env "SECRET" was not providaded.')
      }

      JWT.verify(token, secret)

      return next()
    } catch (err) {
      let localError

      if (err instanceof TokenExpiredError) {
        localError = new Unauthorized('The access token provided is expired')
      } else if (err instanceof JsonWebTokenError) {
        localError = new BadRequest([], 'The request signature is invalid')
      }

      console.log(err)

      return next(localError)
    }
  }
}
