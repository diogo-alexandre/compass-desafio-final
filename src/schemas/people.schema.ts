import moment from 'moment';
import { Schema } from 'mongoose';

import Model from '../helpers/model.helper';
import { IPeople } from '../helpers/interfaces/entities/people.interface';
import { CPF } from '../utils/cpf-cnpj.util';

const PeopleSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
    set: (value: string) => CPF(value).toStringWithDots(),
  },
  data_nascimento: {
    type: Date,
    required: true,
    get: (value: Date) => moment(value).format('DD/MM/YYYY'),
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  senha: {
    type: String,
    length: 60,
    required: true,
  },
  habilitado: {
    type: Boolean,
    required: true,
    get: (value: boolean) => {
      if (value) return 'sim';
      return 'nao';
    },
    set: (v: string) => (v === 'sim'),
  },
}, {
  id: false,
  versionKey: false,
  toJSON: { getters: true },
  toObject: { getters: true },
});

const People = Model<IPeople>('People', PeopleSchema);

export default People;
