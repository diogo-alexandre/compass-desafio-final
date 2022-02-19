import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { IRental } from '../helpers/interfaces/entities/rental.interface';
import { IPaginateModel } from '../helpers/interfaces/paginate.interface';
import { CNPJ } from '../utils/cpf-cnpj.util';

const RentalSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    unique: true,
    required: true,
    set: (value: string) => CNPJ(value).toStringWithDots(),
  },
  atividades: {
    type: String,
    required: true,
  },
  endereco: [{
    cep: {
      type: String,
      required: true,
    },
    logradouro: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    uf: {
      type: String,
      required: true,
    },
    localidade: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
    },
    isFilial: {
      type: Boolean,
      required: true,
    },
  }],
}, {
  versionKey: false,
  toJSON: { getters: true },
  toObject: { getters: true },
});

RentalSchema.plugin(mongoosePaginate);

const Rental = model<IRental>('Rental', RentalSchema) as IPaginateModel<IRental>;

export default Rental;
