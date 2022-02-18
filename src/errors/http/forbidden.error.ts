import { HttpCode } from '../../constants/http-code.contant'
import { IMessage } from '../../helpers/interfaces/message.interface'
import { HttpError } from './http.error'

export class Forbidden extends HttpError {
  constructor (msg: string | IMessage[]) {
    super(HttpCode.FORBIDDEN, msg, 'Forbidden')
  }
}
