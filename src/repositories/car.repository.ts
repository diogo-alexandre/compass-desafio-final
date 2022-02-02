import { Injectable } from '@decorators/di'

import { Car } from '../schemas/car.schema'
import { clearObject } from '../utils/clear-object.util'
import { ICarDTO } from '../helpers/interfaces/car.interface'
import { ICarRepository } from './interfaces/car-repository.interface'
import { IPaginateOptions, IPaginateResult } from '../helpers/interfaces/paginate.interface'

@Injectable()
export class CarRepository implements ICarRepository {
  async create (car: ICarDTO): Promise<ICarDTO> {
    return await Car.create(car)
  }

  async findById (id: string): Promise<ICarDTO | null> {
    return await Car.findById(id)
  }

  async findAll (query: Partial<ICarDTO>, limit: number, offset: number): Promise<IPaginateResult<ICarDTO>> {
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

  async update (id: string, payload: Partial<ICarDTO>): Promise<ICarDTO | null> {
    const car = clearObject<Partial<ICarDTO>>({
      modelo: payload.modelo,
      cor: payload.cor,
      ano: payload.ano,
      acessorios: payload.acessorios,
      quantidadePassageiros: payload.quantidadePassageiros
    })

    return await Car.findByIdAndUpdate(id, car)
  }
}
