import { Injectable } from '@decorators/di'

import { Rental } from '../schemas/rental.schema'
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { IRentalRepository } from './interfaces/rental-repository.interface'

@Injectable()
export class RentalRepository implements IRentalRepository {
  async create (rental: IRentalDTO): Promise<IRental> {
    return await Rental.create(rental)
  }
}
