import { model, Schema } from 'mongoose'
import mongoosePagination from 'mongoose-paginate-v2'
import { CarConstant } from '../constants/car.constant'

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
    min: CarConstant.MIN_YEAR,
    max: CarConstant.MAX_YEAR,
    required: true,
    get: (value: Date): string => String(value.getFullYear())
  },
  quantidadePassageiros: {
    type: String,
    required: true
  },
  acessorios: [{
    descricao: {
      type: String,
      required: true
    }
  }]
}, { versionKey: false })

CarSchema.plugin(mongoosePagination)

export const Car = model<ICar>('Car', CarSchema) as IPaginateModel<ICar>
