import { IAcessorio, IAcessorioDTO } from './acessorio.interface';

export interface ICar {
  _id: string
  modelo: string
  cor: string
  ano: string
  acessorios: IAcessorio[]
  quantidadePassageiros: number
}

export interface ICarDTO extends Omit<ICar, '_id' | 'acessorios' > {
  _id?: string
  acessorios: IAcessorioDTO[]
}
