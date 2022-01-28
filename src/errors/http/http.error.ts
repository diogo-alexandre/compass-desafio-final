import { HttpCode } from '../../constants/http-code.contant'

export abstract class HttpError extends Error {
  public readonly statusCode: HttpCode

  constructor (statusCode: HttpCode, msg: string) {
    super(msg)

    this.statusCode = statusCode
    this.name = 'Http Error'
  }
}
