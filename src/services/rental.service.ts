import { Inject, Injectable } from '@decorators/di'
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { IRentalRepository } from '../repositories/interfaces/rental-repository.interface'
import { RentalRepository } from '../repositories/rental.repository'
import { IRentalService } from './interfaces/rental-service.interface'

@Injectable()
export class RentalService implements IRentalService {
  constructor (
    @Inject(RentalRepository)
    private readonly rentalRepository: IRentalRepository
  ) { }

  async create (rental: IRentalDTO): Promise<IRental> {
    return await this.rentalRepository.create(rental)
  }
}
