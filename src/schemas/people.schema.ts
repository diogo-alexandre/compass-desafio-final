import moment from 'moment'
import { Schema, model } from 'mongoose'

import { IPeople } from '../helpers/interfaces/entities/people.interface'
import { IPaginateModel } from '../helpers/interfaces/paginate.interface'
import { DuplicatedEntry } from '../errors/duplicated-entry.error'

const PeopleSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    unique: true,
    required: true
  },
  data_nascimento: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    length: 60,
    required: true
  },
  habilitado: {
    type: Boolean,
    required: true
  }
}, {
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.data_nascimento = moment(ret.data_nascimento).format('DD/MM/YYYY')
      ret.habilitado = (ret.habilitado === 'sim')
    }
  }
})

PeopleSchema.post('save', (err: any, doc: IPeople, next: Function) => {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const key = Object.keys(err.keyPattern)[0]

    next(new DuplicatedEntry(`Already exists People with same value of ${key}`))
  }

  next()
})

export const People = model<IPeople>('People', PeopleSchema) as IPaginateModel<IPeople>
