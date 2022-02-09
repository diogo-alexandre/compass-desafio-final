export interface IAcessorio {
  _id: string
  descricao: string
}

export interface IAcessorioDTO extends Omit<IAcessorio, '_id'> {
  _id?: string
}
