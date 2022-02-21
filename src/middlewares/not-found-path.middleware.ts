import { Request } from 'express';
import NotFound from '../errors/http/not-found-error';
import { Response } from '../helpers/interfaces/response.interface';

function notFoundPath(req: Request, res: Response): void {
  const { statusCode, details } = new NotFound(`Cannot get ${req.originalUrl}`);

  return res
    .status(statusCode)
    .json(details)
    .end();
}

export default notFoundPath;
