import { IAdressDTO } from '../../helpers/interfaces/entities/adress.interface'
import { IRental, IRentalDTO } from '../../helpers/interfaces/entities/rental.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface IRentalRepository {
  create: (rental: IRentalDTO) => Promise<IRental>
  findAll: (query: Partial<Omit<IRentalDTO, 'endereco'> & IAdressDTO>, limit: number, offset: number) => Promise<IPaginateResult<IRental>>
  findById: (id: string) => Promise<IRental | null>
  update: (id: string, payload: IRentalDTO) => Promise<IRental | null>
  delete: (id: string) => Promise<IRental | null>
}
