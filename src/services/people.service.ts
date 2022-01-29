import bcrypt from 'bcrypt'
import { Inject, Injectable } from '@decorators/di'

import { EntityNotFound } from '../errors/entity-not-found.error'
import { DuplicatedEntry } from '../errors/duplicated-entry.error'
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

  async create (people: IPeopleDTO): Promise<IPeople> {
    try {
      return await this.peopleRepository.create({
        ...people,
        senha: await bcrypt.hash(people.senha, 8),
        habilitado: (people.habilitado === 'sim')
      })
    } catch (err) {
      let localError: any = err

      if (localError.name === 'MongoServerError' && localError.code === 11000) {
        const key = Object.keys(localError.keyPattern)[0]

        localError = new DuplicatedEntry(`Already exists People with same value of ${key}`)
      }

      throw localError
    }
  }

  async findByEmail (email: string): Promise<IPeople> {
    const people = await this.peopleRepository.findByEmail(email)

    if (people === null) {
      throw new EntityNotFound(`Cannot find people with email = ${email}`)
    }

    return people
  }
}
