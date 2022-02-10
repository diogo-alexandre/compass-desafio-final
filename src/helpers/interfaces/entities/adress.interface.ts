export interface IAdress {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  number: string
  complemento?: string
}

export interface IAdressDTO {
  cep: string
  logradouro?: string
  bairro?: string
  localidade?: string
  number: string
  complemento?: string
}
