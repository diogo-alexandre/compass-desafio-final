import { Inject, Injectable } from '@decorators/di'

import { ICar, ICarDTO } from '../helpers/interfaces/entities/car.interface'
import { CarRepository } from '../repositories/car.repository'
import { ICarService } from './interfaces/car-service.interface'
import { ICarRepository } from '../repositories/interfaces/car-repository.interface'
import { IPaginateResult } from '../helpers/interfaces/paginate.interface'
import { EntityNotFound } from '../errors/entity-not-found.error'

@Injectable()
export class CarService implements ICarService {
  constructor (
    @Inject(CarRepository)
    private readonly carRepository: ICarRepository
  ) { }

  async create (car: ICarDTO): Promise<ICar> {
    return await this.carRepository.create(car)
  }

  async findById (id: string): Promise<ICar> {
    const car = await this.carRepository.findById(id)

    if (car === null) {
      throw new EntityNotFound(`Cannot find car with id = '${id}'`)
    }

    return car
  }

  async findAll (query: Partial<ICarDTO>, limit: number, offset: number): Promise<IPaginateResult<ICar>> {
    return await this.carRepository.findAll(query, limit, offset)
  }

  async delete (id: string): Promise<ICar> {
    const car = await this.carRepository.delete(id)

    if (car === null) {
      throw new EntityNotFound(`Cannot find car with id = '${id}'`)
    }

    return car
  }

  async update (id: string, payload: ICarDTO): Promise<ICar> {
    const result = await this.carRepository.update(id, payload)

    if (result === null) {
      throw new EntityNotFound(`Cannot find car with id = '${id}'`)
    }

    return result
  }
}
