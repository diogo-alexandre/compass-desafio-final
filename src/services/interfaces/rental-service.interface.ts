import { IRental, IRentalDTO } from '../../helpers/interfaces/entities/rental.interface'

export interface IRentalService {
  create: (rental: IRentalDTO) => Promise<IRental>
}
