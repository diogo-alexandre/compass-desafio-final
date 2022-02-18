import { HttpCode } from '../../constants/http-code.contant'
import { IMessage } from '../../helpers/interfaces/message.interface'
import { HttpError } from './http.error'

export class Unauthorized extends HttpError {
  constructor (msg: string | IMessage[]) {
    super(HttpCode.UNAUTHORIZED, msg, 'Unauthorized')
  }
}
