import { ICar } from '../../helpers/interfaces/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarService {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPaginateResult<ICar>>
  findById: (id: string) => Promise<ICar>
  delete: (id: string) => Promise<ICar>
  update: (id: string, car: Partial<ICar>) => Promise<ICar>
}
