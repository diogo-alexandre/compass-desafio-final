import { HttpCode } from '../../constants/http-code.contant'
import { HttpError } from './http.error'

export class Conflict extends HttpError {
  constructor (msg: string) {
    super(HttpCode.CONFLICT, msg)

    this.name = 'Conflict'
  }
}
