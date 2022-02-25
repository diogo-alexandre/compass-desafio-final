import mongoose from 'mongoose';
import Env from '../utils/env.util';
import Log from '../utils/log.util';

class Database {
  static async init(uri: string = Env.get<string>('DB_URI')): Promise<typeof mongoose> {
    Log.info(`Trying connection with mongo. Using uri: ${this.hiddeUri(uri)}`);

    const conn = await mongoose.connect(uri);
    return conn;
  }

  private static hiddeUri(uri: string): string {
    const [drive, rest] = uri.split('://');

    if (uri.includes('@')) {
      const host = rest.split('@')[1];
      return `${drive}://***:***@${host}`;
    }

    return `${drive}://${rest}`;
  }
}

export default Database;
