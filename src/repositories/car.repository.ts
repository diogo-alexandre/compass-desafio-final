import { Injectable } from '@decorators/di'
import { IPagination } from '../helpers/interfaces/pagination.interface'
import { Car, ICar } from '../models/car.model'
import { ICarRepository } from './interfaces/car-repository.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICar): Promise<ICar> {
    return await Car.create(car)
  }

  async findAll (query: Partial<ICar>, limit: number = 0, offset: number = 0): Promise<IPagination<ICar>> {
    const filter = {
      $and: [{ ...query }]
    }

    const count = await Car.count(filter)
    const cars = await Car.find(filter)
      .limit(limit)
      .skip(offset)
      .exec()

    return {
      result: cars,
      total: count,
      limit: (limit === 0) ? count : limit,
      offset: offset,
      offsets: (limit === 0) ? count : Math.ceil(count / limit)
    }
  }
}
