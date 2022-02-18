import { HttpCode } from '../../constants/http-code.contant'
import { IMessage } from '../../helpers/interfaces/message.interface'
import { HttpError } from './http.error'

export class NotFound extends HttpError {
  constructor (msg: string | IMessage[]) {
    super(HttpCode.NOT_FOUND, msg, 'Not Found')
  }
}
