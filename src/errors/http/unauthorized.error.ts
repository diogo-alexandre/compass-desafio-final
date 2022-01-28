import { HttpCode } from '../../constants/http-code.contant'
import { HttpError } from './http.error'

export class UnauthorizedError extends HttpError {
  constructor (msg: string) {
    super(HttpCode.UNAUTHORIZED, msg)

    this.name = 'Unauthorized Error'
  }
}
