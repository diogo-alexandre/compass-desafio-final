import HttpCode from '../../constants/http-code.constant';
import HttpError from './http.error';

import { IMessage } from '../../helpers/interfaces/message.interface';

class Conflict extends HttpError {
  constructor(msg: string | IMessage[]) {
    super(HttpCode.CONFLICT, msg, 'Conflict');
  }
}

export default Conflict;
