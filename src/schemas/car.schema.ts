import { model, Schema } from 'mongoose'
import mongoosePagination from 'mongoose-paginate-v2'

import { ICar } from '../helpers/interfaces/entities/car.interface'
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
    type: Date,
    required: true
  },
  quantidadePassageiros: {
    type: String,
    required: true
  },
  acessorios: {
    type: Array,
    required: true
  }
}, {
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.ano = String(ret.ano.getFullYear())
    }
  }
})

CarSchema.plugin(mongoosePagination)

export const Car = model<ICar>('Car', CarSchema) as IPaginateModel<ICar>
