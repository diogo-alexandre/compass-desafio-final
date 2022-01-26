import { ICar } from '../../models/car.model'
import { IPagination } from '../../helpers/interfaces/pagination.interface'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPagination<ICar>>
}
