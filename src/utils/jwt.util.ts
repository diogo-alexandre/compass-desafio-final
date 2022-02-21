import jwt from 'jsonwebtoken';

import TokenType from '../constants/auth.constant';
import { IAuthResponse } from '../helpers/interfaces/auth.interface';
import Env from './env.util';

const JWT = {
  generate(payload: object, expiresIn: number = 86400): IAuthResponse {
    const secret = Env.get<string>('SECRET');

    const token = jwt.sign(payload, secret, { expiresIn });

    return {
      access_token: token,
      type: TokenType.BEARER,
      expires_in: expiresIn,
    };
  },
  verify(token: string): string | jwt.JwtPayload {
    const secret = Env.get<string>('SECRET');

    return jwt.verify(token, secret);
  },
};

export default JWT;
