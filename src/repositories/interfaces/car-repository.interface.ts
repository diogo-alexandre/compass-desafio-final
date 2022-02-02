import { ICarDTO } from '../../helpers/interfaces/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarRepository {
  create: (car: ICarDTO) => Promise<ICarDTO>
  findAll: (query: Partial<ICarDTO>, limit: number, offset: number) => Promise<IPaginateResult<ICarDTO>>
  delete: (id: string) => Promise<ICarDTO | null>
  findById: (id: string) => Promise<ICarDTO | null>
  update: (id: string, payload: Partial<ICarDTO>) => Promise<ICarDTO | null>
}
