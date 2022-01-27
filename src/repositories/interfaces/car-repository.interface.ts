import { ICar } from '../../helpers/interfaces/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPaginateResult<ICar>>
  delete: (id: string) => Promise<ICar | null>
  findById: (id: string) => Promise<ICar | null>
}
