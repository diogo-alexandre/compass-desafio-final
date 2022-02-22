import mongoose from 'mongoose';
import supertest from 'supertest';

import App from '../../../src/App';
import RuntimeError from '../../../src/errors/runtime.error';

describe('Test APP', () => {
  it('app should return Express instance on init', async () => {
    const app = await App.init({ log: false });

    expect(app).toHaveProperty('listen');

    mongoose.connection.close();
  });

  it('app should throw 404 when page not found', async () => {
    const app = await App.init({ log: false });
    const res = await supertest(app).get('/not-found-page');

    expect(res.body.name).toBe('Not Found');
    expect(res.body).toHaveProperty('description');

    mongoose.connection.close();
  });

  it('should throw Runtime Error on set undefined app options vars', async () => {
    try {
      const options = jest.fn().mockReturnValue({ log: undefined }) as any;
      await App.init(options());
    } catch (err) {
      expect(err).toBeInstanceOf(RuntimeError);
    }
  });
});
