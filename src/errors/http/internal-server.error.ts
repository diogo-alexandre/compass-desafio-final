import { HttpCode } from '../../constants/http-code.contant'
import { HttpError } from './http.error'

export class InternalServerError extends HttpError {
  constructor (msg: string) {
    super(HttpCode.INTERNAL_SERVER_ERROR, msg, 'Internal Server Error')
  }
}
