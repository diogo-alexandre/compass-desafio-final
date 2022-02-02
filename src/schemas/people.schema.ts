import moment from 'moment'
import { Schema, model } from 'mongoose'

import { CPF } from '../utils/cpf.util'
import { IPeopleDTO } from '../helpers/interfaces/people.interface'
import { IPaginateModel } from '../helpers/interfaces/paginate.interface'

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
      ret.cpf = CPF.format(ret.cpf)
      ret.data_nascimento = moment(ret.data_nascimento).format('DD/MM/YYYY')
      ret.habilitado = (ret.habilitado === 'sim')
    }
  }
})

export const People = model<IPeopleDTO>('People', PeopleSchema) as IPaginateModel<IPeopleDTO>
