export interface IAdress {
  cep: string
  logradouro: string
  bairro: string
  uf: string
  localidade: string
  number: string
  complemento?: string
}

export interface IAdressDTO {
  cep: string
  logradouro?: string
  bairro?: string
  uf?: string
  localidade?: string
  number: string
  complemento?: string
}
