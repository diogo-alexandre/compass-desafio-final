import { model, Schema } from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';

import { ICar } from '../helpers/interfaces/entities/car.interface';
import { IPaginateModel } from '../helpers/interfaces/paginate.interface';

const CarSchema = new Schema({
  modelo: {
    type: String,
    required: true,
  },
  cor: {
    type: String,
    required: true,
  },
  ano: {
    type: Date,
    required: true,
    get: (value: Date) => value.getFullYear().toString(),
  },
  quantidadePassageiros: {
    type: String,
    required: true,
  },
  acessorios: [{
    descricao: {
      type: String,
      required: true,
    },
  }],
}, {
  id: false,
  versionKey: false,
  toJSON: { getters: true },
  toObject: { getters: true },
});

CarSchema.plugin(mongoosePagination);

const Car = model<ICar>('Car', CarSchema) as IPaginateModel<ICar>;

export default Car;
