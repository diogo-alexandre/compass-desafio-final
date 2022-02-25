import express, { Express } from 'express';

import Database from './database';
import Routes from './routes';
import Env from './utils/env.util';
import errorHandler from './middlewares/error-handle.middleware';
import notFoundPath from './middlewares/not-found-path.middleware';

import { IAppOptions } from './helpers/interfaces/app-options.interface';

class App {
  readonly express: Express;

  private constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.requestErrorHandler();
  }

  static async init(options: IAppOptions): Promise<Express> {
    const app = new App();

    Object.keys(options).forEach((key) => {
      Env.set(key.includes('_') ? key : `app_${key}`, options[key as keyof IAppOptions]);
    });

    await Database.init(options.db_uri);

    return app.express;
  }

  middlewares(): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }

  routes(): void {
    this.express.use('/api', Routes.handle());
  }

  requestErrorHandler(): void {
    this.express.use(errorHandler);
    this.express.use('*', notFoundPath);
  }
}

export default App;
