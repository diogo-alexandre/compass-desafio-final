import { Schema } from 'mongoose';

import Model from '../helpers/model.helper';
import { ICar } from '../helpers/interfaces/entities/car.interface';

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

const Car = Model<ICar>('Car', CarSchema);

export default Car;
