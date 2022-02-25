import errorHandler from '../../../../src/middlewares/error-handle.middleware';
import Env from '../../../../src/utils/env.util';

describe('Unit test error-handler.middleware', () => {
  const req = {} as any;
  const next = () => {};

  let res: any;

  beforeAll(() => {
    Env.set('APP_LOG', false);

    res = function (this: any) {
      let response: any;

      this.status = () => this;
      this.json = (body: any) => {
        response = body;
        return this;
      };
      this.end = () => response;

      return this;
    };
  });

  it('should throw internal server error when unexpected error ocurres', () => {
    // eslint-disable-next-line new-cap
    const response: any = errorHandler(new Error(), req, new res(), next);

    expect(response.name).toBe('Internal Server Error');
    expect(response).toHaveProperty('description');
  });
});
