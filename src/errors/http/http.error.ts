import HttpCode from '../../constants/http-code.constant';

import { IMessage } from '../../helpers/interfaces/message.interface';

abstract class HttpError extends Error {
  public readonly statusCode: HttpCode;

  public readonly details: IMessage | IMessage[];

  constructor(statusCode: HttpCode, msg: string | IMessage[], name: string) {
    super(name);

    this.name = name;
    this.statusCode = statusCode;

    if (Array.isArray(msg)) {
      if (msg.length === 1) {
        const [detail] = msg;
        this.details = detail;
      } else this.details = msg;
    } else {
      this.details = {
        name: this.name,
        description: msg,
      };
    }
  }
}

export default HttpError;
