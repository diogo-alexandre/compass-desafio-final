import { ICar } from '../../models/car.model'
import { IPagination } from '../../helpers/interfaces/pagination.interface'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICar>
  findById: (id: string) => Promise<ICar | null>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPagination<ICar>>
  delete: (car: ICar) => Promise<ICar>
}
