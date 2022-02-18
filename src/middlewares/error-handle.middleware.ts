import { ErrorRequestHandler } from 'express'

import { HttpError } from '../errors/http/http.error'
import { InternalServerError } from '../errors/http/internal-server.error'
import { EntityNotFound } from '../errors/entity-not-found.error'
import { NotFound } from '../errors/http/not-found-error'
import { BadRequest } from '../errors/http/bad-request.error'
import { InvalidCEP } from '../errors/invalid-cep.error'
import { InvalidCPF } from '../errors/invalid-cpf.error'
import { InvalidCNPJ } from '../errors/invalid-cnpj.error'
import { InvalidPasswordError } from '../errors/invalid-password.error'
import { Unauthorized } from '../errors/http/unauthorized.error'
import { DuplicatedEntry } from '../errors/duplicated-entry.error'
import { Conflict } from '../errors/http/conflict.error'
import { Log } from '../utils/log.helper'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let responseError: HttpError

  if (
    err instanceof InvalidCEP ||
    err instanceof InvalidCPF ||
    err instanceof InvalidCNPJ
  ) {
    responseError = new BadRequest(err.message)
  } else if (err instanceof EntityNotFound) {
    responseError = new NotFound(err.message)
  } else if (err instanceof InvalidPasswordError) {
    responseError = new Unauthorized(err.message)
  } else if (err instanceof DuplicatedEntry) {
    responseError = new Conflict(err.message)
  } else {
    responseError = new InternalServerError('Unexpect internal error occurred')
    Log.error(responseError)
  }

  return res
    .status(responseError.statusCode)
    .json(responseError.details)
    .end()
}
