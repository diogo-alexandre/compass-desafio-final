import { ErrorRequestHandler } from 'express'

import { Log } from '../utils/log.helper'
import { HttpError } from '../errors/http/http.error'
import { HttpCode } from '../constants/http-code.contant'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let result: HttpError = err

  if (err instanceof HttpError) result = err

  if (result.statusCode === HttpCode.INTERNAL_SERVER_ERROR) Log.error(err)

  return res.status(result.statusCode).json(result.details).end()
}
