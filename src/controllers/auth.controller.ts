import { Inject } from '@decorators/di';
import { NextFunction, Request } from 'express';
import { Controller, Post } from '@decorators/express';

import AuthService from '../services/auth.service';
import HttpCode from '../constants/http-code.constant';
import AuthLoginValidator from '../validators/auth/auth-login.validator';

import { Response } from '../helpers/interfaces/response.interface';
import { IAuthService } from '../services/interfaces/auth-service.interface';

@Controller('/authenticate')
class AuthController {
  private readonly authService: IAuthService;

  constructor(@Inject(AuthService) authService: IAuthService) {
    this.authService = authService;
  }

  @Post('/', [AuthLoginValidator])
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, senha } = req.body;
      const result = await this.authService.login(email, senha);

      return res.status(HttpCode.OK).json(result).end();
    } catch (err) {
      return next(err);
    }
  }
}

export default AuthController;
