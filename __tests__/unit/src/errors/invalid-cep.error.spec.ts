import InvalidCEP from '../../../../src/errors/invalid-cep.error';

describe('Unit test invalid cep', () => {
  it('should throw invalid cep', () => {
    const exec = () => {
      throw new InvalidCEP();
    };

    expect(exec).toThrow(InvalidCEP);
  });
});
