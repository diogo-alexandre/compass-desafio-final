import { ICar, ICarDTO } from '../../helpers/interfaces/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICarDTO>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPaginateResult<ICarDTO>>
  delete: (id: string) => Promise<ICarDTO | null>
  findById: (id: string) => Promise<ICarDTO | null>
  update: (id: string, payload: Partial<ICar>) => Promise<ICarDTO | null>
}
