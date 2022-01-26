import { ICar } from '../../helpers/interfaces/car.interface'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>) => Promise<ICar[]>
  delete: (id: string) => Promise<ICar | null>
  findById: (id: string) => Promise<ICar | null>
}
