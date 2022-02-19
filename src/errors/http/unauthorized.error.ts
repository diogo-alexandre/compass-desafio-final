import HttpCode from '../../constants/http-code.constant';
import HttpError from './http.error';

import { IMessage } from '../../helpers/interfaces/message.interface';

class Unauthorized extends HttpError {
  constructor(msg: string | IMessage[]) {
    super(HttpCode.UNAUTHORIZED, msg, 'Unauthorized');
  }
}

export default Unauthorized;
