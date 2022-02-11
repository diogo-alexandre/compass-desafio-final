import { Inject, Injectable } from '@decorators/di'

import { CEP } from '../utils/cep.util'
import { RentalRepository } from '../repositories/rental.repository'
import { IRentalService } from './interfaces/rental-service.interface'
import { IPaginateResult } from '../helpers/interfaces/paginate.interface'
import { IAdressDTO } from '../helpers/interfaces/entities/adress.interface'
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { IRentalRepository } from '../repositories/interfaces/rental-repository.interface'
import { EntityNotFound } from '../errors/entity-not-found.error'

@Injectable()
export class RentalService implements IRentalService {
  constructor (
    @Inject(RentalRepository)
    private readonly rentalRepository: IRentalRepository
  ) { }

  async create (rental: IRentalDTO): Promise<IRental> {
    const addresses = rental.endereco.map(async end => ({
      ...end,
      ...await CEP.getAdress(end.cep)
    }))

    return await this.rentalRepository.create({
      ...rental,
      endereco: await Promise.all(addresses)
    })
  }

  async findAll (query: Partial<Omit<IRentalDTO, 'endereco'> & IAdressDTO>, limit: number, offset: number): Promise<IPaginateResult<IRental>> {
    return await this.rentalRepository.findAll(query, limit, offset)
  }

  async findById (id: string): Promise<IRental> {
    const rental = await this.rentalRepository.findById(id)

    if (rental === null) {
      throw new EntityNotFound(`Cannot find rental with id = '${id}'`)
    }

    return rental
  }

  async update (id: string, rental: IRentalDTO): Promise<IRental> {
    const addresses = rental.endereco.map(async end => ({
      ...end,
      ...await CEP.getAdress(end.cep)
    }))

    const result = await this.rentalRepository.update(id, {
      ...rental,
      endereco: await Promise.all(addresses)
    })

    if (result === null) {
      throw new EntityNotFound(`Cannot find rental with id = '${id}'`)
    }

    return result
  }

  async delete (id: string): Promise<IRental> {
    const rental = await this.rentalRepository.delete(id)

    if (rental === null) {
      throw new EntityNotFound(`Cannot find rental with id = '${id}'`)
    }

    return rental
  }
}
