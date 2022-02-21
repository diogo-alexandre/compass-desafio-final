import { Injectable } from '@decorators/di';

import Rental from '../schemas/rental.schema';
import clearObject from '../utils/clear-object.util';

import { IAdressDTO } from '../helpers/interfaces/entities/adress.interface';
import { IRentalRepository } from './interfaces/rental-repository.interface';
import { IRental, IRentalDTO } from '../helpers/interfaces/entities/rental.interface';
import { IPaginateOptions, IPaginateResult } from '../helpers/interfaces/paginate.interface';

@Injectable()
class RentalRepository implements IRentalRepository {
  async create(rental: IRentalDTO): Promise<IRental> {
    return Rental.create(rental);
  }

  async findAll({
    nome, cnpj, atividades, ...endereco
  }: Partial<Omit<IRentalDTO, 'endereco'> & IAdressDTO & { isFilial: boolean }>, limit: number, offset: number): Promise<IPaginateResult<IRental>> {
    const filter = {
      $and: [clearObject<Partial<IRentalDTO>>({
        nome: new RegExp(nome ?? '', 'i'),
        cnpj,
        atividades: new RegExp(atividades ?? '', 'i'),
        endereco: {
          $elemMatch: {
            cep: endereco.cep,
            isFilial: endereco.isFilial,
            logradouro: new RegExp(endereco.logradouro ?? '', 'i'),
            complemento: new RegExp(endereco.complemento ?? '', 'i'),
            bairro: new RegExp(endereco.bairro ?? '', 'i'),
            number: endereco.number,
            localidade: new RegExp(endereco.localidade ?? '', 'i'),
            uf: new RegExp(endereco.uf ?? '', 'i'),
          },
        },
      })],
    };

    const options = clearObject<IPaginateOptions>({ limit, offset });

    return Rental.paginate(filter, options);
  }

  async findById(id: string): Promise<IRental | null> {
    return Rental.findById(id);
  }

  async update(id: string, payload: IRentalDTO): Promise<IRental | null> {
    return Rental.findByIdAndUpdate(id, payload);
  }

  async delete(id: string): Promise<IRental | null> {
    return Rental.findByIdAndDelete(id);
  }
}

export default RentalRepository;
