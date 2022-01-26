import { Injectable } from '@decorators/di'
import { Car, ICar } from '../models/car.model'
import { ICarRepository } from './interfaces/car-repository.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICar): Promise<ICar> {
    return await Car.create(car)
  }
}
