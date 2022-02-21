import 'dotenv/config';
import RuntimeError from '../errors/runtime.error';

const variables: any = {};

class Env {
  static get <T>(key: string): T | string {
    key = key.toUpperCase();

    const value = variables[key] ?? process.env[key];

    if (value === undefined) {
      throw new RuntimeError(`env "${key}" was not defined`);
    }

    return value;
  }

  static set <T>(key: string, value: T): void {
    key = key.toUpperCase();
    variables[key] = value;
  }
}

export default Env;
