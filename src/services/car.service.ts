import { Inject, Injectable } from '@decorators/di'

import { ICar } from '../helpers/interfaces/car.interface'
import { CarRepository } from '../repositories/car.repository'
import { ICarService } from './interfaces/car-service.interface'
import { ICarRepository } from '../repositories/interfaces/car-repository.interface'

@Injectable()
export class CarService implements ICarService {
  constructor (
    @Inject(CarRepository)
    private readonly carRepository: ICarRepository
  ) { }

  async create ({ modelo, cor, ano, acessorios, quantidadePassageiros }: ICar): Promise<ICar> {
    return await this.carRepository.create({
      modelo,
      cor,
      ano,
      acessorios,
      quantidadePassageiros
    })
  }

  async findById (id: string): Promise<ICar> {
    const car = await this.carRepository.findById(id)

    if (car === null) {
      throw new Error()
    }

    return car
  }

  async findAll (query: Partial<ICar>): Promise<ICar[]> {
    return await this.carRepository.findAll(query)
  }

  async delete (id: string): Promise<ICar> {
    const car = await this.carRepository.delete(id)

    if (car === null) {
      throw new Error()
    }

    return car
  }
}
