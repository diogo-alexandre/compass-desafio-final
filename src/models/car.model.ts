import { Model, model, Schema } from 'mongoose'
import { ICar } from '../helpers/interfaces/car.interface'

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
}, { versionKey: false })

export const Car: Model<ICar> = model('Car', CarSchema)
