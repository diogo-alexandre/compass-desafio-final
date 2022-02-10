export type ICPF = (cpf: string) => {
  toStringOnlyNumbers: () => string
  toStringWithDots: () => string
  isValid: () => boolean
}
