import mongoose from 'mongoose';

import App from '../../../src/App';
import RuntimeError from '../../../src/errors/runtime.error';

describe('Test APP', () => {
  it('app should return Express instance on init', async () => {
    const app = await App.init({ log: false });

    expect(app).toHaveProperty('listen');

    mongoose.connection.close();
  });

  it('should throw Runtime Error on set undefined app options vars', async () => {
    try {
      await App.init({
        log: undefined,
      });
    } catch (err) {
      expect(err).toBeInstanceOf(RuntimeError);
    }
  });
});
