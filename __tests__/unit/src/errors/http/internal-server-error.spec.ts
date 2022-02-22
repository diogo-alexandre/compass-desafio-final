import InternalServerError from '../../../../../src/errors/http/internal-server.error';

describe('Unit test invalid internal server error', () => {
  it('should throw invalid internal server error', () => {
    const exec = () => {
      throw new InternalServerError('Unexpected Error');
    };

    expect(exec).toThrow(InternalServerError);
  });
});
