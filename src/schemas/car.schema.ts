import { model, Schema } from 'mongoose'
import mongoosePagination from 'mongoose-paginate-v2'

import { ICar } from '../helpers/interfaces/car.interface'
import { IPaginateModel } from '../helpers/interfaces/paginate.interface'

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

export const Car = model<ICar>('Car', CarSchema) as IPaginateModel<ICar>
