import { Schema, model } from 'mongoose'
import { IPaginateModel } from '../helpers/interfaces/paginate.interface'
import { IPeople } from '../helpers/interfaces/people.interface'

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
    type: String
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
}, { versionKey: false })

export const People = model<IPeople>('People', PeopleSchema) as IPaginateModel<IPeople>
