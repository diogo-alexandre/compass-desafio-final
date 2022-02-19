import { Inject, Injectable } from '@decorators/di';

import RentalRepository from '../repositories/rental.repository';
import EntityNotFound from '../errors/entity-not-found.error';
import CEP from '../utils/cep.util';

import { IRentalService } from './interfaces/rental-service.interface';
import { IPaginateResult } from '../helpers/interfaces/paginate.interface';
import { IAdressDTO } from '../helpers/interfaces/entities/adress.interface';
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface';
import { IRentalRepository } from '../repositories/interfaces/rental-repository.interface';

@Injectable()
class RentalService implements IRentalService {
  private readonly rentalRepository: IRentalRepository;

  constructor(@Inject(RentalRepository) rentalRepository: IRentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  async create(rental: IRentalDTO): Promise<IRental> {
    const addresses = rental.endereco.map(async (end) => ({
      ...end,
      ...await CEP(end.cep).getAdress(),
    }));

    return this.rentalRepository.create({
      ...rental,
      endereco: await Promise.all(addresses),
    });
  }

  async findAll({ cep, ...query }: Partial<Omit<IRentalDTO, 'endereco'> & IAdressDTO>, limit: number, offset: number): Promise<IPaginateResult<IRental>> {
    return this.rentalRepository.findAll({
      cep: (cep !== undefined) ? CEP(cep).toStringWithDots() : undefined,
      ...query,
    }, limit, offset);
  }

  async findById(id: string): Promise<IRental> {
    const rental = await this.rentalRepository.findById(id);

    if (rental === null) {
      throw new EntityNotFound(`Cannot find rental with id = '${id}'`);
    }

    return rental;
  }

  async update(id: string, rental: IRentalDTO): Promise<IRental> {
    const addresses = rental.endereco.map(async (end) => ({
      ...end,
      ...await CEP(end.cep).getAdress(),
    }));

    const result = await this.rentalRepository.update(id, {
      ...rental,
      endereco: await Promise.all(addresses),
    });

    if (result === null) {
      throw new EntityNotFound(`Cannot find rental with id = '${id}'`);
    }

    return result;
  }

  async delete(id: string): Promise<IRental> {
    const rental = await this.rentalRepository.delete(id);

    if (rental === null) {
      throw new EntityNotFound(`Cannot find rental with id = '${id}'`);
    }

    return rental;
  }
}

export default RentalService;
