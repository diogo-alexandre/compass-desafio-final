import Env from './env.util';

enum Color {
  RESET = '\x1b[0m',
  BRIGHT = '\x1b[1m',

  RED = '\x1b[31m',
  CYAN = '\x1b[36m',
  BLACK = '\x1b[30m',

  RED_BRIGHT = '\x1b[31m\x1b[1m',

}

class Log {
  private static base(msg: string, type: string = '', color: Color = Color.RESET) {
    if (Env.get<boolean>('APP_LOG') === true) {
      const [now] = new Date().toTimeString().split(' ');
      const time = `${Color.BRIGHT}${Color.BLACK}${now}${Color.RESET}`;

      if (type === '') console.log(msg);
      else {
        type = `[${color}}${type.toLocaleUpperCase()}${Color.RESET}]`;
        console.log(`${type} ${time} ${msg}`);
      }
    }
  }

  public static info(msg: string) {
    this.base(msg, 'info', Color.CYAN);
  }

  public static error(err: Error) {
    this.base(`${err.name}: ${err.message}`, 'error', Color.RED_BRIGHT);

    if (err.stack !== undefined) {
      const stack = err.stack.split('\n');
      delete stack[0];

      this.base(stack.join('\n'));
    }
  }
}
/*

function base(type: string, color: Color | string, message: string): void {
  if (Env.get<boolean>('APP_LOG') === true) {
    const now = new Date().toTimeString().split(' ')[0];
    const time = `${Color.BRIGHT}${Color.BLACK}${now}${Color.RESET}`;

    type = `[${color}${type.toLocaleUpperCase()}${Color.RESET}]`;

    console.log(`${type} ${time} ${message}`);
  }
}

const Log = {
  info(message: string): void {
    base('info', Color.CYAN, message);
  },
  error(err: Error): void {
    base('error', Color.RED + Color.BRIGHT, `${err.name}: ${err.message}`);

    if (Env.get<boolean>('APP_LOG') === true && err.stack !== undefined) {
      const stack = err.stack.split('\n');
      delete stack[0];

      stack.forEach((line) => console.log(line));
    }
  },
};
*/

export default Log;
