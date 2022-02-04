import { HttpCode } from '../../constants/http-code.contant'
import { IMessage } from '../../helpers/interfaces/message.interface'
import { HttpError } from './http.error'

export class BadRequest extends HttpError {
  constructor (details?: IMessage[], msg: string = 'Server cannot understand the client request') {
    super(HttpCode.BAD_REQUEST, msg, details)

    this.name = 'Bad Request'
  }
}
