import { Injectable } from '@decorators/di';

import Car from '../schemas/car.schema';
import clearObject from '../utils/clear-object.util';

import { ICarDTO, ICar } from '../helpers/interfaces/entities/car.interface';
import { ICarRepository } from './interfaces/car-repository.interface';
import { IPaginateOptions, IPaginateResult } from '../helpers/interfaces/paginate.interface';
import { IAcessorioDTO } from '../helpers/interfaces/entities/acessorio.interface';

@Injectable()
class CarRepository implements ICarRepository {
  async create(car: ICarDTO): Promise<ICar> {
    return Car.create(car);
  }

  async findById(id: string): Promise<ICar | null> {
    return Car.findById(id);
  }

  async findAll(
    query: Partial<ICarDTO>,
    limit: number,
    offset: number,
  ): Promise<IPaginateResult<ICar>> {
    const filter = {
      $and: [clearObject<Partial<ICar>>({
        modelo: new RegExp(query.modelo ?? '', 'i'),
        cor: query.cor,
        ano: query.ano,
        acessorios: { $in: query.acessorios?.map((descricao) => ({ descricao })) },
        quantidadePassageiros: query.quantidadePassageiros,
      })],
    };

    const options = clearObject<IPaginateOptions>({ limit, offset });

    return Car.paginate(filter, options);
  }

  async delete(id: string): Promise<ICar | null> {
    return Car.findByIdAndDelete(id);
  }

  async update(id: string, payload: ICarDTO): Promise<ICar | null> {
    const car = clearObject<ICarDTO>({
      modelo: payload.modelo,
      cor: payload.cor,
      ano: payload.ano,
      acessorios: payload.acessorios,
      quantidadePassageiros: payload.quantidadePassageiros,
    });

    return Car.findByIdAndUpdate(id, car);
  }

  async updateAcessorio(
    carId: string,
    acessorioId: string,
    { descricao }: IAcessorioDTO,
  ): Promise<ICar | null> {
    return Car.findByIdAndUpdate(carId, {
      $set: { 'acessorios.$[el].descricao': descricao },
    }, {
      arrayFilters: [{ 'el._id': acessorioId }],
    });
  }
}

export default CarRepository;
