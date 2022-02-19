import moment from 'moment';
import { Schema, model } from 'mongoose';
import DuplicatedEntry from '../errors/duplicated-entry.error';

import { IPeople } from '../helpers/interfaces/entities/people.interface';
import { IPaginateModel } from '../helpers/interfaces/paginate.interface';

const PeopleSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
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
}, { versionKey: false });

PeopleSchema.post('save', (err: any, doc: IPeople, next: Function) => {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const key = Object.keys(err.keyPattern)[0];

    next(new DuplicatedEntry(`Already exists People with same value of ${key}`));
  }

  next();
});

const People = model<IPeople>('People', PeopleSchema) as IPaginateModel<IPeople>;

export default People;
