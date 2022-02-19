import { IAcessorioDTO } from '../../helpers/interfaces/entities/acessorio.interface';
import { ICar, ICarDTO } from '../../helpers/interfaces/entities/car.interface';
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface';

export interface ICarRepository {
  create: (car: ICarDTO) => Promise<ICar>
  findAll: (
    query: Partial<ICarDTO>,
    limit: number,
    offset: number
  ) => Promise<IPaginateResult<ICar>>
  delete: (id: string) => Promise<ICar | null>
  findById: (id: string) => Promise<ICar | null>
  update: (id: string, payload: ICarDTO) => Promise<ICar | null>
  updateAcessorio: (
    carId: string,
    acessorioId: string,
    payload: IAcessorioDTO
  ) => Promise<ICar | null>
}
