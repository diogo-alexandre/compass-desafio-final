import { Injectable } from '@decorators/di';

import People from '../schemas/people.schema';

import { IPeople, IPeopleDTO } from '../helpers/interfaces/entities/people.interface';
import { IPeopleRepository } from './interfaces/people-repository.interface';

@Injectable()
class PeopleRepository implements IPeopleRepository {
  async create(people: IPeopleDTO): Promise<IPeople> {
    return People.create(people);
  }

  async findByEmail(email: string): Promise<IPeople | null> {
    return People.findOne({ email });
  }
}

export default PeopleRepository;
