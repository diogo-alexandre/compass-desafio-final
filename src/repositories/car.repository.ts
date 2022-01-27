import { Injectable } from '@decorators/di'

import { Car } from '../schemas/car.schema'
import { clearObject } from '../utils/clear-object.util'
import { ICar } from '../helpers/interfaces/car.interface'
import { ICarRepository } from './interfaces/car-repository.interface'
import { IPaginateResult } from '../helpers/interfaces/paginate.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICar): Promise<ICar> {
    return await Car.create(car)
  }

  async findById (id: string): Promise<ICar | null> {
    return await Car.findOne({ _id: id })
  }

  async findAll (query: Partial<ICar>, limit: number, skip: number): Promise<IPaginateResult<ICar>> {
    const filter = {
      $and: [clearObject<Partial<ICar>>({
        modelo: new RegExp(query.modelo ?? '', 'i'),
        cor: query.cor,
        ano: query.ano,
        acessorios: { $in: query.acessorios?.map(descricao => ({ descricao })) },
        quantidadePassageiros: query.quantidadePassageiros
      })]
    }

    return await Car.paginate(filter, { limit, offset: skip })
  }

  async delete (id: string): Promise<ICar | null> {
    return await Car.findByIdAndDelete(id)
  }
}
