import { Injectable } from '@decorators/di'

import { Car } from '../schemas/car.schema'
import { clearObject } from '../utils/clear-object.util'
import { ICar } from '../helpers/interfaces/car.interface'
import { ICarRepository } from './interfaces/car-repository.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICar): Promise<ICar> {
    return await Car.create(car)
  }

  async findById (id: string): Promise<ICar | null> {
    return await Car.findOne({ _id: id })
  }

  async findAll (query: Partial<ICar>): Promise<ICar[]> {
    const filter = {
      $and: [clearObject<Partial<ICar>>({
        modelo: new RegExp(query.modelo ?? '', 'i'),
        cor: query.cor,
        ano: query.ano,
        acessorios: query.acessorios,
        quantidadePassageiros: query.quantidadePassageiros
      })]
    }

    return await Car.find(filter)
  }

  async delete (id: string): Promise<ICar | null> {
    return await Car.findByIdAndDelete(id)
  }
}
