export interface IAcessorio {
  _id: string
  description: string
}

export interface IAcessorioDTO extends Omit<IAcessorio, '_id'> {
  _id?: string
}
