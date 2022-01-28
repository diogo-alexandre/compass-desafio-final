import { Schema, model } from 'mongoose'
import { IPaginateModel } from '../helpers/interfaces/paginate.interface'
import { IPeople } from '../helpers/interfaces/people.interface'

const PeopleSchema = new Schema({
  nome: {
    type: String
  },
  cpf: {
    type: String,
    unique: true
  },
  data_nascimento: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  senha: {
    type: String,
    length: 60
  },
  habilitado: {
    type: Boolean
  }
}, { versionKey: false })

export const People = model<IPeople>('People', PeopleSchema) as IPaginateModel<IPeople>
