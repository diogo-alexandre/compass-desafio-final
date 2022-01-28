import { HttpCode } from '../../constants/http-code.contant'
import { HttpError } from './http.error'

export class BadRequest extends HttpError {
  constructor (msg: string) {
    super(HttpCode.BAD_REQUEST, msg)

    this.name = 'Bad Request'
  }
}
