import { HttpCode } from '../../constants/http-code.contant'
import { IMessage } from '../../helpers/interfaces/message.interface'

export abstract class HttpError extends Error {
  public readonly statusCode: HttpCode
  public readonly details: IMessage | IMessage[]

  constructor (statusCode: HttpCode, msg: string | IMessage[], name: string) {
    super(name)

    this.name = name
    this.statusCode = statusCode

    if (Array.isArray(msg)) {
      if (msg.length === 1) this.details = msg[0]
      else this.details = msg
    } else {
      this.details = {
        name: this.name,
        description: msg
      }
    }
  }
}
