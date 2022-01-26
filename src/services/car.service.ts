import { Injectable } from '@decorators/di'
import { Car, ICar } from '../models/car.model'
import { ICarService } from './interfaces/car-service.interface'

@Injectable()
export class CarService implements ICarService {
  async create ({ modelo, cor, ano, acessorios, quantidadePassageiros }: ICar): Promise<ICar> {
    return new Car({ modelo, cor, ano, acessorios, quantidadePassageiros })
  }
}
