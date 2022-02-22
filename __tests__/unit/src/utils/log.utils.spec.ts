import Env from '../../../../src/utils/env.util';
import Log from '../../../../src/utils/log.util';

describe('Test Log', () => {
  beforeEach(async () => {
    Env.set('APP_LOG', true);
  });

  it('should no console Log when APP_LOG equals false', async () => {
    Env.set('APP_LOG', false);

    const consoleSpy = jest.spyOn(console, 'log');

    Log.info('Hello World');
    Log.error(new Error());

    expect(consoleSpy).not.toBeCalled();
  });

  it('should console log info with correctly param', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    Log.info('Hello World');

    expect(consoleSpy).toBeCalledWith(
      expect.stringMatching(/Hello World/),
    );
  });

  it('should console log error with correctly param', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    Log.error(new Error());

    expect(consoleSpy).toBeCalledWith(
      expect.stringMatching(/Error/),
    );
  });
});
