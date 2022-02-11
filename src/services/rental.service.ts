import { Inject, Injectable } from '@decorators/di'
import { IAdressDTO } from '../helpers/interfaces/entities/adress.interface'
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { IPaginateResult } from '../helpers/interfaces/paginate.interface'
import { IRentalRepository } from '../repositories/interfaces/rental-repository.interface'
import { RentalRepository } from '../repositories/rental.repository'
import { CEP } from '../utils/cep.util'
import { IRentalService } from './interfaces/rental-service.interface'

@Injectable()
export class RentalService implements IRentalService {
  constructor (
    @Inject(RentalRepository)
    private readonly rentalRepository: IRentalRepository
  ) { }

  async create (rental: IRentalDTO): Promise<IRental> {
    const addresses = rental.endereco.map(async end => ({
      ...end,
      ...await CEP.getAdress(end.cep)
    }))

    return await this.rentalRepository.create({
      ...rental,
      endereco: await Promise.all(addresses)
    })
  }

  async findAll (query: Partial<Omit<IRentalDTO, 'endereco'> & IAdressDTO>, limit: number, offset: number): Promise<IPaginateResult<IRental>> {
    return await this.rentalRepository.findAll(query, limit, offset)
  }
}
