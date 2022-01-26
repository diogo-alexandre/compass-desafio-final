import { ICar } from '../../models/car.model'

export interface ICarService {
  create: (car: ICar) => Promise<ICar>
}
