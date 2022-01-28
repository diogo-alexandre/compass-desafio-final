import { ErrorRequestHandler } from 'express'

import { Log } from '../helpers/log.helper'
import { HttpError } from '../errors/http/http.error'
import { HttpCode } from '../constants/http-code.contant'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const result = {
    name: 'Internal Server Error',
    statusCode: HttpCode.INTERNAL_SERVER_ERROR,
    details: [{ message: 'Unexpected Internal Error' }]
  }

  if (err instanceof HttpError) {
    result.name = err.name
    result.statusCode = err.statusCode
    result.details[0] = { message: err.message }
  }

  if (result.statusCode === HttpCode.INTERNAL_SERVER_ERROR) Log.error(err)

  return res.status(result.statusCode).json({
    name: result.name,
    details: result.details
  }).end()
}
