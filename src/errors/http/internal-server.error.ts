import HttpCode from '../../constants/http-code.constant';
import HttpError from './http.error';

class InternalServerError extends HttpError {
  constructor(msg: string) {
    super(HttpCode.INTERNAL_SERVER_ERROR, msg, 'Internal Server Error');
  }
}

export default InternalServerError;
