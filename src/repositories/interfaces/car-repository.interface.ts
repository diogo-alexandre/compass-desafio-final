import { ICar } from '../../helpers/interfaces/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>, limit: number, skip: number) => Promise<IPaginateResult<ICar>>
  delete: (id: string) => Promise<ICar | null>
  findById: (id: string) => Promise<ICar | null>
}
