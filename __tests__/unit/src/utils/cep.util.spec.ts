import CEP from '../../../../src/utils/cep.util';

describe('Unit test for cep.util', () => {
  it('Should format cep without slash', () => {
    expect(CEP('00000-000').toStringPlain()).toBe('00000000');
  });
});
