import { ErrorRequestHandler } from 'express'
import { HttpCode } from '../constants/http-code.contant'
import { HttpError } from '../errors/http/http.error'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: HttpCode = HttpCode.INTERNAL_SERVER_ERROR

  if (err instanceof HttpError) {
    statusCode = err.statusCode
  }

  if (statusCode === HttpCode.INTERNAL_SERVER_ERROR) console.error(err)

  return res.status(statusCode).end()
}
