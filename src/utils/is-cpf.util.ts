function calc (numbers: number[], acum = 0): number {
  const f = (previus: number, current: number): number => {
    const multi = current * acum
    acum++
    return previus + multi
  }

  return numbers.reduce(f, 0)
}

export function isCPF (cpf: string): boolean {
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
}
