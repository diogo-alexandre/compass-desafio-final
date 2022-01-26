import { Inject, Injectable } from '@decorators/di'

import { ICar } from '../helpers/interfaces/car.interface'
import { CarRepository } from '../repositories/car.repository'
import { ICarService } from './interfaces/car-service.interface'
import { IPagination } from '../helpers/interfaces/pagination.interface'
import { ICarRepository } from '../repositories/interfaces/car-repository.interface'

@Injectable()
export class CarService implements ICarService {
  constructor (
    @Inject(CarRepository)
    private readonly carRepository: ICarRepository
  ) { }

  async create ({ modelo, cor, ano, acessorios, quantidadePassageiros }: ICar): Promise<ICar> {
    const acessoriosEntries = Array.from(new Set<string>(acessorios.map(a => a.descricao)))

    return await this.carRepository.create({
      modelo,
      cor,
      ano,
      acessorios: acessoriosEntries.map(descricao => ({ descricao })),
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

  async findAll (query: Partial<ICar>, limit: number, offset: number): Promise<IPagination<ICar>> {
    return await this.carRepository.findAll(query, limit, offset)
  }

  async delete (id: string): Promise<ICar> {
    const car = await this.carRepository.delete(id)

    if (car === null) {
      throw new Error()
    }

    return car
  }
}
