import Env from './env.util';

enum Color {
  RESET = '\x1b[0m',
  BRIGHT = '\x1b[1m',

  RED = '\x1b[31m',
  CYAN = '\x1b[36m',
  BLACK = '\x1b[30m'
}

function base(type: string, color: Color | string, message: string): void {
  const appLog = Env.get<boolean>('APP_LOG');

  if (appLog === true) {
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
    const stack = err.stack?.split('\n');

    base('error', Color.RED + Color.BRIGHT, `${err.name}: ${err.message}`);

    if (stack !== undefined) {
      delete stack[0];

      stack.forEach((line) => console.log(line));
    }
  },
};

export default Log;
