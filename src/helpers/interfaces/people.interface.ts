export interface IPeople {
  nome: string
  cpf: string
  data_nascimento: string
  email: string
  senha: string
  habilitado: boolean
}

export interface IPeopleDTO extends Omit<IPeople, 'habilitado'> {
  habilitado: string
}
