import { People } from '../schemas/people.schema'
import { IPeople, IPeopleDTO } from '../helpers/interfaces/entities/people.interface'
import { IPeopleRepository } from './interfaces/people-repository.interface'
import { Injectable } from '@decorators/di'

@Injectable()
export class PeopleRepository implements IPeopleRepository {
  async create (people: IPeopleDTO): Promise<IPeople> {
    return await People.create(people)
  }

  async findByEmail (email: string): Promise<IPeople | null> {
    return await People.findOne({ email })
  }
}
