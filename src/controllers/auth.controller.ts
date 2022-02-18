import { Inject } from '@decorators/di'
import { Controller, Post } from '@decorators/express'
import { NextFunction, Request } from 'express'
import { HttpCode } from '../constants/http-code.contant'
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
      return next(err)
    }
  }
}
