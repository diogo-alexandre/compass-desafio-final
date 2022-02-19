import bcryptjs from 'bcryptjs';
import { Inject, Injectable } from '@decorators/di';

import PeopleRepository from '../repositories/people.repository';
import EntityNotFound from '../errors/entity-not-found.error';

import { IPeopleService } from './interfaces/people-service.interface';
import { IPeople, IPeopleDTO } from '../helpers/interfaces/entities/people.interface';
import { IPeopleRepository } from '../repositories/interfaces/people-repository.interface';

@Injectable()
class PeopleService implements IPeopleService {
  private readonly peopleRepository: IPeopleRepository;

  constructor(@Inject(PeopleRepository) peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async create(people: IPeopleDTO): Promise<IPeople> {
    return this.peopleRepository.create({
      ...people,
      senha: await bcryptjs.hash(people.senha, 8),
    });
  }

  async findByEmail(email: string): Promise<IPeople> {
    const people = await this.peopleRepository.findByEmail(email);

    if (people === null) {
      throw new EntityNotFound(`Cannot find people with email = ${email}`);
    }

    return people;
  }
}

export default PeopleService;
