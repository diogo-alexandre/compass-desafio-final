import { Inject } from '@decorators/di'
import { Controller, Post } from '@decorators/express'
import { NextFunction, Request } from 'express'
import { HttpCode } from '../constants/http-code.contant'
import { EntityNotFound } from '../errors/entity-not-found.error'
import { NotFound } from '../errors/http/not-found-error'
import { Unauthorized } from '../errors/http/unauthorized.error'
import { InvalidPasswordError } from '../errors/invalid-password.error'
import { Response } from '../helpers/interfaces/response.interface'
import { AuthService } from '../services/auth.service'
import { IAuthService } from '../services/interfaces/auth-service.interface'
import { AuthLoginValidator } from '../validators/auth/auth-login.validator'

@Controller('/authenticate')
export class AuthController {
  constructor (
    @Inject(AuthService)
    private readonly authService: IAuthService
  ) { }

  @Post('/', [AuthLoginValidator])
  async handle (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, senha } = req.body
      const result = await this.authService.login(email, senha)

      return res.status(HttpCode.OK).json(result).end()
    } catch (err) {
      let localError = err

      if (err instanceof EntityNotFound) {
        localError = new NotFound(err.message)
      } else if (err instanceof InvalidPasswordError) {
        localError = new Unauthorized(err.message)
      }

      return next(localError)
    }
  }
}
