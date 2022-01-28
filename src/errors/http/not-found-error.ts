import { HttpCode } from '../../constants/http-code.contant'
import { HttpError } from './http.error'

export class NotFound extends HttpError {
  constructor (msg: string) {
    super(HttpCode.NOT_FOUND, msg)

    this.name = 'Not Found'
  }
}
