import { People } from '../schemas/people.schema'
import { IPeople, IPeopleDTO } from '../helpers/interfaces/people.interface'
import { IPeopleRepository } from './interfaces/people-repository.interface'
import { Injectable } from '@decorators/di'

@Injectable()
export class PeopleRepository implements IPeopleRepository {
  async create (people: IPeople): Promise<IPeopleDTO> {
    return await People.create(people)
  }

  async findByEmail (email: string): Promise<IPeopleDTO | null> {
    return await People.findOne({ email })
  }
}