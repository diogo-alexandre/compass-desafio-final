import { IPagination } from '../../helpers/interfaces/pagination.interface'
import { ICar } from '../../models/car.model'

export interface ICarService {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPagination<ICar>>
  findById: (id: string) => Promise<ICar>
  delete: (id: string) => Promise<ICar>
}
