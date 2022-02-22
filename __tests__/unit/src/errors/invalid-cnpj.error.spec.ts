import InvalidCNPJ from '../../../../src/errors/invalid-cnpj.error';

describe('Unit test invalid cnpj', () => {
  it('should throw invalid cnpj', () => {
    const exec = () => {
      throw new InvalidCNPJ();
    };

    expect(exec).toThrow(InvalidCNPJ);
  });
});
