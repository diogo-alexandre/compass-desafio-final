import { ICar } from '../../helpers/interfaces/car.interface'

export interface ICarService {
  create: (car: ICar) => Promise<ICar>
  findAll: (query: Partial<ICar>) => Promise<ICar[]>
  findById: (id: string) => Promise<ICar>
  delete: (id: string) => Promise<ICar>
}
