import { model, Schema } from 'mongoose'
import mongoosePagination from 'mongoose-paginate-v2'

import { ICarDTO } from '../helpers/interfaces/car.interface'
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
    type: Array
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

export const Car = model<ICarDTO>('Car', CarSchema) as IPaginateModel<ICarDTO>
