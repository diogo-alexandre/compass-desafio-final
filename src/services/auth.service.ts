import bcryptjs from 'bcryptjs';
import { Inject, Injectable } from '@decorators/di';

import PeopleService from './people.service';
import JWT from '../utils/jwt.util';

import { IAuthService } from './interfaces/auth-service.interface';
import { IAuthResponse } from '../helpers/interfaces/auth.interface';
import { IPeopleService } from './interfaces/people-service.interface';
import InvalidPasswordError from '../errors/invalid-password.error';

@Injectable()
class AuthService implements IAuthService {
  private readonly peopleService: IPeopleService;

  constructor(@Inject(PeopleService) peopleService: IPeopleService) {
    this.peopleService = peopleService;
  }

  async login(email: string, password: string): Promise<IAuthResponse> {
    const { habilitado, senha } = await this.peopleService.findByEmail(email);

    if (!await bcryptjs.compare(password, senha)) {
      throw new InvalidPasswordError('Passwords are not the same');
    }

    return JWT.generate({ email, habilitado });
  }
}

export default AuthService;
