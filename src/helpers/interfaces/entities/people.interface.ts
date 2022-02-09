import { Habilitado } from '../../../constants/people.constant'

export interface IPeople {
  _id: string
  nome: string
  cpf: string
  data_nascimento: Date
  email: string
  senha: string
  habilitado: boolean
}

export interface IPeopleDTO extends Omit<IPeople, 'data_nascimento' | 'habilitado'> {
  data_nascimento: Date
  habilitado: Habilitado
}
