import { ICar } from '../../models/car.model'

export interface ICarRepository {
  create: (car: ICar) => Promise<ICar>
}
