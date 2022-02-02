import { ICar, ICarDTO } from '../../helpers/interfaces/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarService {
  create: (car: ICar) => Promise<ICarDTO>
  findAll: (query: Partial<ICar>, limit: number, offset: number) => Promise<IPaginateResult<ICarDTO>>
  findById: (id: string) => Promise<ICarDTO>
  delete: (id: string) => Promise<ICarDTO>
  update: (id: string, car: ICar) => Promise<ICarDTO>
}
