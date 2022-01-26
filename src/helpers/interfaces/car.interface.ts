export interface ICar {
  _id?: string
  modelo: string
  cor: string
  ano: string
  acessorios: Array<{ descricao: string }>
  quantidadePassageiros: number
}
