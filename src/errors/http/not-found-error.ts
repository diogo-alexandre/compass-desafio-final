import HttpCode from '../../constants/http-code.constant';
import HttpError from './http.error';

import { IMessage } from '../../helpers/interfaces/message.interface';

class NotFound extends HttpError {
  constructor(msg: string | IMessage[]) {
    super(HttpCode.NOT_FOUND, msg, 'Not Found');
  }
}

export default NotFound;
