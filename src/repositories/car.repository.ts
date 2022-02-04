import { Injectable } from '@decorators/di'

import { Car } from '../schemas/car.schema'
import { clearObject } from '../utils/clear-object.util'
import { ICar, ICarDTO } from '../helpers/interfaces/car.interface'
import { ICarRepository } from './interfaces/car-repository.interface'
import { IPaginateOptions, IPaginateResult } from '../helpers/interfaces/paginate.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICar): Promise<ICarDTO> {
    return await Car.create(car)
  }

  async findById (id: string): Promise<ICarDTO | null> {
    return await Car.findById(id)
  }

  async findAll (query: Partial<ICar>, limit: number, offset: number): Promise<IPaginateResult<ICarDTO>> {
    const filter = {
      $and: [clearObject<Partial<ICarDTO>>({
        modelo: new RegExp(query.modelo ?? '', 'i'),
        cor: query.cor,
        ano: query.ano,
        acessorios: { $in: query.acessorios?.map(descricao => ({ descricao })) },
        quantidadePassageiros: query.quantidadePassageiros
      })]
    }

    const options = clearObject<IPaginateOptions>({ limit, offset })

    return await Car.paginate(filter, options)
  }

  async delete (id: string): Promise<ICarDTO | null> {
    return await Car.findByIdAndDelete(id)
  }

  async update (id: string, payload: ICar): Promise<ICarDTO | null> {
    const car = clearObject<ICar>({
      modelo: payload.modelo,
      cor: payload.cor,
      ano: payload.ano,
      acessorios: payload.acessorios,
      quantidadePassageiros: payload.quantidadePassageiros
    })

    return await Car.findByIdAndUpdate(id, car)
  }
}
