import { Model, model, Schema } from 'mongoose'
import mongoosePagination from 'mongoose-paginate-v2'

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
    type: String,
    required: true
  },
  quantidadePassageiros: {
    type: String,
    required: true
  },
  acessorios: {
    type: Array
  }
}, { versionKey: false })

CarSchema.plugin(mongoosePagination)

export const Car: Model<ICar> = model<ICar>('Car', CarSchema)
