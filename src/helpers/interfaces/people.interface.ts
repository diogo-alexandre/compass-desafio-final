export interface IPeople {
  nome: string
  cpf: string
  data_nascimento: Date
  email: string
  senha: string
  habilitado: boolean
}

export interface IPeopleDTO extends Omit<IPeople, 'data_nascimento' | 'habilitado'> {
  data_nascimento: string
  habilitado: string
}
