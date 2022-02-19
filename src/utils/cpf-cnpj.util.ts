import InvalidCNPJ from '../errors/invalid-cnpj.error';
import InvalidCPF from '../errors/invalid-cpf.error';
import { ICNPJ, ICPF } from '../helpers/interfaces/cpf.interface';

function accum(numbers: string, start: number, max: number = start, min: number = 0): number {
  return numbers.split('').map(Number).reduce((prev, curr) => {
    const rest = start % (max + 1);

    if (start === min) {
      start = max + 1;
    }

    const result = prev + curr * rest;
    start -= 1;

    return result;
  }, 0);
}

export const CPF: ICPF = (cpf: string) => {
  const regex = /^([0-9]{3})[.]?([0-9]{3})[.]?([0-9]{3})[-]?([0-9]{2})$/;

  if (!regex.test(cpf)) {
    throw new InvalidCPF();
  }

  const [numbers, digits] = cpf.replace(regex, '$1$2$3 $4').split(' ');

  return {
    toStringPlain: () => numbers + digits,
    toStringWithDots: () => `${numbers.split(/[0-9]{3}/).filter((e) => e !== '').join('.')}-${digits}`,
    isValid: () => {
      // Check if CPF only contains repeated values, exemplae: 11111111111
      if (/^(\d)\1+$/.test(numbers + digits)) {
        return false;
      }

      let d1 = (accum(numbers, 10) * 10) % 11;
      d1 = (d1 === 10 || d1 === 11) ? 0 : d1;

      if (d1.toString() !== digits[0]) return false;

      let d2 = (accum(`${numbers}${d1}`, 11) * 10) % 11;
      d2 = (d2 === 10 || d2 === 1) ? 0 : d2;

      if (d2.toString() !== digits[1]) return false;

      return true;
    },
  };
};

export const CNPJ: ICNPJ = (cnpj: string) => {
  const regex = /^([0-9]{2})[.]?([0-9]{3})[.]?([0-9]{3})[/]?([0-9]{4})[-]?([0-9]{2})$/;

  if (!regex.test(cnpj)) {
    throw new InvalidCNPJ(`CNPJ ${cnpj} is not valid`);
  }

  const [numbers, establishment, digits] = cnpj.replace(regex, '$1$2$3 $4 $5').split(' ');

  return {
    toStringPlain: () => numbers + establishment + digits,
    toStringWithDots: () => `${numbers.replace(/^([0-9]{2})([0-9]{3})([0-9]{3})$/, '$1.$2.$3')}/${establishment}-${digits}`,
    isValid: () => {
      let d1 = accum(numbers + establishment, 5, 9, 2) % 11;
      d1 = (d1 < 2) ? 0 : 11 - d1;

      if (d1.toString() !== digits[0]) return false;

      let d2 = accum(numbers + establishment + digits[0], 6, 9, 2) % 11;
      d2 = (d2 < 2) ? 0 : 11 - d2;

      if (d2.toString() !== digits[1]) return false;

      return true;
    },
  };
};

/*
function calc (numbers: number[], acum = 0): number {
  const f = (previus: number, current: number): number => {
    const multi = current * acum
    acum++
    return previus + multi
  }

  return numbers.reduce(f, 0)
}

export const CPF = {
  isCPF: (cpf: string): boolean => {
    const [numbers, digits] = [
      cpf.slice(-0, -2).split('').map(Number),
      cpf.slice(9, 11).split('')
    ]

    if (numbers.filter(n => n === numbers[0]).length === numbers.length) {
      return false
    }

    let r1 = calc(numbers, 1) % 11
    r1 = (r1 === 10) ? 0 : r1

    if (r1 !== Number(digits[0])) {
      return false
    }

    let r2 = calc([...numbers, r1], 0) % 11
    r2 = (r2 === 10) ? 0 : r2

    if (r2 !== Number(digits[1])) {
      return false
    }

    return true
  },
  format: (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
*/
