import { Inject, Injectable } from '@decorators/di';

import CarRepository from '../repositories/car.repository';
import EntityNotFound from '../errors/entity-not-found.error';

import { ICar, ICarDTO } from '../helpers/interfaces/entities/car.interface';
import { ICarService } from './interfaces/car-service.interface';
import { ICarRepository } from '../repositories/interfaces/car-repository.interface';
import { IPaginateResult } from '../helpers/interfaces/paginate.interface';
import { IAcessorioDTO } from '../helpers/interfaces/entities/acessorio.interface';

@Injectable()
class CarService implements ICarService {
  private readonly carRepository: ICarRepository;

  constructor(@Inject(CarRepository) carRepository: ICarRepository) {
    this.carRepository = carRepository;
  }

  async create(car: ICarDTO): Promise<ICar> {
    return this.carRepository.create(car);
  }

  async findById(id: string): Promise<ICar> {
    const car = await this.carRepository.findById(id);

    if (car === null) {
      throw new EntityNotFound(`Cannot find car with id = '${id}'`);
    }

    return car;
  }

  async findAll(
    query: Partial<ICarDTO>,
    limit: number,
    offset:
    number,
  ): Promise<IPaginateResult<ICar>> {
    return this.carRepository.findAll(query, limit, offset);
  }

  async delete(id: string): Promise<ICar> {
    const car = await this.carRepository.delete(id);

    if (car === null) {
      throw new EntityNotFound(`Cannot find car with id = '${id}'`);
    }

    return car;
  }

  async update(id: string, payload: ICarDTO): Promise<ICar> {
    const result = await this.carRepository.update(id, payload);

    if (result === null) {
      throw new EntityNotFound(`Cannot find car with id = '${id}'`);
    }

    return result;
  }

  async updateAcessorio(
    carId: string,
    acessorioId: string,
    acessorio: IAcessorioDTO,
  ): Promise<ICar> {
    const car = await this.carRepository.updateAcessorio(carId, acessorioId, acessorio);

    if (car === null) {
      throw new EntityNotFound(`Cannot find "Car" with id = ${carId}`);
    }

    if (car.acessorios.find((accessory) => accessory._id.toString() === acessorioId) == null) {
      throw new EntityNotFound(`Cannot find "Car.acessorio" with id = ${acessorioId}`);
    }

    return car;
  }
}

export default CarService;
