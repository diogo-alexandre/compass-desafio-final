import { Injectable } from '@decorators/di'

import { Car } from '../schemas/car.schema'
import { clearObject } from '../utils/clear-object.util'
import { ICar } from '../helpers/interfaces/car.interface'
import { ICarRepository } from './interfaces/car-repository.interface'
import { IPagination } from '../helpers/interfaces/pagination.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICar): Promise<ICar> {
    return await Car.create(car)
  }

  async findById (id: string): Promise<ICar | null> {
    return await Car.findOne({ _id: id })
  }

  async findAll (query: Partial<ICar>, limit: number, offset: number): Promise<IPagination<ICar>> {
    limit = (!isNaN(limit)) ? limit : 0
    offset = (!isNaN(offset)) ? offset : 0

    const filter = {
      $and: [clearObject<Partial<ICar>>({
        modelo: new RegExp(query.modelo ?? '', 'i'),
        cor: query.cor,
        ano: query.ano,
        acessorios: query.acessorios,
        quantidadePassageiros: query.quantidadePassageiros
      })]
    }

    const count = await Car.count(filter)
    const cars = await Car.find(filter)
      .limit(limit)
      .skip((offset === 0) ? offset : offset + 1)
      .exec()

    return {
      result: cars,
      total: count,
      limit: (limit === 0) ? count : limit,
      offset: offset + 1,
      offsets: (limit === 0) ? 1 : Math.ceil(count / limit)
    }
  }

  async delete (id: string): Promise<ICar | null> {
    return await Car.findByIdAndDelete(id)
  }
}
