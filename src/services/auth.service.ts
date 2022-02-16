import bcryptjs from 'bcryptjs'
import { Inject, Injectable } from '@decorators/di'

import { PeopleService } from './people.service'
import { IAuthService } from './interfaces/auth-service.interface'
import { IAuthResponse } from '../helpers/interfaces/auth.interface'
import { IPeopleService } from './interfaces/people-service.interface'
import { InvalidPasswordError } from '../errors/invalid-password.error'
import { JWT } from '../utils/jwt.util'

@Injectable()
export class AuthService implements IAuthService {
  constructor (
    @Inject(PeopleService)
    private readonly peopleService: IPeopleService
  ) { }

  async login (email: string, password: string): Promise<IAuthResponse> {
    const { habilitado, senha } = await this.peopleService.findByEmail(email)

    if (!await bcryptjs.compare(password, senha)) {
      throw new InvalidPasswordError('Passwords are not the same')
    }

    return await JWT.generate({ email, habilitado })
  }
}
