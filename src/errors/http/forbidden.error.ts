import HttpCode from '../../constants/http-code.constant';
import HttpError from './http.error';

import { IMessage } from '../../helpers/interfaces/message.interface';

class Forbidden extends HttpError {
  constructor(msg: string | IMessage[]) {
    super(HttpCode.FORBIDDEN, msg, 'Forbidden');
  }
}

export default Forbidden;
