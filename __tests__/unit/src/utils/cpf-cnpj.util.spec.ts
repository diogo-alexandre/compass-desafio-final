import { CNPJ, CPF } from '../../../../src/utils/cpf-cnpj.util';

describe('Unit test cpf-cnpj.util', () => {
  it('shoud throw invalid cpf when pass cpf with repetead digits', () => {
    expect(CPF('11111111111').isValid()).toBeFalsy();
  });

  it('shoud throw invalid cpf when pass cpf invalid', () => {
    expect(CPF('12345678999').isValid()).toBeFalsy();
    expect(CPF('55487582844').isValid()).toBeFalsy();
  });

  it('Should format cpf to string wihtout dots', () => {
    const cpf = CPF('123.456.789-09').toStringPlain();
    expect(cpf).toBe('12345678909');
  });

  it('Should format cpf to string with dots', () => {
    const cpf = CPF('12345678909').toStringWithDots();
    expect(cpf).toBe('123.456.789-09');
  });

  it('shoud throw invalid cpf when pass cnpj invalid', () => {
    expect(CNPJ('71812431000110').isValid()).toBeFalsy();
    expect(CNPJ('17198890000199').isValid()).toBeFalsy();
  });

  it('Should format cnpj to string wihtout dots', () => {
    const cnpj = CNPJ('75.904.266/0001-68').toStringPlain();
    expect(cnpj).toBe('75904266000168');
  });

  it('Should format cnpj to string with dots', () => {
    const cnpj = CNPJ('47162624000179').toStringWithDots();
    expect(cnpj).toBe('47.162.624/0001-79');
  });
});
