import { HttpCode } from '../../constants/http-code.contant'
import { IMessage } from '../../helpers/interfaces/message.interface'

export abstract class HttpError extends Error {
  public readonly statusCode: HttpCode
  public readonly details: IMessage[]

  constructor (statusCode: HttpCode, msg: string, details?: IMessage[]) {
    super(msg)

    this.name = 'Http Error'
    this.statusCode = statusCode
    this.details = details ?? [{ message: msg }]
  }
}
