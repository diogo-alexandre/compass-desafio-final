export type ICPF = (cpf: string) => {
  toStringPlain: () => string
  toStringWithDots: () => string
  isValid: () => boolean
}

export type ICNPJ = (cnpj: string) => {
  toStringPlain: () => string
  toStringWithDots: () => string
  isValid: () => boolean
}
