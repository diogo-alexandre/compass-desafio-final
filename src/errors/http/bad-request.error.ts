import HttpCode from '../../constants/http-code.constant';
import HttpError from './http.error';

import { IMessage } from '../../helpers/interfaces/message.interface';

class BadRequest extends HttpError {
  constructor(msg: string | IMessage[]) {
    super(HttpCode.BAD_REQUEST, msg, 'Bad Request');
  }
}

export default BadRequest;
