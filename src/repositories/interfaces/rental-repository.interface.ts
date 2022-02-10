import { IRental, IRentalDTO } from '../../helpers/interfaces/entities/rental.interface'

export interface IRentalRepository {
  create: (rental: IRentalDTO) => Promise<IRental>
}
