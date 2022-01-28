import { People } from '../schemas/people.schema'
import { IPeople } from '../helpers/interfaces/people.interface'
import { IPeopleRepository } from './interfaces/people-repository.interface'

export class PeopleRepository implements IPeopleRepository {
  async create (people: IPeople): Promise<IPeople> {
    return await People.create(people)
  }
}
