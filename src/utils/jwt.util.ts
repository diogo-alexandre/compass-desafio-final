import jwt from 'jsonwebtoken'

import { env } from './env.util'
import { RuntimeError } from '../errors/runtime.error'
import { IAuthResponse } from '../helpers/interfaces/auth.interface'
import { TokenType } from '../constants/auth.constant'

export const JWT = {
  async generate (payload: object, expiresIn: number = 86400): Promise<IAuthResponse> {
    const secret = env('SECRET')

    if (secret === undefined) {
      throw new RuntimeError('env "SECRET" was not providaded.')
    }

    const token = jwt.sign(payload, secret, { expiresIn })

    return {
      access_token: token,
      type: TokenType.BEARER,
      expires_in: expiresIn
    }
  }
}
