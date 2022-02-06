import bcryptjs from 'bcryptjs'
import { Inject, Injectable } from '@decorators/di'

import { EntityNotFound } from '../errors/entity-not-found.error'
import { PeopleRepository } from '../repositories/people.repository'
import { IPeopleService } from './interfaces/people-service.interface'
import { IPeople, IPeopleDTO } from '../helpers/interfaces/people.interface'
import { IPeopleRepository } from '../repositories/interfaces/people-repository.interface'

@Injectable()
export class PeopleService implements IPeopleService {
  constructor (
    @Inject(PeopleRepository)
    private readonly peopleRepository: IPeopleRepository
  ) { }

  async create (people: IPeople): Promise<IPeopleDTO> {
    return await this.peopleRepository.create({
      ...people,
      senha: await bcryptjs.hash(people.senha, 8)
    })
  }

  async findByEmail (email: string): Promise<IPeopleDTO> {
    const people = await this.peopleRepository.findByEmail(email)

    if (people === null) {
      throw new EntityNotFound(`Cannot find people with email = ${email}`)
    }

    return people
  }
}
