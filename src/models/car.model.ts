import { Model, model, Schema } from 'mongoose'

export interface ICar {
  modelo: string
  cor: string
  ano: string
  acessorios: Array<{ descricao: string }>
  quantidadePassageiros: number
}

const CarSchema = new Schema({
  modelo: {
    type: String,
    required: true
  },
  cor: {
    type: String,
    required: true
  },
  ano: {
    type: Number,
    required: true
  },
  quantidadePassageiros: {
    type: Number,
    required: true
  },
  acessorios: {
    type: Array
  }
})

export const Car: Model<ICar> = model('Car', CarSchema)
