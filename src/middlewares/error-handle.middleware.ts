import { ErrorRequestHandler } from 'express';

import DuplicatedEntry from '../errors/duplicated-entry.error';
import EntityNotFound from '../errors/entity-not-found.error';
import BadRequest from '../errors/http/bad-request.error';
import Conflict from '../errors/http/conflict.error';
import HttpError from '../errors/http/http.error';
import InternalServerError from '../errors/http/internal-server.error';
import NotFound from '../errors/http/not-found-error';
import Unauthorized from '../errors/http/unauthorized.error';
import InvalidCEP from '../errors/invalid-cep.error';
import InvalidCNPJ from '../errors/invalid-cnpj.error';
import InvalidCPF from '../errors/invalid-cpf.error';
import InvalidPasswordError from '../errors/invalid-password.error';
import Log from '../utils/log.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let responseError: HttpError;

  if (err instanceof HttpError) {
    responseError = err;
  } else if (err instanceof EntityNotFound) {
    responseError = new NotFound(err.message);
  } else if (err instanceof InvalidPasswordError) {
    responseError = new Unauthorized(err.message);
  } else if (err instanceof DuplicatedEntry) {
    responseError = new Conflict(err.message);
  } else if (
    err instanceof InvalidCEP
    || err instanceof InvalidCPF
    || err instanceof InvalidCNPJ
  ) {
    responseError = new BadRequest(err.message);
  } else {
    Log.error(err);
    responseError = new InternalServerError('Unexpect internal error occurred');
  }

  return res
    .status(responseError.statusCode)
    .json(responseError.details)
    .end();
};

export default errorHandler;
