import { Inject, Injectable } from '@decorators/di'
import bcrypt from 'bcrypt'
import { EntityNotFound } from '../errors/entity-not-found.error'

import { IPeople, IPeopleDTO } from '../helpers/interfaces/people.interface'
import { IPeopleRepository } from '../repositories/interfaces/people-repository.interface'
import { PeopleRepository } from '../repositories/people.repository'
import { IPeopleService } from './interfaces/people-service.interface'

@Injectable()
export class PeopleService implements IPeopleService {
  constructor (
    @Inject(PeopleRepository)
    private readonly peopleRepository: IPeopleRepository
  ) { }

  async create (people: IPeopleDTO): Promise<IPeople> {
    return await this.peopleRepository.create({
      nome: people.nome,
      cpf: people.cpf,
      data_nascimento: people.data_nascimento,
      email: people.email,
      senha: await bcrypt.hash(people.senha, 8),
      habilitado: (people.habilitado === 'sim')
    })
  }

  async findByEmail (email: string): Promise<IPeople> {
    const people = await this.peopleRepository.findByEmail(email)

    if (people === null) {
      throw new EntityNotFound(`Cannot find people with email = ${email}`)
    }

    return people
  }
}
