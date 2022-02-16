import { IAdress, IAdressDTO } from './adress.interface'

export interface IRental {
  _id: string
  nome: string
  cnpj: string
  atividades: string
  endereco: Array<{ isFilial: boolean } & IAdress>
}

export interface IRentalDTO extends Omit<Omit<IRental, 'endereco'>, '_id'> {
  _id?: string
  endereco: Array<{ isFilial: boolean } & IAdressDTO>
}
