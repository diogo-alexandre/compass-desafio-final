export interface ICar {
  _id?: string
  modelo: string
  cor: string
  ano: Date
  acessorios: Array<{ descricao: string }>
  quantidadePassageiros: number
}

export interface ICarDTO extends Omit<ICar, 'ano'> {
  ano: string
}
