import { IAdress, IAdressDTO } from './adress.interface'

export interface IRental {
  _id: string
  nome: string
  cnpj: string
  atividades: string
  endereco: Array<{ isFilial: boolean } & IAdress>
}

export interface IRentalDTO extends Omit<IRental, 'endereco'> {
  endereco: Array<{ isFilial: boolean } & IAdressDTO>
}
