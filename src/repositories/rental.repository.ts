import { Injectable } from '@decorators/di'

import { Rental } from '../schemas/rental.schema'
import { clearObject } from '../utils/clear-object.util'
import { IAdressDTO } from '../helpers/interfaces/entities/adress.interface'
import { IRentalRepository } from './interfaces/rental-repository.interface'
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { IPaginateOptions, IPaginateResult } from '../helpers/interfaces/paginate.interface'

@Injectable()
export class RentalRepository implements IRentalRepository {
  async create (rental: IRentalDTO): Promise<IRental> {
    return await Rental.create(rental)
  }

  async findAll ({ nome, cnpj, atividades, ...endereco }: Partial<Omit<IRentalDTO, 'endereco'> & IAdressDTO & { isFilial: boolean }>, limit: number, offset: number): Promise<IPaginateResult<IRental>> {
    const filter = {
      $and: [clearObject<Partial<IRentalDTO>>({
        nome: new RegExp(nome ?? '', 'i'),
        cnpj,
        atividades: new RegExp(atividades ?? '', 'i'),
        endereco: {
          $elemMatch: {
            cep: endereco.cep,
            isFilial: endereco.isFilial,
            ...endereco
          }
        }
      })]
    }

    console.log(filter.$and[0].endereco)

    const options = clearObject<IPaginateOptions>({ limit, offset })

    return await Rental.paginate(filter, options)
  }
}
