import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Inject, Injectable } from '@decorators/di'

import { PeopleService } from './people.service'
import { IAuthService } from './interfaces/auth-service.interface'
import { IAuthResponse } from '../helpers/interfaces/auth.interface'
import { IPeopleService } from './interfaces/people-service.interface'
import { InvalidPasswordError } from '../errors/invalid-password.error'
import { env } from '../utils/env.util'
import { RuntimeError } from '../errors/runtime.error'
import { TokenType } from '../constants/auth.constant'

@Injectable()
export class AuthService implements IAuthService {
  constructor (
    @Inject(PeopleService)
    private readonly peopleService: IPeopleService
  ) { }

  async login (email: string, password: string): Promise<IAuthResponse> {
    const secret = env('SECRET')

    if (secret === undefined) {
      throw new RuntimeError('env "SECRET" was not providaded.')
    }

    const { habilitado, senha } = await this.peopleService.findByEmail(email)

    if (!await bcryptjs.compare(password, senha)) {
      throw new InvalidPasswordError('Passwords are not the same')
    }

    const expiresIn = 1
    const token = jwt.sign({ email, habilitado }, secret, { expiresIn })

    return {
      access_token: token,
      type: TokenType.BEARER,
      expires_in: expiresIn
    }
  }
}
